import Image from "next/image";
import type { CSSProperties } from "react";
import type { Sketch } from "../sketches/sketches";

// Each tile's tilt (deg) and drop from the tile above (px), cycled through in order. Fixed rather
// than random so the collage looks the same on every load and the server and client agree.
export const TILTS = [-2, 1.5, -1, 2.5, -1.5, 1, -2.5, 0.5];
const DROPS = [0, 14, 6, 20, 10, 2];

// White paper mount shared by every sketch; on hover it straightens and lifts. Tilt comes from --tilt.
export const MOUNT =
  "relative bg-white p-2 shadow-[0_10px_30px_-12px_rgba(23,23,23,0.35)] ring-1 ring-black/5 transition duration-500 ease-soft rotate-[calc(var(--tilt)*0.5)] sm:p-3 sm:rotate-(--tilt) hover:z-10 hover:rotate-0 hover:scale-103 hover:shadow-[0_20px_40px_-14px_rgba(23,23,23,0.45)] motion-reduce:transition-none motion-reduce:hover:scale-100";

// A sketch at its own shape (nothing cropped), mounted on white paper and set at a slight angle.
export default function Tile({ sketch, index, sizes }: { sketch: Sketch; index: number; sizes: string }) {
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
