import Image from "next/image";
import ContactIcons from "./ContactIcons";
import { SectionTitle } from "./Headings";

// The last part of the home page: the contact icons sit in line with the heading, at its right,
// over foot.png, a crayon drawing of a girl crouched over a sprouting seedling. The file is a
// 3035×2150 transparent sheet with the drawing in the middle, so only that crop is shown.
const SHEET = { width: 3035, height: 2150 };
const CROP = { x: 920, y: 300, width: 1490, height: 1450 };

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="pb-6 sm:pb-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        <div className="flex items-center justify-between gap-6">
          <SectionTitle id="contact-title" number={3}>
            Contact
          </SectionTitle>
          <ContactIcons className="gap-4 sm:gap-6" iconClassName="size-8 sm:size-10" />
        </div>

        {/* The box takes the crop's shape; the whole sheet is scaled and shifted inside it so just
            the drawing shows. */}
        <div
          className="relative mx-auto mt-6 w-full max-w-xs overflow-hidden sm:mt-4 sm:max-w-sm"
          style={{ aspectRatio: `${CROP.width} / ${CROP.height}` }}
        >
          <Image
            src="/foot.png"
            alt="A curly-haired girl in a green dress crouching to watch a tiny seedling sprout from the soil"
            width={SHEET.width}
            height={SHEET.height}
            sizes="(min-width: 640px) 790px, 650px"
            className="pointer-events-none absolute h-auto max-w-none select-none"
            style={{
              width: `${(SHEET.width / CROP.width) * 100}%`,
              left: `${(-CROP.x / CROP.width) * 100}%`,
              top: `${(-CROP.y / CROP.height) * 100}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
