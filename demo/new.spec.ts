import { test, expect } from '@playwright/test';


test('test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('button', { name: 'Node.js' }).click();
  await page.getByLabel('Main', { exact: true }).getByRole('link', { name: 'Java' }).click();
  await page.getByRole('link', { name: 'Docs' }).click();
  await page.getByRole('link', { name: 'Auto-waiting' }).click();
});