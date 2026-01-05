// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";

const STUDIO = {
  name: "Arc Studio",
  tagline: "Warm, quiet, minimal studio for photo, podcast, and content days.",
  city: "Elkridge, MD",
};

const FEATURES = [
  {
    title: "Soft, controlled lighting",
    body: "Neutral tones, clean bounce, and adjustable fixtures.",
  },
  {
    title: "Quiet recordings",
    body: "Low-noise space for interviews, voice, and podcasts.",
  },
  {
    title: "Simple booking",
    body: "Pick a date and time. Instant request. Quick confirmation.",
  },
];

const PRICING = [
  { title: "1 Hour", price: "$60", desc: "Great for quick sessions." },
  { title: "2 Hours", price: "$110", desc: "Most common booking." },
  { title: "Half Day", price: "$200", desc: "Long shoot blocks." },
];

const FAQ = [
  {
    q: "What’s included?",
    a: "Main room access, seating set, and standard lighting. Add-ons can be selected during booking.",
  },
  {
    q: "Cancellation policy?",
    a: "Free cancellation up to 24 hours before your start time. Same-day cancellations are charged 50%.",
  },
  {
    q: "Can I book recurring sessions?",
    a: "Yes. Book your first slot, then contact us to set a recurring schedule.",
  },
];

function ArchFrame(props: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-t-[999px] rounded-b-2xl bg-surface shadow-soft ring-1 ring-black/5">
      {props.children}
    </div>
  );
}

function SectionTitle(props: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-2xl">
      {props.eyebrow ? (
        <p className="text-sm tracking-wide text-ink/70">{props.eyebrow}</p>
      ) : null}
      <h2 className="mt-2 font-serif text-3xl leading-tight text-ink md:text-4xl">
        {props.title}
      </h2>
      {props.subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-ink/80">
          {props.subtitle}
        </p>
      ) : null}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-bg text-ink">
      {/* HERO */}
      <section className="relative">
        {/* subtle spotlight */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(159,130,101,.25),transparent_55%)]" />

        <div className="mx-auto max-w-6xl px-4 pb-14 pt-10 md:pb-20 md:pt-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm tracking-wide text-ink/70">{STUDIO.city}</p>
              <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
                {STUDIO.name}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/80">
                {STUDIO.tagline}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/availability"
                  className="inline-flex items-center justify-center rounded-2xl bg-ink px-6 py-3 text-sm font-medium text-bg shadow-soft ring-1 ring-black/10 transition hover:opacity-95"
                >
                  Check availability
                </Link>
                <Link
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-2xl border border-ink/15 bg-transparent px-6 py-3 text-sm font-medium text-ink transition hover:bg-ink/5"
                >
                  View pricing
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="rounded-full bg-surface px-3 py-1 text-xs text-ink/80 ring-1 ring-black/5">
                  Photo
                </span>
                <span className="rounded-full bg-surface px-3 py-1 text-xs text-ink/80 ring-1 ring-black/5">
                  Podcast
                </span>
                <span className="rounded-full bg-surface px-3 py-1 text-xs text-ink/80 ring-1 ring-black/5">
                  Interviews
                </span>
                <span className="rounded-full bg-surface px-3 py-1 text-xs text-ink/80 ring-1 ring-black/5">
                  Content days
                </span>
              </div>
            </div>

            <ArchFrame>
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/studio/hero.jpg"
                  alt="Studio interior"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
            </ArchFrame>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <SectionTitle
          eyebrow="Space"
          title="Designed for calm, consistent results"
          subtitle="Warm neutral surfaces, soft edges, and controlled light. The setup is intentionally minimal so your subject stays the focus."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-surface p-6 shadow-soft ring-1 ring-black/5"
            >
              <h3 className="font-medium">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">
                {f.body}
              </p>
              <div className="mt-5 h-px w-full bg-ink/10" />
              <p className="mt-4 text-xs text-ink/70">
                Neutral palette • Minimal clutter • Easy setup
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="bg-surface/60">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <SectionTitle
            eyebrow="Gallery"
            title="Warm neutrals, soft shadows, clean lines"
            subtitle="A few angles of the space. Bring your camera, or keep it simple with phone content."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-12">
            <div className="relative col-span-12 overflow-hidden rounded-2xl bg-surface shadow-soft ring-1 ring-black/5 md:col-span-7">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/studio/gallery-1.jpg"
                  alt="Studio set"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="relative col-span-12 overflow-hidden rounded-2xl bg-surface shadow-soft ring-1 ring-black/5 md:col-span-5">
              <div className="relative aspect-[10/12]">
                <Image
                  src="/studio/gallery-2.jpg"
                  alt="Studio corner"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="relative col-span-12 overflow-hidden rounded-2xl bg-surface shadow-soft ring-1 ring-black/5 md:col-span-4">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/studio/gallery-3.jpg"
                  alt="Neutral backdrop"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="relative col-span-12 overflow-hidden rounded-2xl bg-surface shadow-soft ring-1 ring-black/5 md:col-span-4">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/studio/gallery-4.jpg"
                  alt="Seating set"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="relative col-span-12 overflow-hidden rounded-2xl bg-surface shadow-soft ring-1 ring-black/5 md:col-span-4">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/studio/gallery-5.jpg"
                  alt="Lighting detail"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/availability"
              className="inline-flex items-center justify-center rounded-2xl bg-ink px-6 py-3 text-sm font-medium text-bg shadow-soft ring-1 ring-black/10 transition hover:opacity-95"
            >
              Book a session
            </Link>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <SectionTitle
          eyebrow="Pricing"
          title="Simple time blocks"
          subtitle="Transparent pricing. Add-ons available during checkout."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {PRICING.map((p, idx) => (
            <div
              key={p.title}
              className="rounded-2xl bg-surface p-6 shadow-soft ring-1 ring-black/5"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-medium">{p.title}</h3>
                <span className="rounded-full bg-clay/20 px-3 py-1 text-xs text-ink/80 ring-1 ring-black/5">
                  {idx === 1 ? "Popular" : "Standard"}
                </span>
              </div>
              <p className="mt-4 font-serif text-3xl">{p.price}</p>
              <p className="mt-2 text-sm text-ink/80">{p.desc}</p>
              <div className="mt-6 h-px w-full bg-ink/10" />
              <ul className="mt-4 space-y-2 text-sm text-ink/80">
                <li>• Main room access</li>
                <li>• Seating set + neutral wall</li>
                <li>• Basic lighting included</li>
              </ul>
              <Link
                href="/availability"
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-ink px-6 py-3 text-sm font-medium text-bg shadow-soft ring-1 ring-black/10 transition hover:opacity-95"
              >
                Check times
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ + LOCATION */}
      <section id="faq" className="bg-surface/60">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <SectionTitle
                eyebrow="FAQ"
                title="Policies and details"
                subtitle="Keep it predictable. Show up, shoot, leave clean."
              />
              <div className="mt-8 space-y-6">
                {FAQ.map((item) => (
                  <div
                    key={item.q}
                    className="rounded-2xl bg-bg p-6 ring-1 ring-black/5"
                  >
                    <p className="font-medium">{item.q}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink/80">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionTitle
                eyebrow="Location"
                title="Easy access"
                subtitle="Address shown after booking confirmation. Parking instructions included."
              />

              <div className="mt-8 rounded-2xl bg-bg p-6 shadow-soft ring-1 ring-black/5">
                <p className="text-sm text-ink/80">
                  Hours: <span className="text-ink">9:00 AM – 9:00 PM</span>
                </p>
                <p className="mt-2 text-sm text-ink/80">
                  Typical setup: <span className="text-ink">5–10 minutes</span>
                </p>
                <div className="mt-6 h-px w-full bg-ink/10" />
                <p className="mt-4 text-sm leading-relaxed text-ink/80">
                  For a clean look, keep props minimal. Neutral outfits and skin
                  tones photograph well against the warm palette.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/availability"
                    className="inline-flex flex-1 items-center justify-center rounded-2xl bg-ink px-6 py-3 text-sm font-medium text-bg shadow-soft ring-1 ring-black/10 transition hover:opacity-95"
                  >
                    Book now
                  </Link>
                  <a
                    href="mailto:studio@example.com"
                    className="inline-flex flex-1 items-center justify-center rounded-2xl border border-ink/15 bg-transparent px-6 py-3 text-sm font-medium text-ink transition hover:bg-ink/5"
                  >
                    Contact
                  </a>
                </div>
              </div>

              <p className="mt-4 text-xs text-ink/60">
                Replace hero/gallery images in /public/studio/*.jpg. Update
                contact email when ready.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
