import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="flex space-x-4 justify-between p-4 bg-gray-200">
        <div>
          {/* LOGO */}
          <Link className="hover:underline p-2 w-0 h-0" href="/">
            Logo
          </Link>
        </div>
        <div className="flex space-x-6">
          <div>
            <Link className="hover:underline p-2" href="/availability">
              Availability
            </Link>
          </div>
          <div>
            <Link className="hover:underline p-2" href="/pricing">
              Pricing
            </Link>
          </div>
          <div>
            <Link className="hover:underline p-2" href="/faq">
              FAQ
            </Link>
          </div>
          <div>
            <Link className="hover:underline p-2" href="/reservation">
              Reservation
            </Link>
          </div>
          <div>
            <Link className="hover:underline p-2" href="/contact">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
