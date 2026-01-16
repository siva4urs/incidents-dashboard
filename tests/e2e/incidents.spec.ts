import { expect, test } from '@playwright/test';

test.describe('Incidents UI', () => {
  test('renders a table on desktop and is sorted by priority then datetime', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Incidents' })).toBeVisible();

    const rows = page.locator('[data-testid="incident-row"]');
    await expect(rows.first()).toBeVisible();

    // Based on provided fake API data, ids 3 and 5 are High priority (1), and 5 is later.
    const firstRowText = await rows.first().innerText();
    expect(firstRowText).toContain('Fire');

    // Hover changes background. We assert computed style changes.
    const firstRow = rows.first();
    const bgBefore = await firstRow.evaluate((el) => getComputedStyle(el).backgroundColor);
    await firstRow.hover();
    const bgAfter = await firstRow.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bgAfter).not.toEqual(bgBefore);
  });

  test('renders a list on mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Runs on the mobile project only');
    await page.goto('/');
    const items = page.locator('[data-testid="incident-item"]');
    await expect(items.first()).toBeVisible();
  });
});
