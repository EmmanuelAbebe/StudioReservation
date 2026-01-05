import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaSpotify,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import {
  PiApplePodcastsLogo,
  PiApplePodcastsLogoFill,
  PiGooglePodcastsLogo,
} from "react-icons/pi";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="">Studio name + 1-liner + check aviliability</div>
        <div className="">
          featrure trio: souned-treated, lighting, flexabile time blocks
        </div>
        <div className="">prising cards 1hr 2hr half a day</div>
        <div className="">Gallary 6 to 9 images</div>
        <div className="">FQG: cancellation, late policy, depost</div>
        <div className="flex space-x-4 justify-around w-full py-4">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-pink-600 hover:text-pink-500 transition-colors"
          >
            <FaInstagram size={24} />
          </a>

          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-blue-600 hover:text-blue-500 transition-colors"
          >
            <FaFacebook size={24} />
          </a>

          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-red-600 hover:text-red-500 transition-colors"
          >
            <FaYoutube size={24} />
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="text-sky-500 hover:text-sky-400 transition-colors"
          >
            <FaTwitter size={24} />
          </a>

          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="text-black dark:text-white hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
          >
            <FaTiktok size={24} />
          </a>

          <a
            href="https://www.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Spotify"
            className="text-green-500 hover:text-green-400 transition-colors"
          >
            <FaSpotify size={24} />
          </a>

          <a
            href="https://podcasts.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apple Podcasts"
            className="text-purple-600 hover:text-purple-500 transition-colors"
          >
            <PiApplePodcastsLogoFill size={24} />
          </a>

          <a
            href="https://podcasts.google.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Podcasts"
            className="text-amber-500 hover:text-amber-400 transition-colors"
          >
            <PiGooglePodcastsLogo size={24} />
          </a>
        </div>
      </main>
    </div>
  );
}

// ## Target stack (works locally + Vercel)

// * Next.js App Router
// * Prisma
// * Hosted Postgres (Neon/Supabase/Render/etc.)
// * Vercel env vars: `DATABASE_URL`, `DIRECT_URL` (recommended for pooled setups)

// ## 1) Install Prisma + initialize

// ```bash
// npm i prisma @prisma/client
// npx prisma init
// ```

// This creates:

// * `prisma/schema.prisma`
// * `.env` (local)

// ## 2) Configure your hosted Postgres connection

// In `.env` set:

// ```bash
// DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?sslmode=require"
// DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?sslmode=require"
// ```

// Rules:

// * `DATABASE_URL` = pooled/normal connection string (what the app uses)
// * `DIRECT_URL` = direct/non-pooled connection string (what migrations use)
//   If your provider only gives one URL, use the same value for both.

// ## 3) Prisma schema (minimal reservation model)

// `prisma/schema.prisma`

// ```prisma
// generator client {
//   provider = "prisma-client-js"
// }

// datasource db {
//   provider  = "postgresql"
//   url       = env("DATABASE_URL")
//   directUrl = env("DIRECT_URL")
// }

// enum ReservationStatus {
//   PENDING
//   CONFIRMED
//   CANCELLED
// }

// model Reservation {
//   id        String            @id @default(cuid())
//   start     DateTime
//   end       DateTime
//   name      String
//   email     String
//   phone     String?
//   notes     String?
//   status    ReservationStatus @default(PENDING)
//   createdAt DateTime          @default(now())
//   updatedAt DateTime          @updatedAt

//   @@index([start])
//   @@index([status])
// }
// ```

// ## 4) Create tables (migration)

// ```bash
// npx prisma migrate dev --name init
// ```

// ## 5) Prisma client singleton (prevents hot-reload connections)

// Create `lib/prisma.ts`

// ```ts
// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: ["error"],
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
// ```

// ## 6) API routes (App Router) for reservations

// ### `app/api/reservations/route.ts`

// ```ts
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET() {
//   const items = await prisma.reservation.findMany({
//     orderBy: { start: "asc" },
//     take: 200,
//   });
//   return NextResponse.json(items);
// }

// export async function POST(req: Request) {
//   const body = await req.json();

//   // Minimal validation (replace with zod later)
//   const { start, end, name, email, phone, notes } = body ?? {};
//   if (!start || !end || !name || !email) {
//     return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//   }

//   const startDt = new Date(start);
//   const endDt = new Date(end);
//   if (!(startDt < endDt)) {
//     return NextResponse.json({ error: "Invalid time range" }, { status: 400 });
//   }

//   // Overlap check
//   const conflict = await prisma.reservation.findFirst({
//     where: {
//       status: { not: "CANCELLED" },
//       AND: [{ start: { lt: endDt } }, { end: { gt: startDt } }],
//     },
//     select: { id: true },
//   });

//   if (conflict) {
//     return NextResponse.json({ error: "Slot not available" }, { status: 409 });
//   }

//   const created = await prisma.reservation.create({
//     data: {
//       start: startDt,
//       end: endDt,
//       name,
//       email,
//       phone: phone || null,
//       notes: notes || null,
//     },
//     select: { id: true },
//   });

//   return NextResponse.json(created, { status: 201 });
// }
// ```

// ### `app/api/reservations/[id]/route.ts`

// ```ts
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const body = await req.json();
//   const { status } = body ?? {};

//   if (!["PENDING", "CONFIRMED", "CANCELLED"].includes(status)) {
//     return NextResponse.json({ error: "Invalid status" }, { status: 400 });
//   }

//   const updated = await prisma.reservation.update({
//     where: { id: params.id },
//     data: { status },
//     select: { id: true, status: true },
//   });

//   return NextResponse.json(updated);
// }
// ```

// ## 7) Availability API (slot generation + conflict marking)

// Create `lib/slots.ts`

// ```ts
// export type Slot = { start: Date; end: Date };

// export function generateHourlySlots(dateISO: string): Slot[] {
//   // dateISO: "YYYY-MM-DD"
//   const [y, m, d] = dateISO.split("-").map(Number);
//   const base = new Date(y, m - 1, d);

//   const openHour = 9;
//   const closeHour = 21;

//   const slots: Slot[] = [];
//   for (let h = openHour; h < closeHour; h++) {
//     const start = new Date(base);
//     start.setHours(h, 0, 0, 0);
//     const end = new Date(base);
//     end.setHours(h + 1, 0, 0, 0);
//     slots.push({ start, end });
//   }
//   return slots;
// }

// export function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
//   return aStart < bEnd && bStart < aEnd;
// }
// ```

// Create `app/api/availability/route.ts`

// ```ts
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { generateHourlySlots, overlaps } from "@/lib/slots";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const date = searchParams.get("date"); // YYYY-MM-DD
//   if (!date) return NextResponse.json({ error: "Missing date" }, { status: 400 });

//   const slots = generateHourlySlots(date);

//   // Pull reservations for that day window
//   const dayStart = new Date(slots[0].start);
//   dayStart.setHours(0, 0, 0, 0);
//   const dayEnd = new Date(slots[0].start);
//   dayEnd.setHours(23, 59, 59, 999);

//   const reservations = await prisma.reservation.findMany({
//     where: {
//       status: { not: "CANCELLED" },
//       AND: [{ start: { lte: dayEnd } }, { end: { gte: dayStart } }],
//     },
//     select: { start: true, end: true },
//   });

//   const result = slots.map((s) => {
//     const available = !reservations.some((r) =>
//       overlaps(s.start, s.end, r.start, r.end)
//     );
//     return { start: s.start.toISOString(), end: s.end.toISOString(), available };
//   });

//   return NextResponse.json({ date, slots: result });
// }
// ```

// ## 8) Vercel deployment notes (so it doesn’t break)

// * Add environment variables in Vercel Project Settings:

//   * `DATABASE_URL`
//   * `DIRECT_URL`
// * Ensure Prisma generates during build. Add to `package.json`:

// ```json
// {
//   "scripts": {
//     "postinstall": "prisma generate",
//     "build": "prisma generate && next build"
//   }
// }
// ```

// * Run migrations against production DB from your machine (or CI), not from Vercel runtime:

// ```bash
// npx prisma migrate deploy
// ```

// ## 9) Minimum UI wiring (no extra libraries)

// * Availability page fetches `/api/availability?date=YYYY-MM-DD`
// * Clicking a slot routes to `/book?start=...&end=...`
// * Booking page posts to `/api/reservations`
// * Redirect to `/confirm/[id]`
// * Admin page fetches `/api/reservations` and PATCH status

// This gets you a real working reservation system with hosted Postgres, compatible with Vercel, without Docker.
