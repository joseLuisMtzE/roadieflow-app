import { config } from "dotenv";

config();
config({ path: ".env.local", override: true });

import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { Pool } from "pg";

import { getDirectDatabaseUrl } from "../lib/database-url";
import { PrismaClient, Role, Status } from "../lib/generated/prisma/client";

function shouldBootstrap(): boolean {
  if (process.env.VERCEL_ENV === "production") {
    return false;
  }

  return (
    process.env.VERCEL_ENV === "preview" ||
    process.env.SEED_DEMO_DATA === "true"
  );
}

function getAdminCredentials(): { email: string; password: string } {
  const email = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set for preview bootstrap",
    );
  }

  return { email, password };
}

async function seedDemoTour(prisma: PrismaClient): Promise<void> {
  const artistCount = await prisma.artist.count();
  if (artistCount > 0) {
    return;
  }

  const artist = await prisma.artist.create({
    data: {
      name: "Los Velvet",
      genre: "Indie rock",
    },
  });

  const eventCdmx = await prisma.event.create({
    data: {
      title: "Gira Norte — CDMX",
      date: new Date("2026-04-18T21:00:00.000Z"),
      locationName: "Foro Sol",
      city: "Ciudad de México",
      artistId: artist.id,
    },
  });

  const eventGdl = await prisma.event.create({
    data: {
      title: "Gira Norte — Guadalajara",
      date: new Date("2026-04-20T21:30:00.000Z"),
      locationName: "Teatro Diana",
      city: "Guadalajara",
      artistId: artist.id,
    },
  });

  const eventMty = await prisma.event.create({
    data: {
      title: "Gira Norte — Monterrey",
      date: new Date("2026-04-22T22:00:00.000Z"),
      locationName: "Auditorio Citibanamex",
      city: "Monterrey",
      artistId: artist.id,
    },
  });

  await prisma.logistics.createMany({
    data: [
      {
        type: "FLIGHT",
        status: Status.CONFIRMED,
        startTime: new Date("2026-04-17T14:30:00.000Z"),
        eventId: eventCdmx.id,
        details: {
          airline: "Aeroméxico",
          flightNumber: "AM 0152",
          from: "MTY",
          to: "MEX",
          note: "Llegada T2 — crew y banda",
        },
      },
      {
        type: "TRANSFER",
        status: Status.CONFIRMED,
        startTime: new Date("2026-04-17T18:00:00.000Z"),
        eventId: eventCdmx.id,
        details: {
          from: "AICM Terminal 2",
          to: "Hotel Histórico Centro",
          vehicle: "Van 12 pax",
        },
      },
      {
        type: "HOTEL",
        status: Status.CONFIRMED,
        startTime: new Date("2026-04-17T20:00:00.000Z"),
        eventId: eventCdmx.id,
        details: {
          name: "Hotel Histórico Centro",
          address: "Av. Juárez 14, Cuauhtémoc",
          checkIn: "2026-04-17",
          checkOut: "2026-04-19",
        },
      },
      {
        type: "TRANSFER",
        status: Status.PENDING,
        startTime: new Date("2026-04-18T17:30:00.000Z"),
        eventId: eventCdmx.id,
        details: {
          from: "Hotel Histórico Centro",
          to: "Foro Sol",
          vehicle: "Sprinter crew",
        },
      },
      {
        type: "FLIGHT",
        status: Status.CONFIRMED,
        startTime: new Date("2026-04-19T11:15:00.000Z"),
        eventId: eventGdl.id,
        details: {
          airline: "Volaris",
          flightNumber: "Y4 312",
          from: "MEX",
          to: "GDL",
        },
      },
      {
        type: "HOTEL",
        status: Status.CONFIRMED,
        startTime: new Date("2026-04-19T15:00:00.000Z"),
        eventId: eventGdl.id,
        details: {
          name: "Hotel Lafayette",
          address: "Av. Hidalgo 220, Centro",
          checkIn: "2026-04-19",
          checkOut: "2026-04-21",
        },
      },
      {
        type: "TRANSFER",
        status: Status.CONFIRMED,
        startTime: new Date("2026-04-20T19:00:00.000Z"),
        eventId: eventGdl.id,
        details: {
          from: "Hotel Lafayette",
          to: "Teatro Diana",
          vehicle: "Van 12 pax",
        },
      },
      {
        type: "FLIGHT",
        status: Status.PENDING,
        startTime: new Date("2026-04-21T09:45:00.000Z"),
        eventId: eventMty.id,
        details: {
          airline: "Viva Aerobus",
          flightNumber: "VB 1450",
          from: "GDL",
          to: "MTY",
        },
      },
    ],
  });

  console.log("Preview bootstrap: demo tour created");
}

async function ensureAdminUser(prisma: PrismaClient): Promise<void> {
  const { email, password } = getAdminCredentials();
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    create: {
      email,
      passwordHash,
      role: Role.ADMIN,
      name: "Admin demo",
    },
    update: {},
  });

  console.log("Preview bootstrap: admin ready", email);
}

async function main(): Promise<void> {
  if (!shouldBootstrap()) {
    console.log("Preview bootstrap: skipped");
    return;
  }

  const connectionString = getDirectDatabaseUrl();
  const pool = new Pool({ connectionString });
  pool.on("error", (error) => {
    console.error("Unexpected idle PostgreSQL client error", error);
  });

  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

  try {
    await seedDemoTour(prisma);
    await ensureAdminUser(prisma);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
