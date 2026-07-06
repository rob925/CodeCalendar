const { expect, test } = require("@playwright/test");

async function collectConsoleErrors(page) {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

async function bootApp(page, viewport) {
  if (viewport) await page.setViewportSize(viewport);
  await page.route("https://hn.algolia.com/**", (route) => route.abort());
  const errors = await collectConsoleErrors(page);
  await page.goto("/");
  await expect(page.locator("#calendarGrid .calendar-cell")).toHaveCount(42);
  await expect(page.locator("#eventList .event-card").first()).toBeVisible();
  return errors;
}

test.describe("CodeCalendar e2e", () => {
  test("desktop user can inspect and save an event as guest", async ({ page }) => {
    const errors = await bootApp(page, { width: 1440, height: 1000 });

    await expect(page.locator("#subjectSwitcher")).toBeVisible();
    await expect(page.locator("#calendarGrid")).toBeVisible();
    await expect(page.locator("#eventList")).toBeVisible();
    await expect(page.locator("#newsList .news-card").first()).toBeVisible();

    const visibleCount = Number(await page.locator("#visibleCount").innerText());
    await expect(visibleCount).toBeGreaterThan(0);

    await page.locator("#eventList .event-card").first().click();
    await expect(page.locator("#eventDialog")).toBeVisible();
    await expect(page.locator("#dialogTitle")).not.toBeEmpty();
    await expect(page.locator("#dialogDescription")).not.toBeEmpty();
    await expect(page.locator("#dialogLink")).toHaveAttribute("href", /^https:\/\//);

    await expect(page.locator("#registeredCount")).toHaveText("0");
    await page.locator("#registerButton").click();
    await expect(page.locator("#registerButton")).toHaveClass(/is-registered/);
    await expect(page.locator("#registeredCount")).toHaveText("1");
    await expect(page.locator("#eventList .event-card.is-registered").first()).toBeVisible();

    await page.locator("#closeDialog").click();
    await expect(page.locator("#eventDialog")).not.toBeVisible();
    await page.locator("#showRegistered").click();
    await expect(page.locator("#eventList .event-card")).toHaveCount(1);
    await expect(page.locator("#eventList .event-card.is-registered")).toHaveCount(1);

    expect(errors.filter((error) => !error.includes("Failed to load resource"))).toEqual([]);
  });

  test("mobile layout keeps controls, calendar, filters, and dialog inside viewport", async ({ page }) => {
    await bootApp(page, { width: 390, height: 844 });

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);

    await expect(page.locator("#subjectSwitcher")).toBeVisible();
    await expect(page.locator("#themeToggle")).toBeVisible();
    await expect(page.locator("#filters .filter-chip").first()).toBeVisible();
    await expect(page.locator("#calendarGrid .calendar-cell")).toHaveCount(42);

    await page.locator("#calendarGrid .event-chip").first().click();
    await expect(page.locator("#eventDialog")).toBeVisible();

    const dialogBox = await page.locator("#eventDialog").boundingBox();
    expect(dialogBox.x).toBeGreaterThanOrEqual(0);
    expect(dialogBox.y).toBeGreaterThanOrEqual(0);
    expect(dialogBox.x + dialogBox.width).toBeLessThanOrEqual(390);
    expect(dialogBox.y + dialogBox.height).toBeLessThanOrEqual(844);
  });

  test("subject, language, and theme switches update visible app state", async ({ page }) => {
    await bootApp(page, { width: 1280, height: 900 });

    await page.locator('[data-subject="math"]').click();
    await expect(page.locator("body")).toHaveAttribute("data-subject", "math");
    await expect(page.locator("#newsTitle")).toContainText("математ", { ignoreCase: true });

    await page.locator('[data-subject="physics"]').click();
    await expect(page.locator("body")).toHaveAttribute("data-subject", "physics");
    await expect(page.locator("#newsTitle")).toContainText("физик", { ignoreCase: true });

    const initialTheme = await page.locator("body").getAttribute("data-theme");
    await page.locator("#themeToggle").click();
    await expect(page.locator("body")).toHaveAttribute("data-theme", initialTheme === "dark" ? "light" : "dark");

    await page.locator('[data-lang="en"]').click();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("#showRegistered")).toHaveText("My events");
    await expect(page.locator("#monthTitle")).toContainText("July 2026");
  });

  test("auth dialog validates email, name, and password before network auth", async ({ page }) => {
    await bootApp(page, { width: 1280, height: 900 });

    await page.locator("#authOpenButton").click();
    await expect(page.locator("#authDialog")).toBeVisible();

    await page.locator("#authEmailSignIn").fill("bad");
    await page.locator("#authPasswordSignIn").fill("123");
    await page.locator("#authSubmit").click();
    await expect(page.locator("#authMessage")).toContainText("Email");

    await page.locator("#authEmailSignIn").fill("user@example.com");
    await page.locator("#authPasswordSignIn").fill("пароль12");
    await page.locator("#authSubmit").click();
    await expect(page.locator("#authMessage")).toContainText("русские буквы");

    await page.locator("#authModeToggle").click();
    await expect(page.locator("#authTitle")).toContainText("Регистрация");
    await page.locator("#authEmailSignUp").fill("new@example.com");
    await page.locator("#authPasswordSignUp").fill("abcdef");
    await page.locator("#authSubmit").click();
    await expect(page.locator("#authMessage")).toContainText("Введите имя");

    await page.locator("#authName").fill("Maksim");
    await page.locator("#authEmailSignUp").fill("maksim@gm");
    await expect(page.locator("#emailGhostSignUp")).toContainText("maksim@gmail.com");
  });

  test("client boot loads calendar data before runtime", async ({ page }) => {
    const errors = await bootApp(page, { width: 1024, height: 768 });

    expect(errors.join("\n")).not.toContain("CodeCalendar data must be loaded before app.js");
    await expect(page.locator("#calendarGrid .event-chip").first()).toBeVisible();
  });
});
