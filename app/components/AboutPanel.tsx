"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

// A white screen that glides down over the home scene, like a film's title curtain.
export default function AboutPanel({ open, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  // Keep the panel mounted while it slides back up.
  const [prevOpen, setPrevOpen] = useState(open);
  const [closing, setClosing] = useState(false);
  if (open !== prevOpen) {
    setPrevOpen(open);
    setClosing(!open);
  }
  const visible = open || closing;

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
        className={`absolute inset-0 grid -translate-y-full place-items-center overflow-hidden bg-white shadow-[0_40px_80px_-20px_rgb(40_60_110/0.18)] portrait:grid-cols-[minmax(0,1fr)] portrait:place-items-start portrait:justify-items-center portrait:overflow-y-auto motion-reduce:translate-none motion-reduce:opacity-0 ${
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
          className="absolute top-5 right-6 z-1 size-10 cursor-pointer rounded-full border-0 bg-transparent text-[26px] leading-none text-[#a3b8e8] opacity-70 transition-[background-color,opacity,rotate] duration-300 hover:rotate-90 hover:bg-[rgb(163_184_232/0.15)] hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3b8e8] focus-visible:outline-dashed"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close About me</span>
        </button>

        {/* Inner content moves on its own curve so the page feels revealed, not pushed. */}
        <div
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
              src="/about-me.png"
              alt="Sonali smiling over her shoulder on a tree-lined street"
              width={661}
              height={418}
              sizes="(max-aspect-ratio: 1/1) 100vw, 36vw"
              className="block h-auto w-full"
            />
          </div>
          {/* Same top and height as the photo, so the paragraph sits centred beside it. */}
          <section
            className={`absolute top-[30%] left-[46%] flex h-[39.1%] w-[42%] items-center opacity-0 portrait:static portrait:mt-7 portrait:h-auto portrait:w-full ${
              open ? "animate-intro-in motion-reduce:animate-none motion-reduce:opacity-100" : ""
            }`}
          >
            <p className="m-0 font-display text-[clamp(14px,1.15vw,19px)] leading-[1.8] font-semibold tracking-[0.005em] text-pretty text-[#5A83BB]">
              I am Sonali Hedau, a Visual Communication Designer who find stories in the little
              details of the world the quiet moments, fleeting gestures, and things often left
              unnoticed. I turn these observations into visual stories, moving between imagination
              and execution through illustration and concept development. My work is rooted in
              curiosity, simplicity, and the belief that even the smallest details can tell a
              meaningful story
            </p>
          </section>
          <div
            className={`pointer-events-none absolute right-[4%] bottom-[6%] w-[22%] opacity-0 portrait:static portrait:mt-10 portrait:ml-auto portrait:w-2/3 ${
              open
                ? "animate-[photo-in_0.9s_cubic-bezier(0.22,1,0.36,1)_0.85s_both] motion-reduce:animate-none motion-reduce:opacity-100"
                : closing
                  ? "opacity-100"
                  : ""
            }`}
          >
            <Image
              src="/abt-doodle.png"
              alt=""
              width={424}
              height={173}
              sizes="(max-aspect-ratio: 1/1) 66vw, 22vw"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
