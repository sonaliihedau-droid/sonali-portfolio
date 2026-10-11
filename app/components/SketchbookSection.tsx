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

// Each tile's tilt (deg) and drop from the tile above (px), cycled through in order. Fixed rather
// than random so the collage looks the same on every load and the server and client agree.
const TILTS = [-2, 1.5, -1, 2.5, -1.5, 1, -2.5, 0.5];
const DROPS = [0, 14, 6, 20, 10, 2];

// White paper mount shared by every sketch; on hover it straightens and lifts. Tilt comes from --tilt.
const MOUNT =
  "relative bg-white p-2 shadow-[0_10px_30px_-12px_rgba(23,23,23,0.35)] ring-1 ring-black/5 transition duration-500 ease-soft rotate-[calc(var(--tilt)*0.5)] sm:p-3 sm:rotate-(--tilt) hover:z-10 hover:rotate-0 hover:scale-103 hover:shadow-[0_20px_40px_-14px_rgba(23,23,23,0.45)] motion-reduce:transition-none motion-reduce:hover:scale-100";

// Angle of the strip of tape holding each marquee page down.
const TAPE_TILTS = [-4, 3, -2, 5, -5, 2];

const COLUMN_SIZES = "(min-width: 1152px) 340px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw";
const COMPACT_COLUMN_SIZES = "(min-width: 1152px) 250px, (min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw";
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
      <h2 id="sketchbook-title" className="font-display text-3xl font-bold text-[#5A83BB] sm:text-4xl">
        Sketchbook
      </h2>

      <h3 className="mt-10 font-display text-xl font-bold text-[#5A83BB] sm:mt-14 sm:text-2xl">Live Sketches</h3>
      <Scatter sketches={LIVE_SKETCHES} />

      <h3 className="mt-20 font-display text-xl font-bold text-[#5A83BB] sm:mt-28 sm:text-2xl">Digital Illustration</h3>
      <div className="mt-6 sm:mt-8">
        {/* Wider pages than the Colour rows, so a longer loop keeps the same drifting pace. */}
        <Marquee sketches={DIGITAL_MARQUEE} seconds={80} />
      </div>
      <Collage sketches={DIGITAL_ILLUSTRATIONS} />

      <h3 className="mt-20 font-display text-xl font-bold text-[#5A83BB] sm:mt-28 sm:text-2xl">Colour</h3>
      {/* Two rows drifting in opposite directions at different speeds, so they never line up. */}
      <div className="mt-6 flex flex-col sm:mt-8">
        <Marquee sketches={COLOUR_SKETCHES.slice(0, COLOUR_ROW_SPLIT)} seconds={70} />
        <Marquee sketches={COLOUR_SKETCHES.slice(COLOUR_ROW_SPLIT)} seconds={85} reverse tiltOffset={3} />
      </div>

      <h3 className="mt-20 font-display text-xl font-bold text-[#5A83BB] sm:mt-28 sm:text-2xl">Pencil</h3>
      <Collage sketches={PENCIL_SKETCHES} compact />
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
// lean alternately. Below that they stack, alternating left and right.
const BOARD_ASPECT = "1088 / 1140";
const SCATTER = [
  { x: 2, y: 0, w: 40, tilt: -3 },
  { x: 52, y: 15, w: 46, tilt: 2.5 },
  { x: 6, y: 50, w: 44, tilt: 2 },
  { x: 58, y: 60, w: 36, tilt: -2.5 },
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
// `compact`: smaller tiles, one more column at every width.
function Collage({ sketches, compact = false }: { sketches: Sketch[]; compact?: boolean }) {
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
          <ul
            key={run[0].src}
            className={
              compact
                ? "columns-2 gap-5 px-2 sm:columns-3 sm:gap-7 lg:columns-4"
                : "columns-1 gap-8 px-2 sm:columns-2 sm:gap-10 lg:columns-3"
            }
          >
            {run.map((sketch) => (
              <li key={sketch.src} className={`break-inside-avoid ${compact ? "mb-5 sm:mb-7" : "mb-8 sm:mb-10"}`}>
                <Tile
                  sketch={sketch}
                  index={sketches.indexOf(sketch)}
                  sizes={compact ? COMPACT_COLUMN_SIZES : COLUMN_SIZES}
                />
              </li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}

function Tile({ sketch, index, sizes }: { sketch: Sketch; index: number; sizes: string }) {
  // Wide strips sit nearly level; a big tilt on a long tile swings its ends far out.
  const tilt = TILTS[index % TILTS.length] * (sketch.wide ? 0.3 : 1);
  const style = {
    "--tilt": `${tilt}deg`,
    paddingTop: sketch.wide ? 0 : DROPS[index % DROPS.length],
  } as CSSProperties;

  return (
    <div style={style}>
      <div className={MOUNT}>
        <Image
          src={sketch.src}
          alt={sketch.alt}
          width={sketch.width}
          height={sketch.height}
          sizes={sizes}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
