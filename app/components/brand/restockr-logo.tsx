import { useId } from "react";
import { cn } from "@/lib/utils";

type RestockrLogoProps = {
  className?: string;
  markOnly?: boolean;
  textClassName?: string;
};

export function RestockrLogo({
  className,
  markOnly = false,
  textClassName,
}: RestockrLogoProps) {
  const gradientId = useId();

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 64 64"
        aria-label="Restockr logo"
        role="img"
        className="h-10 w-10 shrink-0"
      >
        <defs>
          <linearGradient id={gradientId} x1="10" y1="8" x2="54" y2="56">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>

        <rect
          x="6"
          y="6"
          width="52"
          height="52"
          rx="16"
          fill={`url(#${gradientId})`}
        />
        <path
          d="M18 24.5c0-2.2 1.8-4 4-4h20c2.2 0 4 1.8 4 4v14c0 2.2-1.8 4-4 4H22c-2.2 0-4-1.8-4-4v-14Z"
          fill="rgba(255,255,255,0.16)"
        />
        <path
          d="M22 28h20M22 34h20M26 40h12"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M36.5 14.5c4.7.2 8.4 4.2 8.4 9-4.8 0-8.8-3.7-9-8.4-.1-.4.2-.7.6-.6Z"
          fill="#dcfce7"
        />
        <path
          d="M42.5 45.5l4.5 4.5 8.5-9"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {!markOnly ? (
        <div className="leading-none">
          <div
            className={cn(
              "font-semibold tracking-tight text-slate-950",
              textClassName ?? "text-lg",
            )}
          >
            Restockr
          </div>
          <div className="mt-1 text-xs font-medium text-slate-500">
            modern ordering for restaurants
          </div>
        </div>
      ) : null}
    </div>
  );
}