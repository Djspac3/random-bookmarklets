import { test, expect, ConsoleMessage } from "@playwright/test";
import { getFile } from "./getfiles";
const bookmark = getFile("manager.js");

test("run on incorrect page", async ({ page }) => {
  await page.goto("https://google.com/no.page");
  const consoleErrors: ConsoleMessage[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg);
    }
  });
  await page.evaluate(bookmark);
  await page.waitForTimeout(1000);
  //expect errors to be logged
  expect(consoleErrors.length).toBeGreaterThan(0);
});
test("run on correct page", async ({ page }) => {
  await page.goto("https://google.com/bookmarlet.manager");
  const consoleErrors: ConsoleMessage[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg);
    }
  });
  await page.evaluate(bookmark);
  await page.waitForTimeout(1000);
  //expect no errors to be logged
  expect(consoleErrors.length).toBe(0);
});
