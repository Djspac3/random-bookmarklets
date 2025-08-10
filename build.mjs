import * as esbuild from "esbuild";
import { argv } from "process";
import { sassPlugin } from "esbuild-sass-plugin";

import { basename } from "path";

/**@type {import("esbuild").Plugin} */
const logPlugin_local = {
  name: "logPlugin-local",
  setup(build) {
    build.onStart(() => {
      console.clear();
    });
    build.onEnd(async (result) => {
      console.log(`build mode: ${argv[2]}`);
      console.log();
      if (result.errors.length === 0) {
        console.log("Built:");
        if (result.metafile && result.metafile.outputs) {
          console.log(" files:");
          for (const outputIndex in result.metafile.outputs) {
            // removes anoying bookmarklets/ bit
            console.log(`  - ${basename(outputIndex)}`);
          }
        }
      }
    });
  },
};

/**@type {import('esbuild').BuildOptions} */
const config = {
  entryPoints: ["src/bookmarklet-manager/main.jsx"],
  bundle: true,
  minify: true,
  jsxImportSource: "preact",
  jsx: "automatic",
  outfile: "bookmarklets/manager.js", // Output file
  // loaders
  loader: {
    ".svg": "dataurl",
  },
  format: "iife",
  plugins: [
    sassPlugin({
      type: "css-text",
      // minify using default esbuild
      async transform(css) {
        return (
          await esbuild.transform(css, {
            loader: "css",
            minify: true,
          })
        ).code;
      },
    }),
    logPlugin_local,
  ],
};

if (argv[2] === "build") {
  esbuild
    .build(config)
    .then(() => {
      console.log("Bookmarklet bundled successfully!");
    })
    .catch(() => process.exit(1));
}
if (argv[2] === "watch") {
  var context = await esbuild.context(config);
  context.watch();
  var wait = true;
  process.on("SIGINT", async () => {
    console.log("signal interupt noticed, closing esbuild context");
    await context.dispose();
    console.log("esbuild context has been 'disposed' (shutdown?)");
    wait = false;
  });
  setInterval(() => {
    if (!wait) {
      process.exit();
    }
  });
}
