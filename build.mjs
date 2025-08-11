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
      console.log("building ...");
    });
    build.onEnd(async (result) => {
      if (result.errors.length === 0) {
        console.clear();
        console.log("building finished");
        console.log();
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
  entryPoints: [
    { in: "src/bookmarklet-manager/main.jsx", out: "manager" },
    { in: "src/tools/main.js", out: "tools" },
  ],
  outdir: "bookmarklets",
  entryNames: "[name]",
  bundle: true,
  minify: true,
  jsxImportSource: "preact",
  jsx: "automatic",
  // loaders
  loader: {
    ".svg": "dataurl",
  },
  format: "iife",
  metafile: true,
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

// clear console to remove anoying vscode messages and to leave only room for errors
console.clear();

var context = await esbuild.context(config);
// build mode
if (argv[2] === "build") {
  context.rebuild();
  context.dispose();
  process.exit(0);
}
if (argv[2] === "manual") {
  //prevent exit
  process.on("beforeExit", () => {
    setTimeout(() => {}, 1000);
  });
}
// watch mode
if (argv[2] === "watch") {
  context.watch();
}

// keybinds because its just hard
import { emitKeypressEvents } from "readline";
emitKeypressEvents(process.stdin);
process.stdin.on("keypress", async (_, key) => {
  if (key) {
    if ((key.ctrl && key.name === "c") || key.name === "q") {
      console.log("ctrl+c/q noticed, quiting");
      context.dispose();
      process.exit();
    } else if (key.name === "r") {
      await context.rebuild();
    }
  }
});
process.stdin.setRawMode(true);
