import { Link } from "react-router-dom";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="max-w-full px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <Link to="/" className="inline-block">
              <span className="font-display text-2xl font-500 text-[var(--ink)]">
                ResuMate
              </span>
            </Link>
            <p className="text-sm text-[var(--ink-muted)] mt-4 max-w-xs">
              AI-powered resume analysis and optimization built for professionals.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="text-xs font-500 text-[var(--ink)] mb-3">
                {col.title}
              </div>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--border)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--ink-muted)]">
          <div>© 2026 ResuMate. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[var(--ink)] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[var(--ink)] transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
