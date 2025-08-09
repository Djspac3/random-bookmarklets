import * as esbuild from "esbuild";
import { argv } from "process";

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
};

console.log(argv[2]);

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
