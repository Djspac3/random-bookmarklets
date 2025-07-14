import { test, expect } from "@playwright/test";
import * as fs from "fs";
import path from "path";

const bookmarkletDir: fs.PathLike = path.join(__dirname, "..", "bookmarklets");

// Read all bookmarklet files
if (!fs.existsSync(bookmarkletDir)) {
  throw new Error(
    `Bookmarklets directory does not exist please run the build script first.`
  );
}
if (!fs.lstatSync(bookmarkletDir).isDirectory()) {
  throw new Error(`Bookmarklets path is not a directory.`);
}
const bookmarkletFiles = fs
  .readdirSync(bookmarkletDir)
  .filter((file) => file.endsWith(".js"));

test.describe("Bookmarklets", async () => {
  for (const bookmarklet of bookmarkletFiles) {
    const bookmarkletPath = path.join(bookmarkletDir, bookmarklet);
    const bookmarkletContent = fs.readFileSync(bookmarkletPath);

    
    switch (bookmarklet) {
      case "manager.js":
        test("Bookmarklet: manager.js, invalid page", async ({ page }) => {
          await page.goto("https://google.com/no.page");
          await page.addScriptTag({ content: bookmarkletContent });
          // Add assertions or interactions as needed
          page.on("console", (msg) => {
            if (msg.type() === "error") {
              // check if error is correctly handled
              expect(msg.text()).toContain(
                "Bookmarklet manager: invalid URL"
              );
            }
          });
        });
        test("Bookmarklet: manager.js, valid page", async ({ page }) => {
          await page.goto("https://google.com/bookmarlet.manager");
        });
        break;
      default:
    }
  }
});
