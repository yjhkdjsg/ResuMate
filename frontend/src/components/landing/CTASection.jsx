import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="w-full bg-[var(--bg)] border-t border-[var(--border)]">
      <div className="max-w-full px-6 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-[var(--ink)]">
              Ready to sharpen your resume?
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-[var(--ink-muted)] mt-6 max-w-xl"
          >
            Get your ATS score, fixable issues, and AI-rewritten bullets in under 15 seconds. Free forever for your first 3 analyses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-500 bg-[var(--ink)] text-[var(--bg)] border border-[var(--ink)] hover:bg-[var(--bg)] hover:text-[var(--ink)] transition-colors"
            >
              Start free analysis
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-500 border border-[var(--border)] text-[var(--ink)] hover:bg-[var(--surface-2)] transition-colors"
            >
              Sign in
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
