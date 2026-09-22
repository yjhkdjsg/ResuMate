import { motion } from "framer-motion";
import { Gauge, Sparkles, KeyRound, Layers, GitCompare, LineChart, FileDown } from "lucide-react";

const FEATURES = [
  {
    icon: Gauge,
    title: "ATS Score Analysis",
    desc: "Section-level scoring against the same parsers Greenhouse and Lever run."
  },
  {
    icon: Sparkles,
    title: "AI Resume Rewrite",
    desc: "Bullets rewritten in your voice, with quantified outcomes — not generic fluff."
  },
  {
    icon: KeyRound,
    title: "Keyword Optimization",
    desc: "Auto-matches your resume against any job description, surfaces what's missing."
  },
  {
    icon: Layers,
    title: "Version History",
    desc: "Every iteration scored, dated, and one click away."
  },
  {
    icon: GitCompare,
    title: "Diff Comparison",
    desc: "See exactly what changed between V1 and V3 — line by line."
  },
  {
    icon: LineChart,
    title: "Analytics Dashboard",
    desc: "Track score evolution, keywords matched, and issues resolved over time."
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="w-full border-b border-[var(--border)]">
      <div className="max-w-full px-6 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40">
        <div className="max-w-5xl mb-16">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-[var(--ink)]">
            A complete toolset
          </h2>
          <p className="text-lg text-[var(--ink-muted)] mt-6 max-w-2xl">
            Upload, analyze, rewrite, and ship. Everything you need to make your resume work harder for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] p-px">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-[var(--bg)] border-r border-b border-[var(--border)] p-8 sm:p-10"
            >
              <div className="h-10 w-10 mb-5 text-[var(--ink)]">
                <f.icon size={24} />
              </div>
              <h3 className="font-display text-lg font-500 text-[var(--ink)] mb-3">
                {f.title}
              </h3>
              <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
