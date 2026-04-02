import { BadgeDollarSign, Factory, ReceiptText, Users } from "lucide-react";
import { DashboardShell } from "@/components/platform/dashboard-shell";

export default function DistributorPage() {
  const cards = [
    {
      icon: Factory,
      title: "Catalog + price updates",
      text: "Maintain products, prices, lead times, and availability in a clean sales-team view.",
    },
    {
      icon: BadgeDollarSign,
      title: "Threshold management",
      text: "Set minimum-spend or MOQ rules so buyers see the logic before orders are submitted.",
    },
    {
      icon: ReceiptText,
      title: "Invoice handling",
      text: "Upload or generate invoices, send them to buyers, and support Mintsy verification.",
    },
    {
      icon: Users,
      title: "Team logins",
      text: "Support multiple distributor reps and branch-specific workflows under one company.",
    },
  ];

  return (
    <DashboardShell
      role="DISTRIBUTOR"
      title="Give distributor teams a cleaner operating system."
      description="The distributor side should make it easy to manage catalogs, confirm baskets, communicate requirements, and keep invoices organized."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="glass-card rounded-[28px] p-6">
              <div className="inline-flex rounded-2xl bg-slate-100 p-3 text-slate-900">
                <Icon className="h-6 w-6" />
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