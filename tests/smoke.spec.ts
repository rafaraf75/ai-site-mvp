import { test, expect } from '@playwright/test';

test('redirects to /pl and navbar works', async ({ page }) => {
  const res = await page.goto('/');
  expect(res?.url()).toMatch(/\/pl\/?$/);

  const nav = page.getByRole('navigation');

  await expect(nav).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Usługi', exact: true })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Kontakt', exact: true })).toBeVisible();

  await nav.getByRole('link', { name: 'Usługi', exact: true }).click();
  await expect(page).toHaveURL(/\/pl\/services/);

  await nav.getByRole('link', { name: 'Start', exact: true }).click();
  await expect(page).toHaveURL(/\/pl\/?$/);

  await nav.getByRole('link', { name: 'EN', exact: true }).click();
  await expect(page).toHaveURL(/\/en\/?$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('contact form validates and sends', async ({ page }) => {
  await page.goto('/pl/contact');

  await page.getByTestId('contact-submit').click();
  await expect(page.getByText(/niepoprawny email/i)).toBeVisible();

  await page.getByTestId('contact-name').fill('Jan Kowalski');
  await page.getByTestId('contact-email').fill('jan@example.com');
  await page.getByTestId('contact-message').fill('To jest testowa wiadomość z Playwright.');

  await page.getByTestId('contact-submit').click();
  await expect(page.getByText(/niepoprawny email/i)).toHaveCount(0);
  await expect(page.getByText(/za krótki|za krótkie/i)).toHaveCount(0);
});
