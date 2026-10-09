"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import AboutPanel from "./AboutPanel";
import MoonPull from "./MoonPull";

// Positions are percentages of the 1920×1080 artboard of ill-home.png.
const HORSES = [
  { src: "/h3.png", w: 259, h: 150, left: 27.9, top: 18.4, width: 13.5, depth: 8, delay: 0, enterDelay: 0 },
  { src: "/h2.png", w: 266, h: 171, left: 50.0, top: 30.1, width: 13.9, depth: 14, delay: -2.1, enterDelay: 0.3 },
  { src: "/h1.png", w: 291, h: 169, left: 72.2, top: 23.5, width: 15.2, depth: 11, delay: -4.3, enterDelay: 0.6 },
];

export default function HomeScene() {
  const homeRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [ready, setReady] = useState(false);
  // Whether we pushed the #about history entry, so closing can step back instead of stacking.
  const pushedRef = useRef(false);

  useEffect(() => {
    const sync = () => {
      const open = window.location.hash === "#about";
      if (!open) pushedRef.current = false;
      setAboutOpen(open);
    };
    sync();
    window.addEventListener("popstate", sync);
    // The navbar fires hashchange when it opens or closes About in place.
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  // The About screen covers the window, so stop the page behind it from scrolling.
  useEffect(() => {
    if (!aboutOpen) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
    };
  }, [aboutOpen]);

  const openAbout = useCallback(() => {
    if (window.location.hash !== "#about") {
      window.history.pushState(null, "", "#about");
      pushedRef.current = true;
    }
    setAboutOpen(true);
  }, []);

  const closeAbout = useCallback(() => {
    if (pushedRef.current) {
      window.history.back();
    } else {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      setAboutOpen(false);
    }
  }, []);

  // Hold the entrance until every image has decoded, so horses never pop in mid-run.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let done = false;
    const ready = () => {
      if (done) return;
      done = true;
      setReady(true);
    };
    const imgs = Array.from(stage.querySelectorAll("img"));
    Promise.all(imgs.map((img) => img.decode().catch(() => {}))).then(ready);
    const fallback = window.setTimeout(ready, 2500);
    return () => {
      done = true;
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    // Parallax vars live on <main> so the stage and the moon overlay both inherit them.
    const home = homeRef.current;
    if (!home) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !finePointer) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    const tick = () => {
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      home.style.setProperty("--mx", current.x.toFixed(4));
      home.style.setProperty("--my", current.y.toFixed(4));
      const settled =
        Math.abs(target.x - current.x) < 0.0005 && Math.abs(target.y - current.y) < 0.0005;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
      kick();
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      kick();
    };

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const stageBox = "relative aspect-video w-[min(100vw,calc(100svh*16/9))]";
  const layer = "absolute parallax motion-reduce:transform-none";
  // Entrance animations stay paused (horses hidden off-screen) until the images are decoded.
  const play = ready ? "[animation-play-state:running]" : "";

  return (
    <div
      ref={homeRef}
      className="relative grid min-h-svh place-items-center overflow-hidden [--mx:0] [--my:0]"
    >
      <div
        ref={stageRef}
        className={`${stageBox} transition-[scale,opacity,filter] duration-1100 ease-screen motion-reduce:transition-none ${
          aboutOpen ? "scale-96 opacity-60 blur-[2px] motion-reduce:scale-100 motion-reduce:blur-none" : ""
        }`}
      >
        <div className={`${layer} inset-0`} style={{ "--depth": "-3px" } as CSSProperties}>
          <Image
            src="/ill-home.png"
            alt="A girl standing on a flowering hillside beside a golden tree, reaching up to the sky"
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>

        {HORSES.map((horse, i) => (
          <div
            key={horse.src}
            className={layer}
            style={
              {
                left: `${horse.left}%`,
                top: `${horse.top}%`,
                width: `${horse.width}%`,
                "--depth": `${horse.depth}px`,
                "--enter-delay": `${horse.enterDelay}s`,
              } as CSSProperties
            }
          >
            <div className={`animate-horse-enter motion-reduce:animate-none ${play}`}>
              <div className={`animate-horse-run motion-reduce:animate-none ${play}`}>
                <div
                  className="animate-horse-float motion-reduce:animate-none"
                  style={{ animationDelay: `${horse.delay}s` }}
                >
                  <div className="group/horse origin-[45%_70%] cursor-pointer transition-[scale,filter] duration-600 ease-soft hover:scale-106 hover:drop-shadow-[0_10px_14px_rgb(46_84_170/0.22)] motion-reduce:transition-none motion-reduce:hover:scale-100">
                    <Image
                      src={horse.src}
                      alt={`Blue horse galloping ${i + 1}`}
                      width={horse.w}
                      height={horse.h}
                      priority
                      draggable={false}
                      className="block h-auto w-full select-none group-hover/horse:animate-horse-gallop motion-reduce:group-hover/horse:animate-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AboutPanel open={aboutOpen} onClose={closeAbout} />

      {/* The moon floats above both screens: pull it to drop the About screen, pull again to go home.
          It scrolls away with the scene, but pins to the window while About is open. */}
      <div
        className={`pointer-events-none ${aboutOpen ? "fixed" : "absolute"} inset-x-0 top-0 z-60 grid h-svh place-items-center`}
      >
        <div className={stageBox}>
          <div
            className={`${layer} pointer-events-none inset-0`}
            style={{ "--depth": "5px" } as CSSProperties}
          >
            <MoonPull open={aboutOpen} onPull={aboutOpen ? closeAbout : openAbout} />
          </div>
        </div>
      </div>
    </div>
  );
}
