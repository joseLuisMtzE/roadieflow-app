import { test, expect } from "@playwright/test";

const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@roadie.local";
const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "roadie-demo";

test.describe("login flow", () => {
  test("redirects unauthenticated users from itinerary to login", async ({
    page,
  }) => {
    await page.goto("/itinerary", { waitUntil: "networkidle" });
    await expect(page).toHaveURL(/\/login/);
  });

  test("signs in and shows itinerary content", async ({ page }) => {
    await page.goto("/login", { waitUntil: "networkidle" });

    await page.getByLabel("Email").fill(adminEmail);
    await page.getByLabel("Contraseña").fill(adminPassword);
    await page.getByRole("button", { name: "Entrar" }).click();

    await expect(page).toHaveURL("/itinerary", { timeout: 15_000 });
    await expect(
      page.getByRole("heading", { name: "Itinerario", level: 1 }),
    ).toBeVisible();
    await expect(page.locator("section").first()).toBeVisible();
  });

  test("shows error on invalid credentials", async ({ page }) => {
    await page.goto("/login", { waitUntil: "networkidle" });
    await page.getByLabel("Email").fill("wrong@roadie.local");
    await page.getByLabel("Contraseña").fill("wrong-password");
    await page.getByRole("button", { name: "Entrar" }).click();

    await expect(page).toHaveURL(/\/login/);
    await expect(
      page.getByText("Email o contraseña incorrectos"),
    ).toBeVisible();
  });
});
