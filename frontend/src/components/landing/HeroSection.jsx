import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="w-full border-b border-[var(--border)]">
      <div className="max-w-full px-6 sm:px-8 lg:px-12 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 lg:pb-32">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-tight text-[var(--ink)]">
              Resumes <span className="font-400">built for</span> humans.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-[var(--ink-muted)] mt-6 max-w-xl leading-relaxed"
          >
            Upload your resume. Get an instant ATS score, fixable issues, AI-rewritten bullets, and actionable insights to land more interviews.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-500 bg-[var(--ink)] text-[var(--bg)] border border-[var(--ink)] hover:bg-[var(--bg)] hover:text-[var(--ink)] transition-colors"
            >
              Upload resume
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-500 border border-[var(--border)] text-[var(--ink)] hover:bg-[var(--surface-2)] transition-colors"
            >
              Learn more
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex gap-8 text-sm text-[var(--ink-muted)]"
          >
            <div>
              <div className="font-500 text-[var(--ink)]">47,300+</div>
              <div>Resumes analyzed</div>
            </div>
            <div>
              <div className="font-500 text-[var(--ink)]">98.2%</div>
              <div>Accuracy rate</div>
            </div>
            <div>
              <div className="font-500 text-[var(--ink)]">Free</div>
              <div>No credit card</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
