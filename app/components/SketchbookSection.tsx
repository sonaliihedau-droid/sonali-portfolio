import Image from "next/image";
import type { CSSProperties } from "react";
import {
  COLOUR_ROW_SPLIT,
  COLOUR_SKETCHES,
  DIGITAL_ILLUSTRATIONS,
  DIGITAL_MARQUEE,
  LIVE_SKETCHES,
  PENCIL_SKETCHES,
  type Sketch,
} from "../sketches/sketches";
import { SectionTitle, SubTitle } from "./Headings";
import PencilStack from "./PencilStack";
import Tile, { MOUNT, TILTS } from "./Tile";

// Angle of the strip of tape holding each marquee page down.
const TAPE_TILTS = [-4, 3, -2, 5, -5, 2];

const COLUMN_SIZES = "(min-width: 1152px) 340px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw";
const WIDE_SIZES = "(min-width: 1152px) 1000px, 90vw";

// Marquee pages are a fixed height (h-48, sm:h-60), so their width follows their shape.
const pageSizes = ({ width, height }: Sketch) =>
  `(min-width: 640px) ${Math.round((240 * width) / height)}px, ${Math.round((192 * width) / height)}px`;

export default function SketchbookSection() {
  return (
    <section
      id="sketchbook"
      aria-labelledby="sketchbook-title"
      className="mx-auto w-full max-w-6xl px-4 pt-24 pb-24 sm:px-8 sm:pt-32 sm:pb-32"
    >
      <SectionTitle id="sketchbook-title" number={2} mobileNumber={3}>
        Sketchbook
      </SectionTitle>

      <SubTitle className="mt-10 sm:mt-14">Live Sketches</SubTitle>
      <Scatter sketches={LIVE_SKETCHES} />

      <SubTitle className="mt-14 sm:mt-16">Illustration</SubTitle>
      <div className="mt-6 sm:mt-8">
        {/* Wider pages than the colour rows, so a longer loop keeps the same drifting pace. */}
        <Marquee sketches={DIGITAL_MARQUEE} seconds={80} />
      </div>
      <Collage sketches={DIGITAL_ILLUSTRATIONS} />

      {/* The colour marker pages drift past in two rows, then the pencil pages wait in a pile below. */}
      <SubTitle className="mt-20 sm:mt-28">Sketches</SubTitle>
      {/* Two rows drifting in opposite directions at different speeds, so they never line up. */}
      <div className="mt-6 flex flex-col sm:mt-8">
        <Marquee sketches={COLOUR_SKETCHES.slice(0, COLOUR_ROW_SPLIT)} seconds={70} />
        <Marquee sketches={COLOUR_SKETCHES.slice(COLOUR_ROW_SPLIT)} seconds={85} reverse tiltOffset={3} />
      </div>
      <div className="mt-6 sm:mt-10">
        <PencilStack sketches={PENCIL_SKETCHES} topSrc="/sktech/pencil/image5.jpg" />
      </div>
    </section>
  );
}

// A row of taped-down pages sliding past. The pages are listed twice and the track moves by one
// copy's width, so the loop never shows a seam. Hovering the row pauses it. With reduced motion the
// row stands still and scrolls sideways by hand instead.
function Marquee({
  sketches,
  seconds,
  reverse = false,
  tiltOffset = 0,
}: {
  sketches: Sketch[];
  seconds: number;
  reverse?: boolean;
  tiltOffset?: number;
}) {
  const style = {
    "--marquee-duration": `${seconds}s`,
    animationDirection: reverse ? "reverse" : undefined,
  } as CSSProperties;

  return (
    <div className="group/marquee overflow-hidden mask-x-from-90% mask-x-to-100% motion-reduce:overflow-x-auto">
      <ul
        style={style}
        className="flex w-max animate-marquee items-start py-10 group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none"
      >
        {[false, true].map((copy) =>
          sketches.map((sketch, i) => (
            <li
              key={`${copy}-${sketch.src}`}
              aria-hidden={copy || undefined}
              className={`shrink-0 px-4 sm:px-6 ${copy ? "motion-reduce:hidden" : ""}`}
            >
              <Page sketch={sketch} index={i + tiltOffset} decorative={copy} />
            </li>
          )),
        )}
      </ul>
    </div>
  );
}

function Page({ sketch, index, decorative }: { sketch: Sketch; index: number; decorative: boolean }) {
  const style = {
    "--tilt": `${TILTS[index % TILTS.length]}deg`,
    // Every other page sits a little lower, like pages pinned along a line.
    marginTop: index % 2 ? 18 : 0,
  } as CSSProperties;

  return (
    <div style={style} className={MOUNT}>
      {/* White tape on white paper: the drop shadow on the outer span follows the torn edge cut by
          the inner one's clip-path, which is what makes the strip visible against the mount. */}
      <span
        aria-hidden
        className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 drop-shadow-[0_1px_1.5px_rgba(23,23,23,0.25)]"
        style={{ rotate: `${TAPE_TILTS[index % TAPE_TILTS.length]}deg` }}
      >
        <span className="block h-6 w-20 bg-white/80 [clip-path:polygon(3%_0,97%_4%,100%_30%,96%_55%,100%_80%,97%_100%,2%_96%,0_70%,4%_45%,0_20%)] sm:w-24" />
      </span>
      <Image
        src={sketch.src}
        alt={decorative ? "" : sketch.alt}
        width={sketch.width}
        height={sketch.height}
        sizes={pageSizes(sketch)}
        // Pages slide in from off-screen, where lazy loading would leave them blank for a moment.
        loading="eager"
        className="h-48 w-auto sm:h-60"
      />
    </div>
  );
}

// Where each live sketch sits on large screens, by index, in % of the board: `x`, `y` are its top-left
// corner, `w` its width. They zigzag down the board (top left, lower right, left, lower right) and
// lean alternately, with a wide gutter between the pairs, and the second pair starts well below the
// first so neither is cut off while the other is in view. Below that they stack, alternating sides.
// The board ends just below the last sketch, so the next heading follows at the usual spacing.
const BOARD_ASPECT = "1088 / 1153";
const SCATTER = [
  { x: 0, y: 0, w: 36, tilt: -3 },
  { x: 50, y: 16.5, w: 42, tilt: 2.5 },
  { x: 6, y: 57.2, w: 38, tilt: 2 },
  { x: 55, y: 62.7, w: 34, tilt: -2.5 },
];

// Live sketches drawn on the spot, scattered loose across the page with no paper mount: the cut-outs'
// own washes and doodles blend into the white page, so the pieces seem to float.
function Scatter({ sketches }: { sketches: Sketch[] }) {
  return (
    <div
      className="relative mt-10 sm:mt-14 lg:mx-auto lg:aspect-(--board) lg:max-w-5xl"
      style={{ "--board": BOARD_ASPECT } as CSSProperties}
    >
      <ul className="relative flex flex-col gap-16 sm:gap-20 lg:absolute lg:inset-0 lg:block">
        {sketches.map((sketch, i) => {
          const { x, y, w, tilt } = SCATTER[i % SCATTER.length];
          const style = {
            "--x": `${x}%`,
            "--y": `${y}%`,
            "--w": `${w}%`,
            rotate: `${tilt}deg`,
          } as CSSProperties;
          return (
            <li
              key={`${sketch.src}-${sketch.crop ?? ""}`}
              style={style}
              className={`w-[82%] sm:w-[58%] lg:absolute lg:top-(--y) lg:left-(--x) lg:w-(--w) ${i % 2 ? "self-end" : "self-start"}`}
            >
              <Cropped sketch={sketch} sizes={`(min-width: 1024px) ${Math.round(w * 10.9)}px, 82vw`} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// A sketch shown at its own shape, or only the slice its `crop` names: the box takes the slice's
// shape and the full image is widened and shifted inside it so just that slice shows.
function Cropped({ sketch, sizes }: { sketch: Sketch; sizes: string }) {
  const [left, right] = sketch.crop ?? [0, 1];
  const share = right - left;
  return (
    <div className="relative overflow-hidden" style={{ aspectRatio: `${sketch.width * share} / ${sketch.height}` }}>
      <Image
        src={sketch.src}
        alt={sketch.alt}
        width={sketch.width}
        height={sketch.height}
        // The image is drawn wider than the box by 1 / share; ask for a file that size.
        sizes={share < 1 ? sizes.replace(/(d+)(px|vw)/g, (_, n, unit) => `${Math.round(n / share)}${unit}`) : sizes}
        className="absolute top-0 h-full max-w-none"
        style={{ width: `${100 / share}%`, left: `${(-left / share) * 100}%` }}
      />
    </div>
  );
}

// Columns of tiles at their own shape (nothing cropped), each mounted on white paper and set at a
// slight angle. A wide sketch breaks the columns and runs across the whole collage.
function Collage({ sketches }: { sketches: Sketch[] }) {
  const runs: Sketch[][] = [];
  for (const sketch of sketches) {
    const last = runs.at(-1);
    if (sketch.wide || !last || last[0].wide) runs.push([sketch]);
    else last.push(sketch);
  }

  return (
    <div className="mt-8 flex flex-col gap-10 sm:mt-10 sm:gap-14">
      {runs.map((run) =>
        run[0].wide ? (
          <div key={run[0].src} className="mx-auto w-full max-w-5xl px-2">
            <Tile sketch={run[0]} index={sketches.indexOf(run[0])} sizes={WIDE_SIZES} />
          </div>
        ) : (
          <ul key={run[0].src} className="columns-1 gap-8 px-2 sm:columns-2 sm:gap-10 lg:columns-3">
            {run.map((sketch) => (
              <li key={sketch.src} className="mb-8 break-inside-avoid sm:mb-10">
                <Tile sketch={sketch} index={sketches.indexOf(sketch)} sizes={COLUMN_SIZES} />
              </li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}
