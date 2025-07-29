import { test, expect, ConsoleMessage } from "@playwright/test";
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

for (const bookmarklet of bookmarkletFiles) {
  const bookmarkletPath = path.join(bookmarkletDir, bookmarklet);
  const bookmarkletContent = fs.readFileSync(bookmarkletPath);

  
  switch (bookmarklet) {
    case "manager.js":
      test("Bookmarklet: manager.js, invalid page", async ({ page }) => {
        await page.goto("https://google.com/no.page");
        page.addScriptTag({content: bookmarkletContent.toString()});

        var consoleMessages: ConsoleMessage[] = [];
          page.on("console", (msg) => {
          if (msg.type() === "error") {
            // check if error is correctly handled
            consoleMessages.push(msg);
          }
        });
        // wait for it to finish
        await page.waitForTimeout(1000);
        expect(consoleMessages.length).toBeGreaterThan(0);
        expect(consoleMessages[0].type()).toBe("error");
        expect(consoleMessages[0].text()).toContain("bookmarklet manager: unvalid URL");
      });
      test("Bookmarklet: manager.js, valid page", async ({ page }) => {
        await page.goto("https://google.com/bookmarlet.manager");
        page.addScriptTag({content: bookmarkletContent.toString()});

        var consoleMessages: ConsoleMessage[] = [];
        page.on("console", (msg) => {
          consoleMessages.push(msg);
        });

        await page.waitForTimeout(1000);
        
      });
      break;
    case "tools.js":
      
      break;
    default:
      test(`Bookmarklet: ${bookmarklet}, unknown script for testing, checking for errors`, async ({ page }) => {
        await page.goto(`https://google.com/bookmarlet.${bookmarklet}`);
        page.addScriptTag({content: bookmarkletContent.toString()});

        var consoleMessages: ConsoleMessage[] = [];
        page.on("console", (msg) => {
          consoleMessages.push(msg);
        });

        await page.waitForTimeout(1000);
        // Check if the bootloader logs are present
        expect(consoleMessages.length).toBeGreaterThan(0);
        expect(consoleMessages[0].text()).toContain("Bookmarklet loaded successfully");
      });
      break;
  }
};