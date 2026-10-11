"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import type { Sketch } from "../sketches/sketches";
import Tile from "./Tile";

const SIZES = "(min-width: 1152px) 250px, (min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw";

// Each sheet's lean (deg) and nudge (px) in the pile, cycled through in order. Fixed rather than
// random so the pile looks the same on every load and the server and client agree.
const PILE = [
  { r: -7, x: -10, y: 6 },
  { r: 5, x: 12, y: -4 },
  { r: -3, x: -4, y: -10 },
  { r: 8, x: 8, y: 8 },
  { r: -9, x: -14, y: -2 },
  { r: 3, x: 4, y: 12 },
  { r: 6, x: 14, y: 2 },
  { r: -5, x: -8, y: -8 },
];
// Gap (ms) between one sheet setting off and the next, as they deal out or gather back.
const STAGGER = 25;

// `pile`: height of the stacked section; `full`: height of the spread-out collage; `moves`: how far
// each sheet travels from its place in the collage to the middle of the pile.
type Layout = { pile: number; full: number; moves: { dx: number; dy: number }[] };

// The Pencil sketches, first shown as one loose pile of paper with `topSrc` on top. Clicking the pile
// deals every sheet out to its place in a masonry collage; a handle that stays in view while
// scrolling through the collage gathers them back. The collage is always laid out underneath, and
// the pile is just each sheet moved (transformed) from its own spot to the centre, so the two
// states always agree and the move between them is one transition.
export default function PencilStack({ sketches, topSrc }: { sketches: Sketch[]; topSrc: string }) {
  const listId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const pileButton = useRef<HTMLButtonElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [fanned, setFanned] = useState(false);
  const [layout, setLayout] = useState<Layout | null>(null);
  // Off until the first layout is in place, so the sheets don't fly into the pile on load.
  const [animate, setAnimate] = useState(false);
  // True while the sheets deal out or gather back; only then are their starts staggered, so the
  // hover fan answers at once.
  const [moving, setMoving] = useState(false);
  const settle = useRef<ReturnType<typeof setTimeout>>(undefined);
  const top = sketches.findIndex((sketch) => sketch.src === topSrc);
  const last = (sketches.length - 1) * STAGGER;

  // Measure where every sheet sits in the collage, again whenever the column count changes. The
  // observer reports once straight away, before the first paint.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(() => {
      const items = [...list.children] as HTMLElement[];
      const pile = Math.max(...items.map((item) => item.offsetHeight)) + 72;
      const centreX = list.clientWidth / 2;
      setLayout({
        pile,
        full: list.offsetHeight + 24,
        moves: items.map((item) => ({
          dx: centreX - (item.offsetLeft + item.offsetWidth / 2),
          dy: pile / 2 - (item.offsetTop + item.offsetHeight / 2),
        })),
      });
    });
    observer.observe(list);
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(settle.current);
    };
  }, []);

  function travel() {
    setMoving(true);
    clearTimeout(settle.current);
    settle.current = setTimeout(() => setMoving(false), last + 700);
  }

  function spread() {
    travel();
    setOpen(true);
    setFanned(false);
    requestAnimationFrame(() => backButton.current?.focus({ preventScroll: true }));
  }

  function gather() {
    travel();
    setOpen(false);
    // The section shrinks back to the pile; bring the pile into view rather than leaving the reader
    // in the empty space below it.
    const wrap = wrapRef.current;
    if (wrap) {
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      scrollTo({ top: wrap.getBoundingClientRect().top + scrollY - 160, behavior: reduce ? "auto" : "smooth" });
    }
    requestAnimationFrame(() => pileButton.current?.focus({ preventScroll: true }));
  }

  return (
    <div ref={wrapRef} className="mt-8 sm:mt-10">
      <div
        className={`relative overflow-y-clip ${layout ? "" : "h-[420px] sm:h-[500px]"} ${
          animate ? "transition-[height] duration-700 ease-soft motion-reduce:transition-none" : ""
        }`}
        // Opening, the section grows ahead of the sheets; closing, it waits for the last one to
        // land before shrinking, so no sheet is clipped on the way.
        style={layout ? { height: open ? layout.full : layout.pile, transitionDelay: open ? "0ms" : `${last}ms` } : undefined}
      >
        <ul
          ref={listRef}
          id={listId}
          inert={!open}
          className="relative columns-2 gap-5 px-2 sm:columns-3 sm:gap-7 lg:columns-4"
        >
          {sketches.map((sketch, i) => {
            const move = layout?.moves[i];
            const lean = PILE[i % PILE.length];
            const isTop = i === top;
            const tilt = isTop ? -1 : lean.r * (fanned ? 1.8 : 1);
            const style: CSSProperties = {
              zIndex: isTop ? sketches.length + 1 : sketches.length - i,
              visibility: move ? undefined : "hidden",
              transform:
                open || !move
                  ? undefined
                  : `translate(${move.dx + (isTop ? 0 : lean.x)}px, ${move.dy + (isTop ? 0 : lean.y)}px) rotate(${tilt}deg)`,
              transitionDelay: moving ? `${open ? i * STAGGER : last - i * STAGGER}ms` : undefined,
            };
            return (
              <li
                key={sketch.src}
                style={style}
                className={`relative mb-5 break-inside-avoid sm:mb-7 ${
                  animate ? "transition-transform duration-700 ease-soft motion-reduce:transition-none" : ""
                }`}
              >
                <Tile sketch={sketch} index={i} sizes={SIZES} />
              </li>
            );
          })}
        </ul>

        {!open && (
          <button
            ref={pileButton}
            type="button"
            aria-expanded={false}
            aria-controls={listId}
            aria-label={`Spread out all ${sketches.length} pencil sketches`}
            onClick={spread}
            onPointerEnter={() => setFanned(true)}
            onPointerLeave={() => setFanned(false)}
            onFocus={() => setFanned(true)}
            onBlur={() => setFanned(false)}
            className="absolute inset-x-0 top-0 z-50 mx-auto block h-full w-full max-w-sm cursor-pointer rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-heading/50"
          />
        )}
      </div>

      {open ? (
        // A small "gather" arrow at the right, pinned to the bottom of the screen while the collage
        // is being scrolled through.
        <div className="pointer-events-none sticky bottom-6 z-30 mt-4 flex justify-end">
          <button
            ref={backButton}
            type="button"
            aria-expanded
            aria-controls={listId}
            aria-label="Stack the sketches back into a pile"
            title="Stack them back"
            onClick={gather}
            className="pointer-events-auto grid size-11 cursor-pointer place-items-center rounded-full bg-background/85 text-heading shadow-[0_6px_18px_-10px_rgba(23,23,23,0.45)] backdrop-blur transition duration-500 ease-soft hover:-rotate-90 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heading motion-reduce:transition-none motion-reduce:hover:rotate-0"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 2.64-6.36" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
        </div>
      ) : (
        <p aria-hidden className="mt-3 text-center font-typewriter text-sm tracking-wide text-heading sm:text-base">
          Tap to spread
        </p>
      )}
    </div>
  );
}
