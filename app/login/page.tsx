import Link from "next/link";
import {
  ArrowRight,
  Factory,
  ShieldCheck,
  Sparkles,
  Store,
} from "lucide-react";
import { RestockrLogo } from "@/components/brand/restockr-logo";
import { buttonVariants } from "@/components/ui/button";

const roles = [
  {
    title: "Restaurant access",
    description:
      "Custom order guides, buyer preferences, delivery dates, optimized checkout, and invoice history.",
    href: "/buyer",
    icon: Store,
  },
  {
    title: "Distributor access",
    description:
      "Pricing catalogs, threshold rules, confirmations, invoicing, and team management.",
    href: "/distributor",
    icon: Factory,
  },
  {
    title: "Founder access",
    description:
      "Bud command center, Mintsy oversight, pricing controls, referral management, and platform health.",
    href: "/founder",
    icon: Sparkles,
  },
];

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <RestockrLogo />
        </div>
        <h1 className="mt-8 font-[var(--font-display)] text-5xl font-semibold tracking-tight text-slate-950">
          Choose the right entrance.
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Keep the experience simple from the first click. Every role gets its
          own dashboard, descriptions, and workflow.
        </p>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <div
              key={role.title}
              className="glass-card rounded-[30px] p-7"
            >
              <div className="inline-flex rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-slate-950">
                {role.title}
              </h2>
              <p className="mt-3 min-h-[96px] leading-7 text-slate-600">
                {role.description}
              </p>
              <Link
                href={role.href}
                className={buttonVariants({
                  variant: "primary",
                  size: "md",
                  className: "mt-6 w-full",
                })}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          );
        })}
      </div>

      <div className="mt-10 rounded-[28px] border border-slate-200 bg-white p-5 text-sm text-slate-600">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 text-teal-600" />
          <p>
            Wire your actual authentication in Step 2. This page gives you the
            premium login UX first so the platform already feels polished while
            you connect the database and role logic.
          </p>
        </div>
      </div>
    </main>
  );
}