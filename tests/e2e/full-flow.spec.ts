import { test, expect } from '@playwright/test';

test('signup -> onboarding -> budget -> style -> shop -> builder -> save', async ({ page }) => {
  await page.goto('/signup');
  await page.getByPlaceholder('Display name').fill('Alex');
  await page.getByPlaceholder('Email').fill('alex@example.com');
  await page.getByPlaceholder('Password (8+ chars)').fill('password123');
  await page.getByRole('button', { name: 'Create account' }).click();

  await expect(page).toHaveURL(/\/onboarding/);
  await page.getByRole('button', { name: 'Save profile and continue' }).click();

  await expect(page).toHaveURL(/\/budget/);
  await page.getByRole('button', { name: 'Save budget and continue' }).click();

  await expect(page).toHaveURL(/\/style/);
  await page.getByRole('button', { name: 'casual' }).click();
  await page.getByRole('button', { name: 'Continue to shop' }).click();

  await expect(page).toHaveURL(/\/shop/);
  await page.getByRole('button', { name: 'Add to outfit' }).first().click();

  await page.goto('/outfit-builder');
  await expect(page.getByText('Budget summary')).toBeVisible();
  await page.getByPlaceholder('Outfit title').fill('My look');
  await page.getByRole('button', { name: 'Save outfit' }).click();

  await page.goto('/saved-outfits');
  await expect(page.getByText('My look')).toBeVisible();
});
