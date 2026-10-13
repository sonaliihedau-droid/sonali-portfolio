import type { ReactNode } from "react";

// The home page's headings: typewritten (Special Elite) capitals in dark brown. A section title
// carries its number ("01"); a subheading inside a section carries a small dot. Number and dot are
// decoration, so screen readers get just the words. `mobileNumber` is the number on phones, where
// About me is a section of its own and the ones after it count one further.

export function SectionTitle({
  id,
  number,
  mobileNumber = number,
  children,
}: {
  id: string;
  number: number;
  mobileNumber?: number;
  children: ReactNode;
}) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <h2 id={id} className="font-typewriter text-2xl tracking-wider text-heading uppercase sm:text-3xl">
      <span aria-hidden className="mr-3 text-[0.7em] opacity-55 sm:mr-4">
        <span className="sm:hidden">{pad(mobileNumber)}</span>
        <span className="max-sm:hidden">{pad(number)}</span>
      </span>
      {children}
    </h2>
  );
}

export function SubTitle({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <h3
      className={`flex items-center gap-3 font-typewriter text-lg tracking-wider text-heading uppercase sm:text-xl ${className}`}
    >
      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-current opacity-70" />
      {children}
    </h3>
  );
}
