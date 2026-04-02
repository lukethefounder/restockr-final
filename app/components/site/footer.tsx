import Link from "next/link";
import { RestockrLogo } from "@/components/brand/restockr-logo";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <RestockrLogo />
          <p className="mt-3 max-w-xl text-sm text-slate-600">
            Built to optimize restaurant ordering, respect distributor rules,
            simplify invoices, and give the founder instant AI-powered control.
          </p>
        </div>

        <div className="flex flex-wrap gap-5 text-sm text-slate-600">
          <Link href="/restaurants" className="hover:text-slate-950">
            Restaurants
          </Link>
          <Link href="/distributors" className="hover:text-slate-950">
            Distributors
          </Link>
          <Link href="/login" className="hover:text-slate-950">
            Login
          </Link>
          <Link href="/founder" className="hover:text-slate-950">
            Founder
          </Link>
        </div>
      </div>
    </footer>
  );
}