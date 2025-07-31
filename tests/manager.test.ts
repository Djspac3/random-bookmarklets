//REMINDER: THIS IS NOT A LIBRARY ITS TO TEST THE BOOKMARKLET MANAGER SCRIPT
import { test, expect, ConsoleMessage } from "@playwright/test";
import { getFile } from "./getfiles";
const bookmark = getFile("manager.js");

test("run on incorrect page", async ({ page }) => {
  await page.goto("https://google.com/no.page");
  const consoleMessages: ConsoleMessage[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleMessages.push(msg);
    }
  });
  await page.evaluate(bookmark);
  await page.waitForTimeout(1000);
  //expect errors to be logged
  expect(consoleMessages.length).toBeGreaterThan(0)
});
