import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50 border-bottom-thin"
    >
      <div className="w-full border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="max-w-full px-6 sm:px-8 lg:px-12 py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="font-display text-2xl font-500 text-[var(--ink)]">
                ResuMate
              </span>
            </Link>

            {/* Center Navigation */}
            <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-[var(--ink)] hover:text-[var(--ink-muted)] transition-colors border-b border-transparent hover:border-[var(--border)]"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {/* Auth Links */}
            <div className="flex items-center gap-6">
              <Link
                to="/login"
                className="hidden sm:inline text-sm text-[var(--ink)] hover:text-[var(--ink-muted)] transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="text-sm text-[var(--ink)] border-b border-[var(--border)] pb-1 hover:border-[var(--ink)] transition-colors"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
