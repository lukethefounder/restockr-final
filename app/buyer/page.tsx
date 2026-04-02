import { ClipboardList, ReceiptText, Repeat, Store } from "lucide-react";
import { DashboardShell } from "@/components/platform/dashboard-shell";

export default function BuyerPage() {
  const cards = [
    {
      icon: ClipboardList,
      title: "Custom order guides",
      text: "Build location-specific guides with categories, preferred vendors, and par levels.",
    },
    {
      icon: Repeat,
      title: "Optimization flow",
      text: "Route items to the best distributor mix while still honoring item-level buyer rules.",
    },
    {
      icon: ReceiptText,
      title: "Invoice center",
      text: "Track pending, paid, or disputed invoices along with Mintsy verification history.",
    },
    {
      icon: Store,
      title: "Location controls",
      text: "Support multiple restaurant locations and multiple users under one organization.",
    },
  ];

  return (
    <DashboardShell
      role="BUYER"
      title="Keep restaurant ordering fast and easy."
      description="The buyer experience should feel friendly and obvious: choose a guide, enter quantities, review optimized distributor baskets, submit, and track invoices."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="glass-card rounded-[28px] p-6">
              <div className="inline-flex rounded-2xl bg-emerald-50 p-3 text-emerald-700">
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