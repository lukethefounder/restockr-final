import Link from "next/link";
import { Menu, Sparkles } from "lucide-react";
import { RestockrLogo } from "@/components/brand/restockr-logo";
import { buttonVariants } from "@/components/ui/button";

const nav = [
  { href: "/restaurants", label: "Restaurants" },
  { href: "/distributors", label: "Distributors" },
  { href: "/login", label: "Login" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="shrink-0">
          <RestockrLogo />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Sign in
          </Link>
          <Link
            href="/founder"
            className={buttonVariants({ variant: "primary", size: "sm" })}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Founder view
          </Link>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 md:hidden"
          aria-label="Open navigation"
          type="button"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}