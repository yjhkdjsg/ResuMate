import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  FileText,
  BarChart3,
  Layers,
  History,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import AILogo from "./AILogo";

const NAV = [
  { to: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
  { to: "/resumes", icon: FileText, label: "Resumes" },
  { to: "/insights", icon: BarChart3, label: "Insights" },
  { to: "/versions", icon: Layers, label: "Versions" },
  { to: "/history", icon: History, label: "History" },
];

const ROW_BASE =
  "relative flex items-center h-11 w-full overflow-hidden border-l-2 " +
  "transition-[background-color,color,border-color] duration-200";

const LABEL_BASE =
  "text-sm font-medium whitespace-nowrap pr-4 opacity-100";

function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink to={to} title={label} className="block">
      {({ isActive }) => (
        <div
          className={cn(
            ROW_BASE,
              isActive
              ? "bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)]"
              : "border-transparent text-[var(--ink-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--ink)]",
          )}
        >
          <span className="h-11 w-11 flex items-center justify-center shrink-0">
            <Icon size={18} strokeWidth={2} />
          </span>
          <span className={LABEL_BASE}>{label}</span>
        </div>
      )}
    </NavLink>
  );
}

function ActionRow({ icon: Icon, label, onClick, to }) {
  const inner = (isActive) => (
    <div
      className={cn(
        ROW_BASE,
        isActive
          ? "bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)]"
          : "border-transparent text-[var(--ink-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--ink)]"
      )}
    >
      <span className="h-11 w-11 flex items-center justify-center shrink-0">
        <Icon size={18} />
      </span>
      <span className={LABEL_BASE}>{label}</span>
    </div>
  );

  if (to) {
    return (
      <NavLink to={to} title={label} className="block">
        {({ isActive }) => inner(isActive)}
      </NavLink>
    );
  }

  return (
    <button onClick={onClick} title={label} className="block">
      {inner(false)}
    </button>
  );
}

export function Sidebar() {
  const { user, logout } = useAuth();
  const displayName = user?.name || "Account";
  const displayEmail = user?.email || "";

  return (
    <aside
      className={cn(
        "hidden md:flex shrink-0 h-screen sticky top-0",
        "flex-col items-stretch justify-between py-7 px-5",
        "bg-[var(--surface)] border-r border-[var(--border)] overflow-hidden",
        "w-[228px]",
      )}
    >
        <div className="flex flex-col items-stretch gap-12 w-full">
        <div
          className={cn(
            "flex items-center h-14 w-full",
            "h-10 w-10 flex items-center justify-center shrink-0",
          )}
        >
          <div className="h-12 w-12 flex items-center justify-center shrink-0">
            <AILogo />
          </div>
          <span
            className={cn(
              "ml-2 font-serif text-2xl text-[var(--ink)] whitespace-nowrap",
            )}
          >
            Roaster
          </span>
        </div>

        <nav className="flex flex-col items-stretch gap-1.5">
          {NAV.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>
      </div>

        <div className="flex flex-col items-stretch gap-2 w-full">
        <ActionRow icon={Settings} label="Settings" to="/settings" />
        <ActionRow icon={LogOut} label="Log out" onClick={logout} />

        <div
          className={cn(
            "flex items-center h-12 mt-4 w-full overflow-hidden border-t border-[var(--border)] pt-3",
          )}
        >
          <div className="h-9 w-9 bg-[var(--ink)] text-[var(--bg)] font-mono flex items-center justify-center text-xs shrink-0">
            {user?.name?.[0]?.toUpperCase() || "R"}
          </div>
          <div
            className={cn(
              "ml-3 min-w-0 flex-1",
            )}
          >
            <div className="text-sm font-semibold text-[var(--ink)] truncate">
              {displayName}
            </div>
            {displayEmail && (
              <div className="text-[11px] text-[var(--ink-muted)] truncate">
                {displayEmail}
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
