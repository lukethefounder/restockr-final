import Link from "next/link";
import {
  BrainCircuit,
  Building2,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Factory,
  LayoutDashboard,
  ReceiptText,
  Settings2,
  Sparkles,
  Store,
  Users,
} from "lucide-react";
import { RestockrLogo } from "@/components/brand/restockr-logo";

type Role = "FOUNDER" | "BUYER" | "DISTRIBUTOR";

type DashboardShellProps = {
  role: Role;
  title: string;
  description: string;
  children: React.ReactNode;
};

const navByRole: Record<Role, { href: string; label: string; icon: any }[]> = {
  FOUNDER: [
    { href: "/founder", label: "Overview", icon: LayoutDashboard },
    { href: "/founder", label: "Bud", icon: BrainCircuit },
    { href: "/founder", label: "Invoices", icon: ReceiptText },
    { href: "/founder", label: "Billing", icon: CreditCard },
    { href: "/founder", label: "Organizations", icon: Users },
    { href: "/founder", label: "Settings", icon: Settings2 },
  ],
  BUYER: [
    { href: "/buyer", label: "Overview", icon: LayoutDashboard },
    { href: "/buyer", label: "Order Guides", icon: ClipboardList },
    { href: "/buyer", label: "Invoices", icon: ReceiptText },
    { href: "/buyer", label: "Locations", icon: Building2 },
    { href: "/buyer", label: "Settings", icon: Settings2 },
  ],
  DISTRIBUTOR: [
    { href: "/distributor", label: "Overview", icon: LayoutDashboard },
    { href: "/distributor", label: "Catalog", icon: Factory },
    { href: "/distributor", label: "Invoices", icon: ReceiptText },
    { href: "/distributor", label: "Team", icon: Users },
    { href: "/distributor", label: "Settings", icon: Settings2 },
  ],
};

export function DashboardShell({
  role,
  title,
  description,
  children,
}: DashboardShellProps) {
  const roleLabel =
    role === "FOUNDER"
      ? "Founder control"
      : role === "BUYER"
        ? "Restaurant dashboard"
        : "Distributor dashboard";

  const roleIcon =
    role === "FOUNDER" ? (
      <Sparkles className="h-4 w-4" />
    ) : role === "BUYER" ? (
      <Store className="h-4 w-4" />
    ) : (
      <Factory className="h-4 w-4" />
    );

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-6 lg:grid-cols-[270px_1fr]">
        <aside className="glass-card rounded-[30px] p-5">
          <RestockrLogo />
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            {roleIcon}
            {roleLabel}
          </div>

          <nav className="mt-6 space-y-2">
            {navByRole[role].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-950"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="space-y-6">
          <div className="glass-card rounded-[30px] p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              {roleLabel}
            </p>
            <h1 className="mt-3 font-[var(--font-display)] text-4xl font-semibold tracking-tight text-slate-950">
              {title}
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
              {description}
            </p>
          </div>

          {children}
        </section>
      </div>
    </main>
  );
}