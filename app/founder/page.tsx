import { BrainCircuit, CreditCard, ReceiptText, Users } from "lucide-react";
import { DashboardShell } from "@/components/platform/dashboard-shell";

const cards = [
  {
    icon: BrainCircuit,
    title: "Bud command center",
    text: "Secure server-side AI tools for reporting, operational summaries, and founder updates.",
    value: "Ready",
  },
  {
    icon: ReceiptText,
    title: "Mintsy invoice ledger",
    text: "Track invoice hashes, verification states, and archive visibility across the platform.",
    value: "Awaiting live data",
  },
  {
    icon: CreditCard,
    title: "Billing control",
    text: "Set subscription pricing, credits, waivers, and referral rewards from one place.",
    value: "Configure next",
  },
  {
    icon: Users,
    title: "Organization oversight",
    text: "Manage restaurants, distributors, multiple logins, and role-based access.",
    value: "Multi-tenant ready",
  },
];

export default function FounderPage() {
  return (
    <DashboardShell
      role="FOUNDER"
      title="Run Restockr like a control tower."
      description="This founder view is where pricing, Bud, invoices, organizations, referrals, and platform health should all stay beautifully organized."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="glass-card rounded-[28px] p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex rounded-2xl bg-slate-100 p-3 text-slate-900">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  {card.value}
                </span>
              </div>
              <h2 className="mt-5 text-xl font-semibold text-slate-950">
                {card.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">{card.text}</p>
            </div>
          );
        })}
      </div>
    </DashboardShell>
  );
}