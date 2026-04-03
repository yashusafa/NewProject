import { test, expect } from '@playwright/test';

test('basic onboarding -> budget -> style -> build -> save flow', async ({ page }) => {
  await page.goto('/onboarding');
  await page.getByPlaceholder('Display name').fill('Alex');
  await page.getByRole('button', { name: 'Save and continue' }).click();

  await expect(page).toHaveURL(/\/budget/);
  await page.getByRole('button', { name: 'Save and continue' }).click();
  await expect(page).toHaveURL(/\/style/);

  await page.getByRole('button', { name: 'casual' }).click();
  await page.getByRole('button', { name: 'Save and browse' }).click();
  await expect(page).toHaveURL(/\/browse/);

  await page.getByRole('button', { name: 'Add to outfit' }).first().click();
  await page.goto('/builder');
  await expect(page.getByText('Budget-counted subtotal')).toBeVisible();
  await page.getByRole('button', { name: 'Save outfit' }).click();

  await page.goto('/saved');
  await expect(page.getByText('Saved')).toBeVisible();
});
