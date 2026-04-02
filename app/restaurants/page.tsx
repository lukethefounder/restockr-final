import Link from "next/link";
import { ClipboardList, ReceiptText, Repeat, Store } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

const items = [
  {
    icon: ClipboardList,
    title: "Custom order guides",
    text: "Build lists by location, category, weekday, or event and make them easy for staff to use.",
  },
  {
    icon: Repeat,
    title: "Fast reorder flow",
    text: "Start with saved guides, adjust quantities, keep preferred vendors, and submit cleanly.",
  },
  {
    icon: ReceiptText,
    title: "Invoice visibility",
    text: "Track every invoice, payment state, and Mintsy verification record from one place.",
  },
];

export default function RestaurantsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <Badge>For restaurant teams</Badge>
      <h1 className="mt-6 max-w-3xl font-[var(--font-display)] text-5xl font-semibold tracking-tight text-slate-950">
        Ordering should feel organized, fast, and obvious.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
        Restockr is built to replace scattered text chains, memory-based
        ordering, and hard-to-track invoices with one clear workflow.
      </p>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="glass-card rounded-[28px] p-6"
            >
              <div className="inline-flex rounded-2xl bg-slate-100 p-3 text-slate-900">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-slate-950">
                {item.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          href="/login"
          className={buttonVariants({ variant: "primary", size: "lg" })}
        >
          Open restaurant access
        </Link>
        <Link
          href="/buyer"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          See the buyer dashboard
        </Link>
      </div>
    </main>
  );
}