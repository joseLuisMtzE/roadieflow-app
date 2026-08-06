import { test, expect } from "@playwright/test";

import { loginAsAdmin } from "./helpers/auth";

test.describe.configure({ mode: "serial" });

test.describe("admin CRUD (M3)", () => {
  const runId = Date.now();
  const artistName = `E2E Artist ${runId}`;
  const eventTitle = `E2E Show ${runId}`;
  const transferFrom = `Origen E2E ${runId}`;
  const transferTo = `Destino E2E ${runId}`;
  const transferToEdited = `${transferTo} (editado)`;

  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test("creates artist and shows it in the list", async ({ page }) => {
    await page.goto("/artists/new", { waitUntil: "networkidle" });

    await page.getByLabel("Nombre").fill(artistName);
    await page.getByLabel(/Género/).fill("E2E rock");
    await page.getByRole("button", { name: "Crear artista" }).click();

    await expect(page).toHaveURL("/artists", { timeout: 15_000 });
    await expect(page.getByRole("heading", { name: artistName })).toBeVisible();
  });

  test("creates event and shows it in the list", async ({ page }) => {
    await page.goto("/events/new", { waitUntil: "networkidle" });

    await page.getByLabel("Título").fill(eventTitle);
    await page.locator("#event-date").fill("2026-12-15T21:00");
    await page.getByLabel("Venue").fill("Foro E2E");
    await page.getByLabel("Ciudad").fill("Ciudad E2E");
    await page.locator("#event-artist").selectOption({ label: artistName });
    await page.getByRole("button", { name: "Crear evento" }).click();

    await expect(page).toHaveURL("/events", { timeout: 15_000 });
    await expect(page.getByRole("heading", { name: eventTitle })).toBeVisible();
  });

  test("adds transfer logistics on event detail", async ({ page }) => {
    await page.goto("/events", { waitUntil: "networkidle" });
    await page.getByRole("link", { name: `Ver evento ${eventTitle}` }).click();

    await expect(page).toHaveURL(/\/events\/[^/]+$/, { timeout: 15_000 });
    await page.getByRole("button", { name: "Traslado" }).click();

    await page.locator("#transfer-start").fill("2026-12-15T17:30");
    await page.getByLabel("Origen").fill(transferFrom);
    await page.getByLabel("Destino").fill(transferTo);
    await page.getByLabel("Vehículo").fill("Van E2E");
    await page.getByRole("button", { name: "Añadir traslado" }).click();

    await expect(page).toHaveURL(/\/events\/[^/]+$/, { timeout: 15_000 });
    await expect(
      page.getByText(`${transferFrom} → ${transferTo}`),
    ).toBeVisible();
  });

  test("edits transfer logistics on event detail", async ({ page }) => {
    await page.goto("/events", { waitUntil: "networkidle" });
    await page.getByRole("link", { name: `Ver evento ${eventTitle}` }).click();

    const transferCard = page
      .locator("article")
      .filter({ hasText: `${transferFrom} → ${transferTo}` });
    await transferCard.getByRole("button", { name: "Editar" }).click();

    await expect(page).toHaveURL(/\/logistics\/transfer\/[^/]+\/edit$/, {
      timeout: 15_000,
    });

    await page.getByLabel("Destino").fill(transferToEdited);
    await page.getByRole("button", { name: "Guardar cambios" }).click();

    await expect(page).toHaveURL(/\/events\/[^/]+$/, { timeout: 15_000 });
    await expect(
      page.getByText(`${transferFrom} → ${transferToEdited}`),
    ).toBeVisible();
  });

  test("shows new event and transfer on itinerary", async ({ page }) => {
    await page.goto("/itinerary", { waitUntil: "networkidle" });

    await expect(page.getByText(eventTitle, { exact: true })).toBeVisible();
    await expect(
      page.getByText(`${transferFrom} → ${transferToEdited}`, { exact: true }),
    ).toBeVisible();
  });
});
