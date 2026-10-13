"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { isMobile } from "./useIsMobile";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About me" },
  { href: "/#projects", label: "Projects" },
  { href: "/#sketchbook", label: "Sketchbook" },
  { href: "/#contact", label: "Contact" },
];

// Within this many px of the top the bar always shows, plain and transparent over the hero.
const TOP = 24;
// It only starts hiding once the page has scrolled this far.
const HIDE_AFTER = 120;
// The scroll has to keep going one way this many px before the bar reacts, so trackpad wobble and
// the rubber-band bounce at the ends of the page don't make it flicker.
const TOLERANCE = 8;
// On a mouse, bringing the pointer this close to the top edge calls the bar back.
const REVEAL_EDGE = 40;

// The bar slides away while reading down the page and comes back on any scroll up, now on a frosted
// strip so its links stay readable over the artwork. It always shows at the top of the page, while
// the About screen is open, and while one of its links has keyboard focus.
function useHeadroom() {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [about, setAbout] = useState(false);

  useEffect(() => {
    let lastY = scrollY;
    let travel = 0;
    let frame = 0;

    const update = () => {
      frame = 0;
      // Clamp out overscroll past either end of the page.
      const y = Math.min(Math.max(scrollY, 0), document.documentElement.scrollHeight - innerHeight);
      const delta = y - lastY;
      lastY = y;
      // Distance moved in the current direction; reset when the direction flips.
      travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta;

      setAtTop(y <= TOP);
      if (y <= TOP) setHidden(false);
      else if (travel > TOLERANCE && y > HIDE_AFTER) setHidden(true);
      else if (travel < -TOLERANCE) setHidden(false);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const fine = matchMedia("(pointer: fine)");
    const onPointer = (e: PointerEvent) => {
      if (fine.matches && e.clientY < REVEAL_EDGE) setHidden(false);
    };

    // On a phone #about is just a section of the page, not the About screen.
    const syncAbout = () => setAbout(location.hash === "#about" && !isMobile());

    frame = requestAnimationFrame(() => {
      update();
      syncAbout();
    });
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("pointermove", onPointer, { passive: true });
    addEventListener("hashchange", syncAbout);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("pointermove", onPointer);
      removeEventListener("hashchange", syncAbout);
      cancelAnimationFrame(frame);
    };
  }, []);

  // The About screen has its own backdrop; the bar floats over it as before.
  return { hidden: hidden && !about, strip: !atTop && !about };
}

export default function Nav() {
  const pathname = usePathname();
  const { hidden, strip } = useHeadroom();

  // On the home page, links stay in place: About me opens the About screen (on a phone, scrolls to
  // the About section), the others close it and scroll to their part of the page.
  const onClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname !== "/" || (href !== "/" && !href.startsWith("/#"))) return;
    e.preventDefault();
    const hash = href === "/" ? "" : href.slice(1);
    if (window.location.hash !== hash) {
      window.history.pushState(null, "", hash || "/");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
    if (hash === "#about" && !isMobile()) return;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    const target = hash ? document.querySelector(hash) : null;
    if (target) target.scrollIntoView({ behavior });
    else window.scrollTo({ top: 0, behavior });
  };

  return (
    <nav
      aria-label="Main"
      className={`pointer-events-none fixed inset-x-0 top-0 z-70 flex flex-wrap justify-center gap-x-3.5 gap-y-1 px-3 pt-5 pb-3.5 transition-[translate,opacity,background-color,box-shadow,backdrop-filter] duration-350 ease-soft focus-within:translate-y-0 focus-within:opacity-100 sm:gap-10 sm:pt-7 sm:pb-5 motion-reduce:transition-[opacity,background-color] ${
        hidden ? "-translate-y-full motion-reduce:translate-y-0 motion-reduce:opacity-0" : ""
      } ${
        strip
          ? "bg-background/85 shadow-[0_1px_0_rgb(90_131_187/0.08),0_8px_24px_-16px_rgb(23_23_23/0.25)] backdrop-blur-md"
          : ""
      }`}
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
            className="pointer-events-auto font-typewriter text-[13px] text-heading transition-opacity hover:opacity-60 sm:text-lg"
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
