// src/app/availability/page.tsx
import Link from "next/link";

type ApiSlot = { startAt: string; endAt: string; available: boolean };
type ApiResponse = { date: string; slots: ApiSlot[] };

export const runtime = "nodejs";

function pad2(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function toDateOnlyLocal(d: Date) {
  // YYYY-MM-DD in local time
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function addDays(d: Date, days: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

function fmtTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function fmtLongDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

async function getAvailability(date: string): Promise<ApiResponse> {
  const base =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    process.env.VERCEL_URL?.replace(/\/$/, "") ||
    "";

  const url =
    base && !base.startsWith("http")
      ? `https://${base}/api/availability?date=${encodeURIComponent(date)}`
      : `${base}/api/availability?date=${encodeURIComponent(date)}`;

  // On dev, base is "", so it becomes "/api/availability?date=..."
  const finalUrl = base
    ? url
    : `/api/availability?date=${encodeURIComponent(date)}`;

  const res = await fetch(finalUrl, { cache: "no-store" });
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`Availability fetch failed (${res.status}): ${msg}`);
  }
  return res.json();
}

function ArchCard(props: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-t-[999px] rounded-b-2xl bg-surface shadow-soft ring-1 ring-black/5">
      {props.children}
    </div>
  );
}

export default async function AvailabilityPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const sp = await searchParams;
  const today = new Date();
  const defaultDate = toDateOnlyLocal(today);
  const date =
    typeof sp.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(sp.date)
      ? sp.date
      : defaultDate;

  let data: ApiResponse;
  try {
    data = await getAvailability(date);
  } catch {
    data = { date, slots: [] };
  }

  const prevDate = toDateOnlyLocal(addDays(new Date(date + "T00:00:00"), -1));
  const nextDate = toDateOnlyLocal(addDays(new Date(date + "T00:00:00"), 1));

  return (
    <main className="bg-bg text-ink">
      <div className="min-h-[calc(100vh-4rem)] flex items-center">
        <section className="w-full">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(159,130,101,.20),transparent_55%)]" />
          <div className="mx-auto max-w-6xl px-4 pb-10 pt-10 md:pb-14">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm tracking-wide text-ink/70">
                  Availability
                </p>
                <h1 className="mt-2 font-serif text-4xl leading-tight md:text-5xl">
                  {fmtLongDate(date)}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/80">
                  Pick a time block. Unavailable slots are already booked.
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 md:mt-0">
                <Link
                  href={`/availability?date=${prevDate}`}
                  className="rounded-2xl border border-ink/15 bg-transparent px-4 py-2 text-sm font-medium text-ink transition hover:bg-ink/5"
                >
                  ← Prev
                </Link>
                <Link
                  href={`/availability?date=${defaultDate}`}
                  className="rounded-2xl border border-ink/15 bg-transparent px-4 py-2 text-sm font-medium text-ink transition hover:bg-ink/5"
                >
                  Today
                </Link>
                <Link
                  href={`/availability?date=${nextDate}`}
                  className="rounded-2xl border border-ink/15 bg-transparent px-4 py-2 text-sm font-medium text-ink transition hover:bg-ink/5"
                >
                  Next →
                </Link>

                <form
                  action="/availability"
                  method="get"
                  className="ml-0 flex items-center gap-2 md:ml-2"
                >
                  <label className="text-xs text-ink/70" htmlFor="date">
                    Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    defaultValue={date}
                    className="h-10 rounded-2xl border border-ink/15 bg-bg px-3 text-sm outline-none ring-0 focus:border-ink/25"
                  />
                  <button
                    type="submit"
                    className="h-10 rounded-2xl bg-ink px-4 text-sm font-medium text-bg shadow-soft ring-1 ring-black/10 transition hover:opacity-95"
                  >
                    Go
                  </button>
                </form>
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-12">
              {/* Left: day summary / vibe card */}
              <div className="md:col-span-4">
                <ArchCard>
                  <div className="p-6">
                    <p className="text-xs tracking-wide text-ink/70">Hours</p>
                    <p className="mt-2 text-sm text-ink/85">
                      9:00 AM – 9:00 PM
                    </p>

                    <div className="mt-6 h-px bg-ink/10" />

                    <p className="mt-6 text-xs tracking-wide text-ink/70">
                      Session notes
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink/80">
                      <li>• Please arrive 5 minutes early.</li>
                      <li>• Keep props minimal for the clean look.</li>
                      <li>• Reset the space before leaving.</li>
                    </ul>

                    <div className="mt-6 h-px bg-ink/10" />

                    <p className="mt-6 text-xs tracking-wide text-ink/70">
                      Legend
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-bg px-3 py-1 text-xs text-ink/80 ring-1 ring-black/10">
                        Available
                      </span>
                      <span className="rounded-full bg-ink/10 px-3 py-1 text-xs text-ink/70 ring-1 ring-black/5">
                        Booked
                      </span>
                    </div>
                  </div>
                </ArchCard>
              </div>

              {/* Right: slots */}
              <div className="md:col-span-8">
                <div className="rounded-2xl bg-surface p-6 shadow-soft ring-1 ring-black/5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs tracking-wide text-ink/70">
                        Select a time
                      </p>
                      <p className="mt-2 text-sm text-ink/80">
                        Click an available slot to continue.
                      </p>
                    </div>
                    <Link
                      href="/"
                      className="text-sm font-medium text-ink/70 underline-offset-4 hover:underline"
                    >
                      Back to home
                    </Link>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {data.slots.length === 0 ? (
                      <div className="col-span-full rounded-2xl bg-bg p-6 text-sm text-ink/70 ring-1 ring-black/5">
                        No slots returned. Confirm your API route and database
                        connection.
                      </div>
                    ) : (
                      data.slots.map((s) => {
                        const href = `/book?startAt=${encodeURIComponent(
                          s.startAt
                        )}&endAt=${encodeURIComponent(s.endAt)}`;

                        if (!s.available) {
                          return (
                            <div
                              key={s.startAt}
                              className="flex h-12 items-center justify-center rounded-2xl bg-ink/10 text-sm text-ink/60 ring-1 ring-black/5"
                              aria-disabled="true"
                              title="Booked"
                            >
                              {fmtTime(s.startAt)}
                            </div>
                          );
                        }

                        return (
                          <Link
                            key={s.startAt}
                            href={href}
                            className="flex h-12 items-center justify-center rounded-2xl bg-bg text-sm font-medium text-ink shadow-soft ring-1 ring-black/10 transition hover:bg-ink/5"
                            title="Book this time"
                          >
                            {fmtTime(s.startAt)}
                          </Link>
                        );
                      })
                    )}
                  </div>

                  <div className="mt-8 h-px w-full bg-ink/10" />

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-bg p-5 ring-1 ring-black/5">
                      <p className="text-xs tracking-wide text-ink/70">Tip</p>
                      <p className="mt-2 text-sm leading-relaxed text-ink/80">
                        For interviews, choose earlier slots to avoid end-of-day
                        noise and setup delays.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-bg p-5 ring-1 ring-black/5">
                      <p className="text-xs tracking-wide text-ink/70">
                        Policy
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-ink/80">
                        Bookings are held pending confirmation. You’ll see a
                        receipt after submitting.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs text-ink/60">
                  Slot availability is generated from open hours and blocked by
                  overlapping reservations (status not CANCELLED).
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
