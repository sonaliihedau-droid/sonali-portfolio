"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About me" },
  { href: "/#projects", label: "Projects" },
  { href: "/#sketchbook", label: "Sketchbook" },
];

export default function Nav() {
  const pathname = usePathname();

  // On the home page, links stay in place: About me opens the About screen,
  // the others close it and scroll to their part of the page.
  const onClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname !== "/" || (href !== "/" && !href.startsWith("/#"))) return;
    e.preventDefault();
    const hash = href === "/" ? "" : href.slice(1);
    if (window.location.hash !== hash) {
      window.history.pushState(null, "", hash || "/");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
    if (hash === "#about") return;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    const target = hash ? document.querySelector(hash) : null;
    if (target) target.scrollIntoView({ behavior });
    else window.scrollTo({ top: 0, behavior });
  };

  return (
    <nav
      aria-label="Main"
      className="pointer-events-none fixed inset-x-0 top-0 z-70 flex justify-center gap-5 pt-6 sm:gap-10 sm:pt-7"
    >
      {LINKS.map(({ href, label }) => {
        const current =
          href === "/"
            ? pathname === "/"
            : href === "/#projects"
              ? pathname.startsWith("/projects/")
              : href.startsWith("/#")
                ? false
                : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={(e) => onClick(e, href)}
            aria-current={current ? "page" : undefined}
            className="pointer-events-auto font-display text-sm font-bold text-[#5A83BB] transition-opacity hover:opacity-60 sm:text-lg"
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
