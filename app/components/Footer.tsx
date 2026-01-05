import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface text-ink">
      <div className="max-w-6xl mx-auto px-4 py-16 grid gap-12 md:grid-cols-3">
        {/* Studio info */}
        <div className="space-y-4">
          <p className="font-serif text-lg">Studio Name</p>
          <p className="text-sm text-ink/70 leading-relaxed">
            A quiet, fully equipped creative studio designed for recording,
            photography, and intimate sessions.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-3 text-sm">
          <p className="uppercase tracking-wide text-xs text-ink/50">Studio</p>
          <ul className="space-y-2">
            <li>
              <Link href="/availability" className="hover:underline">
                Availability
              </Link>
            </li>
            <li>
              <Link href="/#pricing" className="hover:underline">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:underline">
                Policies & FAQ
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:underline">
                Admin
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-3 text-sm">
          <p className="uppercase tracking-wide text-xs text-ink/50">Contact</p>
          <p>City, State</p>
          <p>Email: hello@studio.com</p>
          <p className="text-ink/60">By appointment only</p>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-ink/50 flex justify-between">
          <span>© {new Date().getFullYear()} Studio Name</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
