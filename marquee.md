# Marquee — taped photo strip

An endless row of photos that drift sideways. Each photo is mounted on white paper, tilted a little, and held down by a strip of torn white tape. Every other photo sits slightly lower, like pages pinned along a line. The edges of the row fade out. Hovering over the row pauses it, and hovering over one photo straightens it and lifts it toward you. With reduced motion turned on, the row stops moving and you can scroll through it sideways instead.

## Requirements

- React 18+ and **Tailwind CSS v4**. The component uses v4 syntax: `rotate-(--tilt)`, `mask-x-from-*`, `scale-103` and `@theme` tokens.
- `next/image` is used for the photos. Outside Next.js, swap it for a plain `<img>` (see [Without Next.js](#without-nextjs)).

## 1. Add the animation and easing to your global CSS

Add these to the stylesheet that has `@import "tailwindcss";`:

```css
@theme inline {
  --ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
  /* Slides a track holding its content twice by one copy's width, so the loop has no seam. */
  --animate-marquee: marquee var(--marquee-duration, 60s) linear infinite;
}

@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}
```

This gives you the `animate-marquee` and `ease-soft` classes. Each marquee sets its own speed through `--marquee-duration`.

## 2. Add the component

`Marquee.tsx`:

```tsx
import Image from "next/image";
import type { CSSProperties } from "react";

export type MarqueePhoto = { src: string; width: number; height: number; alt: string };

// Each page's tilt (deg), cycled through in order. Fixed rather than random so the row looks the
// same on every load and the server and client agree.
const TILTS = [-2, 1.5, -1, 2.5, -1.5, 1, -2.5, 0.5];

// Angle of the strip of tape holding each page down.
const TAPE_TILTS = [-4, 3, -2, 5, -5, 2];

// White paper mount; on hover it straightens and lifts. Tilt comes from --tilt (halved on phones).
const MOUNT =
  "relative bg-white p-2 shadow-[0_10px_30px_-12px_rgba(23,23,23,0.35)] ring-1 ring-black/5 transition duration-500 ease-soft rotate-[calc(var(--tilt)*0.5)] sm:p-3 sm:rotate-(--tilt) hover:z-10 hover:rotate-0 hover:scale-103 hover:shadow-[0_20px_40px_-14px_rgba(23,23,23,0.45)] motion-reduce:transition-none motion-reduce:hover:scale-100";

// Pages are a fixed height (h-48, sm:h-60), so their width follows their shape.
const pageSizes = ({ width, height }: MarqueePhoto) =>
  `(min-width: 640px) ${Math.round((240 * width) / height)}px, ${Math.round((192 * width) / height)}px`;

// A row of taped-down pages sliding past. The pages are listed twice and the track moves by one
// copy's width, so the loop never shows a seam. Hovering the row pauses it. With reduced motion the
// row stands still and scrolls sideways by hand instead.
export default function Marquee({
  photos,
  seconds = 60,
  reverse = false,
  tiltOffset = 0,
}: {
  photos: MarqueePhoto[];
  // Time for one full loop. More (or wider) photos need more seconds to keep the same pace.
  seconds?: number;
  // Drift left to right instead.
  reverse?: boolean;
  // Shifts the tilt pattern, so two rows stacked together don't tilt in step.
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
          photos.map((photo, i) => (
            <li
              key={`${copy}-${photo.src}`}
              aria-hidden={copy || undefined}
              className={`shrink-0 px-4 sm:px-6 ${copy ? "motion-reduce:hidden" : ""}`}
            >
              <Page photo={photo} index={i + tiltOffset} decorative={copy} />
            </li>
          )),
        )}
      </ul>
    </div>
  );
}

function Page({ photo, index, decorative }: { photo: MarqueePhoto; index: number; decorative: boolean }) {
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
        src={photo.src}
        alt={decorative ? "" : photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={pageSizes(photo)}
        // Pages slide in from off-screen, where lazy loading would leave them blank for a moment.
        loading="eager"
        className="h-48 w-auto sm:h-60"
      />
    </div>
  );
}
```

## 3. Use it with your own photos

Put the images in `public/` and list them. `width` and `height` are the file's real pixel size. Only the ratio matters, since every photo is shown at the same height and its width follows from its shape.

```tsx
import Marquee, { type MarqueePhoto } from "./Marquee";

const TRAVEL: MarqueePhoto[] = [
  { src: "/photos/lake.jpg", width: 1600, height: 1067, alt: "A still lake at dawn under low mist" },
  { src: "/photos/market.jpg", width: 1200, height: 1500, alt: "A crowded spice stall in a night market" },
  { src: "/photos/tram.jpg", width: 1600, height: 1200, alt: "A yellow tram turning a narrow corner" },
  // ...
];

export default function Gallery() {
  return <Marquee photos={TRAVEL} seconds={70} />;
}
```

### Two rows drifting against each other

Give the rows different speeds so they never line up, reverse one, and offset its tilts:

```tsx
<div className="flex flex-col">
  <Marquee photos={ROW_ONE} seconds={70} />
  <Marquee photos={ROW_TWO} seconds={85} reverse tiltOffset={3} />
</div>
```

### Props

| Prop         | Default | What it does                                                         |
| ------------ | ------- | -------------------------------------------------------------------- |
| `photos`     | —       | The photos, in order. Each needs `src`, `width`, `height` and `alt`. |
| `seconds`    | `60`    | Time for one full loop. Higher is slower.                            |
| `reverse`    | `false` | Drift left to right instead of right to left.                        |
| `tiltOffset` | `0`     | Shifts the tilt pattern, so stacked rows don't tilt in step.         |

## Tips

- **Use enough photos.** One copy of the list has to be at least as wide as the screen. Otherwise a gap shows before the loop repeats. About 6 landscape photos, or 8 portrait ones, is a safe minimum for a full-width row.
- **Keep the pace even.** `seconds` is the time for the whole list, so a longer list or wider photos move faster at the same value. Scale `seconds` with the list's total width. For reference, 8 near-square photos look good at 70s and 6 wide 16:9 photos at 80s.
- **Change the photo height** by editing `h-48 sm:h-60` on the `<Image>`. If you do, update the `192` and `240` in `pageSizes` to match (the height in px for each class).
- **Background:** the mount and tape are white, and the tape relies on its shadow to show. The row looks best on a white or light background.
- **Alt text** is read once. The duplicate copy that makes the loop seamless is hidden from screen readers.

## Without Next.js

Replace the `next/image` import and the `<Image>` element with a plain image:

```tsx
<img
  src={photo.src}
  alt={decorative ? "" : photo.alt}
  width={photo.width}
  height={photo.height}
  className="h-48 w-auto sm:h-60"
/>
```

Then delete `pageSizes`. The `width`/`height` attributes still reserve the right space before the image loads.
