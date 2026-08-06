import { test, expect } from "@playwright/test";

import { loginAsRoadStaff } from "./helpers/auth";

test.describe("RBAC (M3)", () => {
  test("redirects unauthenticated users from /artists to login", async ({
    page,
  }) => {
    await page.goto("/artists", { waitUntil: "networkidle" });
    await expect(page).toHaveURL(/\/login/);
  });

  test("road staff cannot access admin CRUD UI", async ({ page }) => {
    await loginAsRoadStaff(page);

    await page.goto("/events", { waitUntil: "networkidle" });
    await expect(page.getByRole("link", { name: "Nuevo evento" })).toHaveCount(
      0,
    );
    await expect(
      page.getByRole("button", { name: "Nuevo evento" }),
    ).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Editar" })).toHaveCount(0);

    await page.goto("/events/new", { waitUntil: "networkidle" });
    await expect(page).toHaveURL("/events");

    await page.goto("/artists", { waitUntil: "networkidle" });
    await expect(page.getByRole("link", { name: "Nuevo artista" })).toHaveCount(
      0,
    );
    await expect(
      page.getByRole("button", { name: "Nuevo artista" }),
    ).toHaveCount(0);

    await page.goto("/artists/new", { waitUntil: "networkidle" });
    await expect(page).toHaveURL("/artists");
  });
});
