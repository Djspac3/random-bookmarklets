import fs from "fs";
import path from "path";

const bookmarkletDir: string = path.join(__dirname, "..", "bookmarklets");

export function getFile(name: string): string {
  if (!fs.existsSync(bookmarkletDir)) {
    throw new Error(
      `Bookmarklets directory does not exist please run the build script first.`
    );
  }
  if (!fs.existsSync(path.join(bookmarkletDir, name))) {
    throw new Error(`Bookmarklet file ${name} does not exist.`);
  }

  return fs.readFileSync(path.join(bookmarkletDir, name), "utf-8");
}

export function getFiles(): { [key: string]: string } {
  if (!fs.existsSync(bookmarkletDir)) {
    throw new Error(
      `Bookmarklets directory does not exist please run the build script first.`
    );
  }
  var files: { [key: string]: string } = {};
  fs.readdirSync(bookmarkletDir).forEach((file) => {
    if (file.endsWith(".js")) {
      files[file] = fs.readFileSync(path.join(bookmarkletDir, file), "utf-8");
    }
  });
  return files;
}
