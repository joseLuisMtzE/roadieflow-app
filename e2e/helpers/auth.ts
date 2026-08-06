import { expect, type Page } from "@playwright/test";

export const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@roadie.local";
export const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "roadie-demo";
export const roadStaffEmail =
  process.env.SEED_ROAD_STAFF_EMAIL ?? "roadie@roadie.local";
export const roadStaffPassword =
  process.env.SEED_ROAD_STAFF_PASSWORD ?? adminPassword;

export async function loginAs(
  page: Page,
  email: string,
  password: string,
  expectedPath: RegExp | string = /\/itinerary/,
) {
  await page.goto("/login", { waitUntil: "networkidle" });
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Contraseña").fill(password);
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page).toHaveURL(expectedPath, { timeout: 15_000 });
}

export async function loginAsAdmin(page: Page) {
  await loginAs(page, adminEmail, adminPassword);
}

export async function loginAsRoadStaff(page: Page) {
  await loginAs(page, roadStaffEmail, roadStaffPassword);
}
