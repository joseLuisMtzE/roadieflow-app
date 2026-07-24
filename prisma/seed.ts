import { config } from "dotenv";

config();
config({ path: ".env.local", override: true });

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { PrismaClient, Status } from "../lib/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    "DATABASE_URL no está definida — copia .env.example a .env.local",
  );
}

const pool = new Pool({ connectionString });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  await prisma.logistics.deleteMany();
  await prisma.event.deleteMany();
  await prisma.artist.deleteMany();

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

  console.log("Seed OK:", {
    artist: artist.name,
    events: [eventCdmx.city, eventGdl.city, eventMty.city],
    logistics: 8,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
