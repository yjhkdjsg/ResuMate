import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock } from "lucide-react";
import {
  AuthShell,
  AuthField,
  AuthPrimaryButton,
  AuthErrorBanner,
} from "@/components/auth/AuthShell";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login(form);
      nav("/dashboard");
    } catch (e) {
      setErr(e.message || "Login failed");
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
            Welcome back
          </h2>
          <p className="text-sm text-[var(--ink-muted)]">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
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
            autoComplete="current-password"
            value={form.password}
            onChange={(v) => setForm({ ...form, password: v })}
            placeholder="••••••••"
            icon={Lock}
            extra={
              <button
                type="button"
                className="text-xs text-[var(--ink)] hover:text-[var(--ink-muted)] transition-colors"
              >
                Forgot?
              </button>
            }
          />

          <AuthErrorBanner>{err}</AuthErrorBanner>

          <AuthPrimaryButton type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </AuthPrimaryButton>
        </form>

        <div className="mt-6 pt-6 border-t border-[var(--border)] text-center text-sm text-[var(--ink-muted)]">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[var(--ink)] font-500 hover:underline"
          >
            Create one
          </Link>
        </div>
      </motion.div>
    </AuthShell>
  );
}
