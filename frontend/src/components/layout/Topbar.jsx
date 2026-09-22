import { Link, NavLink } from "react-router-dom";
import { Search, Sun, Moon, LogOut, Settings } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

const NAV = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/resumes", label: "Resumes" },
  { to: "/insights", label: "Insights" },
];

export function Topbar({ onOpenPalette }) {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]">
      <div className="max-w-full px-6 sm:px-8 lg:px-12 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/dashboard" className="flex-shrink-0">
            <span className="font-display text-xl font-500 text-[var(--ink)]">
              ResuMate
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-500 border-b-2 pb-1 transition-colors ${
                    isActive
                      ? "text-[var(--ink)] border-[var(--ink)]"
                      : "text-[var(--ink-muted)] border-transparent hover:border-[var(--border)]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={onOpenPalette}
              className="hidden lg:flex items-center gap-2 h-9 px-3 bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--ink-muted)] hover:bg-[var(--surface-2)] transition-colors"
            >
              <Search size={14} />
              <span className="text-xs">Search...</span>
            </button>

            <IconButton onClick={toggle} title="Toggle theme" size="sm">
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </IconButton>

            <IconButton
              to="/settings"
              as={Link}
              title="Settings"
              size="sm"
            >
              <Settings size={16} />
            </IconButton>

            <IconButton onClick={logout} title="Logout" size="sm">
              <LogOut size={16} />
            </IconButton>

            {user && (
              <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-[var(--border)]">
                <div className="h-7 w-7 bg-[var(--ink)] text-[var(--bg)] text-xs font-500 flex items-center justify-center">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-xs font-500 text-[var(--ink)] max-w-xs truncate">
                  {user.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
