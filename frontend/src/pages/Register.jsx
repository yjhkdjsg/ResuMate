import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, User, Mail, Lock } from "lucide-react";
import {
  AuthShell,
  AuthField,
  AuthPrimaryButton,
  AuthErrorBanner,
} from "@/components/auth/AuthShell";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await register(form);
      nav("/dashboard");
    } catch (e) {
      setErr(e.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl font-500 text-[var(--ink)]">
            ResuMate
          </h1>
        </div>

        <div className="mb-8">
          <h2 className="font-display text-2xl font-500 text-[var(--ink)] mb-2">
            Create account
          </h2>
          <p className="text-sm text-[var(--ink-muted)]">
            Free to start. No credit card required.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <AuthField
            label="Full name"
            autoComplete="name"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
            placeholder="Ada Lovelace"
            icon={User}
          />

          <AuthField
            label="Email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            placeholder="you@example.com"
            icon={Mail}
          />

          <AuthField
            label="Password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={(v) => setForm({ ...form, password: v })}
            placeholder="At least 8 characters"
            minLength={8}
            icon={Lock}
          />

          <AuthErrorBanner>{err}</AuthErrorBanner>

          <AuthPrimaryButton type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </AuthPrimaryButton>
        </form>

        <div className="mt-6 pt-6 border-t border-[var(--border)] text-center text-sm text-[var(--ink-muted)]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[var(--ink)] font-500 hover:underline"
          >
            Sign in
          </Link>
        </div>

        <p className="text-xs text-[var(--ink-muted)] text-center mt-6 leading-relaxed">
          By creating an account you agree to our terms.
          <br />
          We never share your resume data with third parties.
        </p>
      </motion.div>
    </AuthShell>
  );
}
