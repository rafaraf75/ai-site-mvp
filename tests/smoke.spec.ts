import { test, expect } from '@playwright/test';

test('redirects to /pl and navbar works', async ({ page }) => {
  const res = await page.goto('/');
  expect(res?.url()).toMatch(/\/pl\/?$/);

  const nav = page.getByTestId('site-navbar');

  await expect(nav).toBeVisible();
  await expect(page.getByTestId('nav-services-link')).toBeVisible();
  await expect(page.getByTestId('nav-contact-link')).toBeVisible();

  await page.getByTestId('nav-contact-link').click();
  await expect(page).toHaveURL(/\/pl\/contact/);

  await page.getByTestId('nav-home-link').click();
  await expect(page).toHaveURL(/\/pl\/?$/);

  await page.getByTestId('nav-lang-en').click();
  await expect(page).toHaveURL(/\/en(\/.*)?$/);
});

test('contact form validates and sends', async ({ page }) => {
  await page.route('**/api/contact', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.goto('/pl/contact');

  await expect(page.getByTestId('contact-name')).toBeVisible();
  await expect(page.getByTestId('contact-email')).toBeVisible();
  await expect(page.getByTestId('contact-message')).toBeVisible();

  await page.getByTestId('contact-submit').click();
  await expect(page).toHaveURL(/\/pl\/contact/);
  await expect(page.getByTestId('contact-name')).toBeVisible();

  await page.getByTestId('contact-name').fill('Jan Kowalski');
  await page.getByTestId('contact-email').fill('jan@example.com');
  await page.getByTestId('contact-message').fill('To jest testowa wiadomość z Playwright.');

  await page.getByTestId('contact-submit').click();

  await expect(page.getByTestId('contact-name')).toHaveValue('');
  await expect(page.getByTestId('contact-email')).toHaveValue('');
  await expect(page.getByTestId('contact-message')).toHaveValue('');
});
