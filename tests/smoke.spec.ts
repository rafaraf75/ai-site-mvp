import { test, expect } from '@playwright/test';

test('redirects to /pl and navbar works', async ({ page }) => {
  const res = await page.goto('/');
  expect(res?.url()).toMatch(/\/pl\/?$/);

  // Navbar links exist
  await expect(page.getByRole('navigation', { name: /główna/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /usługi/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /kontakt/i })).toBeVisible();

  // Navigate to services
  await page.getByRole('link', { name: /usługi/i }).click();
  await expect(page).toHaveURL(/\/pl\/services/);

  // Back to home
  await page.getByRole('link', { name: /start/i }).click();
  await expect(page).toHaveURL(/\/pl\/?$/);

  // Change language to EN
  await page.getByRole('navigation', { name: /główna/i }).getByRole('link', { name: 'EN', exact: true }).click();
  await expect(page).toHaveURL(/\/en\/?$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/AI assistants/i);
});

test('contact form validates and sends', async ({ page }) => {
  await page.goto('/pl/contact');

  // Try submit with invalid data
  await page.getByRole('button', { name: /wyślij/i }).click();
  await expect(page.getByText(/niepoprawny email/i)).toBeVisible();

  // Fill valid data
  await page.getByLabel('Imię').fill('Jan Kowalski');
  await page.getByLabel('E-mail').fill('jan@example.com');
  await page.getByLabel('Wiadomość').fill('To jest testowa wiadomość z Playwright.');

  await page.getByRole('button', { name: /wyślij/i }).click();
  // Smoke: brak komunikatów błędu po wysłaniu poprawnych danych
  await expect(page.getByText(/Niepoprawny email/i)).toHaveCount(0);
  await expect(page.getByText(/za krótkie/i)).toHaveCount(0);
});
