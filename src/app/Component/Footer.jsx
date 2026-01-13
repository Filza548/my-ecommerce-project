import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50 mt-20">
      {/* Top */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-14">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500">
                {/* Bag icon */}
                <svg
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M7 9V8a5 5 0 0 1 10 0v1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6 9h12l-1 12H7L6 9Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-2xl font-semibold text-blue-500">
                Brand
              </span>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-500">
              Best information about the company <br />
              gies here but now lorem ipsum is
            </p>

            {/* Social icons */}
            <div className="mt-5 flex items-center gap-3">
              <SocialIcon label="Facebook">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6h1.7V4.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.2V11H8v3h2.3v8h3.2z" />
                </svg>
              </SocialIcon>

              <SocialIcon label="Twitter">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M22 5.8c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.2-.8.5-1.6.8-2.5 1A3.9 3.9 0 0 0 12 8.1c0 .3 0 .6.1.9-3.2-.2-6-1.7-7.9-4.2-.3.6-.5 1.3-.5 2 0 1.4.7 2.7 1.9 3.4-.6 0-1.2-.2-1.7-.5v.1c0 2 1.4 3.6 3.2 4-.3.1-.7.1-1 .1-.2 0-.5 0-.7-.1.5 1.7 2.1 2.9 3.9 2.9A7.8 7.8 0 0 1 2 19.1 11 11 0 0 0 8 20.9c7.2 0 11.2-6.1 11.2-11.4v-.5c.7-.5 1.4-1.2 1.8-2z" />
                </svg>
              </SocialIcon>

              <SocialIcon label="LinkedIn">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M6.5 8.5H3.2V21h3.3V8.5zM4.8 3C3.8 3 3 3.8 3 4.8c0 1 .8 1.8 1.8 1.8s1.8-.8 1.8-1.8C6.6 3.8 5.8 3 4.8 3zM21 21h-3.2v-6.2c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21H10V8.5h3.1v1.7h.1c.4-.8 1.6-2 3.4-2 3.6 0 4.3 2.4 4.3 5.5V21z" />
                </svg>
              </SocialIcon>

              <SocialIcon label="Instagram">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 4.3A3.7 3.7 0 1 1 8.3 12 3.7 3.7 0 0 1 12 8.3zm0 2A1.7 1.7 0 1 0 13.7 12 1.7 1.7 0 0 0 12 10.3zM17.8 6.2a.8.8 0 1 1-.8.8.8.8 0 0 1 .8-.8z" />
                </svg>
              </SocialIcon>

              <SocialIcon label="YouTube">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5A3 3 0 0 0 2.4 7.2 31 31 0 0 0 2 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.8zM10.5 15.3V8.7L16 12l-5.5 3.3z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Columns */}
          <FooterCol title="About" items={["About Us", "Find store", "Categories", "Blogs"]} />
          <FooterCol
            title="Partnership"
            items={["About Us", "Find store", "Categories", "Blogs"]}
          />
          <FooterCol
            title="Information"
            items={["Help Center", "Money Refund", "Shipping", "Contact us"]}
          />
          <FooterCol
            title="For users"
            items={["Login", "Register", "Settings", "My Orders"]}
          />

          {/* App buttons */}
          <div className="md:col-span-2 md:justify-self-end">
            <h4 className="text-sm font-semibold text-slate-900">Get app</h4>

            <div className="mt-4 flex flex-col gap-3">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2"
              >
                {/* Replace with your own badge image if you want */}
                <img
                  className="h-10 w-auto"
                  alt="Download on the App Store"
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                />
              </a>

              <a
                href="#"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2"
              >
                <img
                  className="h-10 w-auto"
                  alt="Get it on Google Play"
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <p className="text-sm text-slate-500">© 2023 Ecommerce.</p>

          {/* Language */}
          <button
            type="button"
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800"
          >
            {/* US flag */}
            <span className="inline-flex h-5 w-7 overflow-hidden rounded-sm border border-slate-200">
              <svg viewBox="0 0 28 20" className="h-full w-full" aria-hidden="true">
                <rect width="28" height="20" fill="#fff" />
                {/* red stripes */}
                {Array.from({ length: 7 }).map((_, i) => (
                  <rect
                    key={i}
                    y={i * 3}
                    width="28"
                    height="1.5"
                    fill="#d32f2f"
                  />
                ))}
                {/* blue canton */}
                <rect width="12" height="9" fill="#1e3a8a" />
              </svg>
            </span>

            <span>English</span>

            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div className="md:col-span-2">
      <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
      <ul className="mt-4 space-y-2">
        {items.map((label) => (
          <li key={label}>
            <Link
              href="#"
              className="text-sm text-slate-500 hover:text-slate-800"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ children, label }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300 hover:text-slate-700"
    >
      {children}
    </a>
  );
}
