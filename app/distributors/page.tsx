import Link from "next/link";
import { BadgeDollarSign, Factory, ReceiptText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export default function DistributorsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <Badge>For distributors</Badge>
      <h1 className="mt-6 max-w-3xl font-[var(--font-display)] text-5xl font-semibold tracking-tight text-slate-950">
        Give your sales team a cleaner, more reliable ordering channel.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
        Manage thresholds, price updates, confirmations, and invoices in one
        place while keeping communication clear for restaurant buyers.
      </p>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {[
          {
            icon: Factory,
            title: "Catalog control",
            text: "Maintain products, availability, and item pricing in a structured dashboard.",
          },
          {
            icon: BadgeDollarSign,
            title: "Threshold rules",
            text: "Set MOQ or minimum-spend logic so buyers understand your requirements before submitting.",
          },
          {
            icon: ReceiptText,
            title: "Invoice workflow",
            text: "Upload or generate invoices and send them into the buyer archive with Mintsy verification support.",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="glass-card rounded-[28px] p-6"
            >
              <div className="inline-flex rounded-2xl bg-emerald-50 p-3 text-emerald-700">
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
          Open distributor access
        </Link>
        <Link
          href="/distributor"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          See the distributor dashboard
        </Link>
      </div>
    </main>
  );
}