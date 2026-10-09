"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// Where the string ties onto moon.png, as a fraction of the image box (top of the crescent).
const ATTACH = { x: 0.45, y: 0.28 };
// Resting string length as a fraction of the stage height.
const REST = 0.13;
// How far (fraction of viewport height) the moon must be pulled down to open the page.
const THRESHOLD = 0.1;
// Moon box as a percentage of the stage width (the crescent fills ~45% of the PNG).
const MOON_WIDTH = 6;
// Left edge of the moon box, as a percentage of the stage width.
const MOON_LEFT = 5;

// Yarn strands, drawn back to front: [stroke, width, dasharray, opacity]
const STRANDS: [string, number, string | undefined, number][] = [
  ["#b9c9ee", 5, "0.6 2.4", 0.55], // fuzz
  ["#a3b8e8", 3.4, undefined, 1], // body
  ["#8aa2db", 1.4, "6 3 2 4", 0.9], // twist shadow
  ["#e1e9f9", 1.1, "2 5 1 7 3 4", 0.9], // highlight fibres
];

type Props = {
  open: boolean;
  onPull: () => void;
};

export default function MoonPull({ open, onPull }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLButtonElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const onPullRef = useRef(onPull);

  useEffect(() => {
    onPullRef.current = onPull;
  }, [onPull]);

  useEffect(() => {
    const root = rootRef.current;
    const moon = moonRef.current;
    if (!root || !moon) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let restLen = 0;
    let moonW = 0;
    let moonH = 0;
    const measure = () => {
      const stageH = root.parentElement?.clientHeight ?? window.innerHeight;
      restLen = stageH * REST;
      moonW = moon.offsetWidth;
      moonH = moon.offsetHeight;
      moon.style.top = `${restLen - moonH * ATTACH.y}px`;
      root.style.setProperty("--rest", `${restLen}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root.parentElement ?? root);

    // Moon offset from rest, its velocity, and drag state.
    const pos = { x: 0, y: 0 };
    const vel = { x: 0, y: 0 };
    let drag: { id: number; sx: number; sy: number; moved: number } | null = null;
    const dragTarget = { x: 0, y: 0 };
    let armed = false;
    let frame = 0;
    const t0 = performance.now();

    const draw = (t: number) => {
      const sway = reduced || drag ? 0 : Math.sin((t - t0) / 650) * Math.max(4, restLen * 0.05);

      if (drag) {
        pos.x += (dragTarget.x - pos.x) * 0.35;
        pos.y += (dragTarget.y - pos.y) * 0.35;
        vel.x = vel.y = 0;
      } else {
        const k = reduced ? 0.2 : 0.07;
        const damp = reduced ? 0.6 : 0.86;
        vel.x = (vel.x + (sway - pos.x) * k) * damp;
        vel.y = (vel.y + (0 - pos.y) * k) * damp;
        pos.x += vel.x;
        pos.y += vel.y;
      }

      const ax = moonW * ATTACH.x;
      const ex = ax + pos.x;
      const ey = restLen + pos.y;
      // Control point lags behind the moon so the string bends as it swings.
      const cx = ax + pos.x * 0.35 - vel.x * 3;
      const cy = ey * 0.55;
      const len = Math.hypot(ex - ax, ey);
      const thin = Math.min(1, Math.max(0.55, restLen / Math.max(len, 1)));
      const d = `M ${ax} -2 Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${ex.toFixed(2)} ${ey.toFixed(2)} q 3 4 -1 6 q -4 1 -3 -3`;
      pathRefs.current.forEach((p, i) => {
        if (!p) return;
        p.setAttribute("d", d);
        p.style.strokeWidth = String(STRANDS[i][1] * thin);
      });

      const rot = Math.max(-14, Math.min(14, -pos.x * 0.35 + vel.x * 0.8));
      moon.style.transform = `translate(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px) rotate(${rot.toFixed(2)}deg)`;

      const tension = Math.max(0, Math.min(1, pos.y / (window.innerHeight * THRESHOLD)));
      root.style.setProperty("--tension", tension.toFixed(3));
      const nowArmed = !!drag && tension >= 1;
      if (nowArmed !== armed) {
        armed = nowArmed;
        root.classList.toggle("is-armed", armed);
      }
      if (armed && drag) {
        // The cord "clicks" the moment it is pulled far enough: let go and drop the screen.
        release();
        vel.y = -14;
        onPullRef.current();
      }

      const still =
        !drag &&
        sway === 0 &&
        Math.abs(pos.x) + Math.abs(pos.y) + Math.abs(vel.x) + Math.abs(vel.y) < 0.02;
      frame = still ? 0 : requestAnimationFrame(draw);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const release = () => {
      if (drag && moon.hasPointerCapture(drag.id)) moon.releasePointerCapture(drag.id);
      drag = null;
      armed = false;
      root.classList.remove("is-dragging", "is-armed");
    };
    kick();

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      moon.setPointerCapture(e.pointerId);
      drag = { id: e.pointerId, sx: e.clientX, sy: e.clientY, moved: 0 };
      dragTarget.x = dragTarget.y = 0;
      root.classList.add("is-dragging", "has-pulled");
      kick();
    };
    const onMove = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.sx;
      const dy = e.clientY - drag.sy;
      drag.moved = Math.max(drag.moved, Math.hypot(dx, dy));
      // Rubber-band: the string resists more the further it stretches.
      const max = window.innerHeight * 0.45;
      const down = Math.max(0, dy * 0.75);
      dragTarget.y = dy < 0 ? dy * 0.15 : max * (1 - Math.exp(-down / max));
      dragTarget.x = Math.max(-40, Math.min(40, dx * 0.25));
    };
    const onUp = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const tapped = drag.moved < 5;
      release();
      if (tapped) {
        vel.y = 16; // a little tug to hint it can be pulled
      }
      kick();
    };

    moon.addEventListener("pointerdown", onDown);
    moon.addEventListener("pointermove", onMove);
    moon.addEventListener("pointerup", onUp);
    moon.addEventListener("pointercancel", onUp);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      moon.removeEventListener("pointerdown", onDown);
      moon.removeEventListener("pointermove", onMove);
      moon.removeEventListener("pointerup", onUp);
      moon.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      // Drag state (is-dragging / is-armed / has-pulled) is toggled on this class list from the
      // animation loop, so `open` lives in a data attribute where React can't overwrite them.
      className="group/moon [--tension:0]"
      data-open={open}
      // Geometry is inline so a stale stylesheet can never leave a giant, detached moon.
      style={{
        position: "absolute",
        top: 0,
        left: `${MOON_LEFT}%`,
        width: `${MOON_WIDTH}%`,
        height: "100%",
      }}
    >
      <svg
        className="pointer-events-none absolute inset-0 z-2 size-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="yarn"
            filterUnits="userSpaceOnUse"
            x="-300"
            y="-50"
            width="600"
            height="3000"
          >
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="2.6" />
          </filter>
        </defs>
        <g filter="url(#yarn)" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {STRANDS.map(([stroke, width, dash, opacity], i) => (
            <path
              key={i}
              ref={(el) => {
                pathRefs.current[i] = el;
              }}
              stroke={stroke}
              strokeWidth={width}
              strokeDasharray={dash}
              opacity={opacity}
            />
          ))}
        </g>
      </svg>

      <button
        ref={moonRef}
        type="button"
        className="pointer-events-auto cursor-grab touch-none rounded-full border-0 bg-transparent p-0 transition-[filter] duration-300 will-change-transform [filter:drop-shadow(0_0_calc(var(--tension)*16px)_rgb(242_192_74/calc(var(--tension)*0.75)))] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#a3b8e8] focus-visible:outline-dashed group-[.is-armed]/moon:[filter:drop-shadow(0_0_18px_rgb(242_192_74/0.95))_brightness(1.08)] group-[.is-dragging]/moon:cursor-grabbing"
        aria-label={open ? "Pull the moon to go back home" : "Pull the moon to open About me"}
        style={{
          position: "absolute",
          left: 0,
          width: "100%",
          transformOrigin: `${ATTACH.x * 100}% ${ATTACH.y * 100}%`,
        }}
        onClick={(e) => {
          // Pointer pulls are handled above; this is the keyboard path (Enter / Space).
          if (e.detail === 0) onPull();
        }}
      >
        <Image
          src="/moon.png"
          alt=""
          width={265}
          height={257}
          loading="eager"
          draggable={false}
          className="block h-auto w-full select-none"
        />
      </button>

      <span
        className="pointer-events-none absolute top-[calc(var(--rest,0px)_+_0.2vw)] left-[70%] animate-moon-hint text-[clamp(9px,0.7vw,12px)] tracking-[0.08em] whitespace-nowrap text-[#8aa2db] italic opacity-0 transition-opacity duration-400 group-[.has-pulled]/moon:animate-none group-data-[open=true]/moon:animate-none"
        aria-hidden="true"
      >
        pull me
      </span>
    </div>
  );
}
