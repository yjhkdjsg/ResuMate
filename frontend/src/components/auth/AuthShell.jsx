import { motion } from "framer-motion";

export function AuthShell({ children }) {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}

export function AuthField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  extra,
  autoComplete,
  required = true,
  minLength,
  icon: Icon,
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-500 text-[var(--ink)]">{label}</label>
        {extra}
      </div>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
          className={`w-full px-4 py-3 text-sm border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none focus:border-[var(--ink)] transition-colors`}
        />
        {Icon && (
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]">
            <Icon size={16} />
          </div>
        )}
      </div>
    </div>
  );
}

export function AuthPrimaryButton({ children, disabled, ...props }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      disabled={disabled}
      className="w-full px-4 py-3 text-sm font-500 bg-[var(--ink)] text-[var(--bg)] border border-[var(--ink)] hover:bg-[var(--bg)] hover:text-[var(--ink)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function AuthErrorBanner({ children }) {
  if (!children) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-xs text-[#a00] bg-[#f5e5e5] px-3 py-2 border border-[#dcc0c0]"
    >
      {children}
    </motion.div>
  );
}
