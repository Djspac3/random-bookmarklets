import * as esbuild from "esbuild";
import { argv } from "process";

esbuild
  .build({
    entryPoints: ["src/bookmarklet-manager/main.jsx"],
    bundle: true,
    minify: true,
    outfile: "bookmarklets/manager.js", // Output file
    // loaders
    loader: {
      ".svg": "base64",
    },
  })
  .then(() => {
    console.log("Bookmarklet bundled successfully!");
  })
  .catch(() => process.exit(1));
