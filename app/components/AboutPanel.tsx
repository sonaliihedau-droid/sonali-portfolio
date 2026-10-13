"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ABOUT_PHOTO, ABOUT_TEXT } from "./about";
import ContactIcons from "./ContactIcons";

type Props = {
  open: boolean;
  onClose: () => void;
};

// Where the doodle may sit on the wide (16:9) stage, as the top-left corner in % of the stage. All
// clear of the photo (x 5.7-40.5, y 30-69) and the text (x 45-92, y 30-69) for a doodle 22% wide
// and about 16% tall, and of the centred navbar, the close button and the hanging moon at the top
// left (about x 6-10, y 0-30). The first is its home.
const SPOTS = [
  { x: 74, y: 78 },
  { x: 40, y: 78 },
  { x: 4, y: 78 },
  { x: 14, y: 10 },
  { x: 68, y: 10 },
];
// How close (px from its edge) the pointer may come before the doodle notices it.
const REACH = 110;
// How long (ms) it takes to notice: it only runs off if the pointer is still close by then.
const NOTICE = 450;
// Rest (ms) after a hop before it reacts again, so it doesn't hop twice in quick succession.
const COOLDOWN = 700;

// A white screen that glides down over the home scene, like a film's title curtain.
export default function AboutPanel({ open, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const doodleRef = useRef<HTMLDivElement>(null);
  // Keep the panel mounted while it slides back up.
  const [prevOpen, setPrevOpen] = useState(open);
  const [closing, setClosing] = useState(false);
  // The doodle's spot on the wide stage, and on a phone which side of its row it's on.
  const [spot, setSpot] = useState(0);
  const [leftSide, setLeftSide] = useState(false);
  // Counts hops; keying the doodle on it replays its little scamper each time.
  const [hops, setHops] = useState(0);
  const restUntil = useRef(0);
  if (open !== prevOpen) {
    setPrevOpen(open);
    setClosing(!open);
    // Every visit starts with the doodle back at home.
    if (open) {
      setSpot(0);
      setLeftSide(false);
      setHops(0);
    }
  }
  const visible = open || closing;

  // Run the doodle to a clear spot well away from (x, y), never staying put. On a phone the page is
  // a single column, so it just hops to the other side of its row.
  const flee = (x: number, y: number) => {
    if (performance.now() < restUntil.current) return;
    restUntil.current = performance.now() + COOLDOWN;
    setHops((n) => n + 1);
    const stage = stageRef.current?.getBoundingClientRect();
    if (!stage || matchMedia("(orientation: portrait)").matches) {
      setLeftSide((side) => !side);
      return;
    }
    // Any of the three spots farthest from the pointer, picked at random, so it wanders the whole
    // screen rather than bouncing between two corners.
    const pick = Math.floor(Math.random() * 3);
    setSpot((current) => {
      const away = SPOTS.map((s, i) => {
        // Centre of the doodle at that spot (it's 22% wide, about 16% tall).
        const cx = stage.left + ((s.x + 11) / 100) * stage.width;
        const cy = stage.top + ((s.y + 8) / 100) * stage.height;
        return { i, distance: Math.hypot(cx - x, cy - y) };
      })
        .filter(({ i }) => i !== current)
        .sort((a, b) => b.distance - a.distance);
      return away[Math.min(pick, away.length - 1)].i;
    });
  };
  const fleeRef = useRef(flee);
  useEffect(() => {
    fleeRef.current = flee;
  });

  // With a mouse, the doodle notices the pointer coming and, after a moment, ambles off before it
  // arrives. A tap or click that gets there first still sends it off at once (onPointerDown below).
  useEffect(() => {
    if (!open || !matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    let noticing = 0;
    let last = { x: 0, y: 0 };
    const near = () => {
      const box = doodleRef.current?.getBoundingClientRect();
      if (!box) return false;
      const dx = Math.max(box.left - last.x, 0, last.x - box.right);
      const dy = Math.max(box.top - last.y, 0, last.y - box.bottom);
      return Math.hypot(dx, dy) < REACH;
    };
    const check = () => {
      frame = 0;
      if (noticing || !near()) return;
      noticing = window.setTimeout(() => {
        noticing = 0;
        if (near()) fleeRef.current(last.x, last.y);
      }, NOTICE);
    };
    const onMove = (e: PointerEvent) => {
      last = { x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(check);
    };
    addEventListener("pointermove", onMove, { passive: true });
    return () => {
      removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      clearTimeout(noticing);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const returnTo = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      returnTo?.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  return (
    <div
      className="overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="About me"
      aria-hidden={!open}
      inert={!open}
      // Inline so a stale stylesheet can never drop this panel into the page flow.
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        visibility: visible ? "visible" : "hidden",
        pointerEvents: open ? "auto" : "none",
      }}
    >
      <div
        // A long, soft shadow under the leading edge gives the screen some weight.
        className={`absolute inset-0 grid -translate-y-full place-items-center overflow-hidden paper shadow-[0_40px_80px_-20px_rgb(40_60_110/0.18)] portrait:grid-cols-[minmax(0,1fr)] portrait:place-items-start portrait:justify-items-center portrait:overflow-y-auto motion-reduce:translate-none motion-reduce:opacity-0 ${
          open
            ? "animate-screen-in motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:transition-opacity motion-reduce:duration-300"
            : closing
              ? "animate-screen-out motion-reduce:animate-screen-fade"
              : ""
        }`}
        onAnimationEnd={(e) => {
          if (e.target === e.currentTarget && closing) setClosing(false);
        }}
      >
        <button
          ref={closeRef}
          type="button"
          className="absolute top-5 right-6 z-1 size-10 max-sm:top-16 max-sm:right-3 cursor-pointer rounded-full border-0 bg-transparent text-[26px] leading-none text-[#a3b8e8] opacity-70 transition-[background-color,opacity,rotate] duration-300 hover:rotate-90 hover:bg-[rgb(163_184_232/0.15)] hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3b8e8] focus-visible:outline-dashed"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close About me</span>
        </button>

        {/* Inner content moves on its own curve so the page feels revealed, not pushed. */}
        <div
          ref={stageRef}
          className={`relative aspect-video w-[min(100vw,calc(100svh*16/9))] portrait:aspect-auto portrait:w-full portrait:px-4 portrait:pt-22 portrait:pb-12 motion-reduce:animate-none ${
            open ? "animate-content-in" : closing ? "animate-content-out" : ""
          }`}
        >
          <div
            className={`absolute top-[30%] left-[5.7%] w-[34.8%] opacity-0 portrait:static portrait:mt-7 portrait:w-full ${
              open
                ? "animate-photo-in motion-reduce:animate-none motion-reduce:opacity-100"
                : closing
                  ? "opacity-100"
                  : ""
            }`}
          >
            <Image
              {...ABOUT_PHOTO}
              alt={ABOUT_PHOTO.alt}
              sizes="(max-aspect-ratio: 1/1) 100vw, 36vw"
              className="block h-auto w-full"
            />
          </div>
          {/* Same top and height as the photo: the paragraph starts level with its top edge and the
              icons end level with its bottom edge. */}
          <section
            className={`absolute top-[30%] left-[45%] flex h-[39.1%] w-[47%] flex-col justify-between opacity-0 portrait:static portrait:mt-7 portrait:h-auto portrait:w-full ${
              open ? "animate-intro-in motion-reduce:animate-none motion-reduce:opacity-100" : ""
            }`}
          >
            <p className="m-0 -mt-[0.45em] font-typewriter text-[clamp(13px,1.05vw,18px)] leading-[1.85] tracking-wide text-pretty text-[#5A83BB]">
              {ABOUT_TEXT}
            </p>
            <ContactIcons
              className="gap-[clamp(14px,1.6vw,26px)] portrait:mt-6"
              iconClassName="size-[clamp(26px,2.3vw,40px)] portrait:size-9"
            />
          </section>
          {/* The doodle won't be caught: it runs to another clear spot whenever someone reaches
              for it (see flee). On a phone, left/top do nothing and it swaps sides of its row. */}
          <div
            ref={doodleRef}
            aria-hidden
            onPointerDown={(e) => fleeRef.current(e.clientX, e.clientY)}
            style={{ left: `${SPOTS[spot].x}%`, top: `${SPOTS[spot].y}%` }}
            className={`absolute w-[22%] touch-manipulation opacity-0 transition-[left,top,margin] duration-900 ease-soft select-none portrait:static portrait:mt-10 portrait:w-2/3 motion-reduce:transition-none ${
              leftSide ? "portrait:mr-auto" : "portrait:ml-auto"
            } ${
              open
                ? "animate-[photo-in_0.9s_cubic-bezier(0.22,1,0.36,1)_0.85s_both] motion-reduce:animate-none motion-reduce:opacity-100"
                : closing
                  ? "opacity-100"
                  : ""
            }`}
          >
            <div
              key={hops}
              className={`relative ${hops ? "animate-scamper motion-reduce:animate-none" : ""}`}
              style={{ "--lean": `${hops % 2 ? 6 : -6}deg` } as CSSProperties}
            >
              {/* A little pencilled dare above the grass; it hops along with the doodle. */}
              <span className="absolute -top-[0.9em] right-[14%] -rotate-6 font-hand text-[15px] leading-none text-[#5A83BB] sm:text-base">
                catch me
              </span>
              <Image
                src="/abt-doodle.png"
                alt=""
                width={424}
                height={173}
                sizes="(max-aspect-ratio: 1/1) 66vw, 22vw"
                draggable={false}
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
