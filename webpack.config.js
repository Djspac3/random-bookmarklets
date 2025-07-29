import { resolve } from "path";
export const outputFolder = resolve(__dirname, "bookmarklets");

export const entry = {
  manager: "./src/manager/bootloader.js",
  tools: "./src/tools/bootloader.js",
};
export const output = {
  filename: "[name].js",
  path: outputFolder,
};
export const mode = "production";
export const module = {
  rules: [
    {
      test: /\.css$/i,
      type: "asset/inline", // <-- FIXED: use 'type'  not 'use'
    },
    {
      test: /\.(png|jpg|gif|svg)$/i,
      type: "asset/inline",
    },
  ],
};
export const optimization = {
  minimize: true,
};
