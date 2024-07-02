import { test, expect, chromium } from "@playwright/test";
import { auto } from "auto-playwright";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Ensure the OpenAI API key is set
if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not defined in the .env file");
}

test("auto Playwright example", async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  page.setViewportSize({ width: 1000, height: 800 });
  await page.goto("https://www.google.com/");

  // Ensure 'auto-playwright' functions are properly awaited
    await auto("Click on the Search text field", { page, test });

  // In this case, the result is plain-text contents of the header
  const headerText = await auto("get the header text", { page, test });

  // Ensure the header text is not empty or null
  if (headerText) {
    // auto will find and fill in the search text input
    await auto(`Type "${headerText}" in the search box`, { page, test });

    // Assert the state of the website
    const searchInputHasHeaderText = await auto(`Is the contents of the search box equal to "${headerText}"?`, { page, test });

    expect(searchInputHasHeaderText).toBe(true);
  } else {
    console.error("Header text is empty or null");
  }

  await browser.close();
});
