import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "./Headings";

// Each project's front.png is a finished card: the artwork on textured paper with its title drawn in.
// `slug` links the card to its project page; a card without one has no page yet and isn't a link.
type Card = { src: string; alt: string; slug?: string };

const CARDS: Card[] = [
  { src: "/kai/front.png", alt: "Kai [Graphic Novel]", slug: "kai" },
  { src: "/aangan/front.png", alt: "Aangan – Short Film", slug: "aangan" },
  { src: "/illustration/front.png", alt: "Concept Art", slug: "concept-art" },
  { src: "/raw/front.png", alt: "Raw Mango [An experimental motion study]", slug: "raw-mango" },
  { src: "/visual/front.png", alt: "Visual Scripting", slug: "visual" },
  { src: "/interactive/front.png", alt: "Birds of Keoladeo – Interactive Website", slug: "keoladeo" },
];

// A card shows only once its front.png is in public/, so a new project can be listed before its
// card is drawn without leaving a broken image on the page.
const hasImage = ({ src }: Card) => existsSync(path.join(process.cwd(), "public", src));

const CARD_WIDTH = 1350;
const CARD_HEIGHT = 950;
const CARD_SIZES = "(min-width: 1152px) 540px, (min-width: 640px) 50vw, 100vw";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="mx-auto w-full max-w-6xl px-4 pt-24 sm:px-8 sm:pt-32"
    >
      <SectionTitle id="projects-title" number={1} mobileNumber={2}>
        Projects
      </SectionTitle>

      {/* An odd last card sits centred under the others at the same size. */}
      <ul className="mt-8 grid gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8 sm:[&>li:last-child:nth-child(odd)]:col-span-2 sm:[&>li:last-child:nth-child(odd)]:mx-auto sm:[&>li:last-child:nth-child(odd)]:w-[calc(50%-1rem)]">
        {CARDS.filter(hasImage).map((card) => (
          <li key={card.src}>
            {card.slug ? (
              <Link
                href={`/projects/${card.slug}`}
                className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5A83BB]"
              >
                <CardImage card={card} />
              </Link>
            ) : (
              <CardImage card={card} />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function CardImage({ card }: { card: Card }) {
  return (
    <Image
      src={card.src}
      alt={card.alt}
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
      sizes={CARD_SIZES}
      className="h-auto w-full shadow-[0_10px_30px_-14px_rgba(23,23,23,0.35)] transition duration-500 ease-soft group-hover:-translate-y-1 group-hover:shadow-[0_20px_40px_-16px_rgba(23,23,23,0.45)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
    />
  );
}
