import Image from "next/image";
import { ABOUT_PHOTO, ABOUT_TEXT } from "./about";
import { SectionTitle } from "./Headings";

// About me as a plain section, for phones only: there the moon pull is gone, and this sits just
// above Contact. Its id is the one the navbar's About me link points at, so on a phone that link
// scrolls here; on wider screens the section is hidden and the link opens the About screen.
export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 pb-24 sm:hidden"
    >
      <SectionTitle id="about-title" number={3}>
        About me
      </SectionTitle>

      <Image {...ABOUT_PHOTO} alt={ABOUT_PHOTO.alt} sizes="100vw" className="mt-8 block h-auto w-full" />
      <p className="mt-7 font-typewriter text-[15px] leading-[1.85] tracking-wide text-pretty text-[#5A83BB]">
        {ABOUT_TEXT}
      </p>
      <Image
        src="/abt-doodle.png"
        alt=""
        width={424}
        height={173}
        sizes="60vw"
        className="mt-8 ml-auto block h-auto w-3/5"
      />
    </section>
  );
}
