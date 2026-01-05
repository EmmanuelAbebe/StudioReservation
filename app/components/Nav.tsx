import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <Link href="/" className="font-serif text-xl tracking-tight text-ink">
          Studio Name
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/availability" className="text-ink/80 hover:text-ink">
            Availability
          </Link>
          <Link href="/#pricing" className="text-ink/80 hover:text-ink">
            Pricing
          </Link>
          <Link href="/#gallery" className="text-ink/80 hover:text-ink">
            Gallery
          </Link>
          <Link href="/#faq" className="text-ink/80 hover:text-ink">
            FAQ
          </Link>
        </nav>

        {/* CTA */}
        <Link
          href="/reservation"
          className="rounded-full bg-ink px-5 py-2 text-sm text-bg hover:bg-ink/90 transition"
        >
          Make a Reservation
        </Link>
      </div>
    </header>
  );
}
