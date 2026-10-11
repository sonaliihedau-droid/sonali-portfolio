import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment, Suspense, type CSSProperties, type ReactNode } from "react";
import {
  getProject,
  PROJECTS,
  type CutoutGroup,
  type Project,
  type ProjectImage,
  type ProjectSection,
} from "../projects";

// Ink colour for the story text, and for headings unless the project sets its own accent.
const INK = "#463B2B";

export function generateStaticParams() {
  return PROJECTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  return { title: project ? `${project.title} — Sonali` : "Project not found" };
}

// The page shell renders instantly; the project-specific part streams in behind Suspense.
export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <main className="w-full">
      <Suspense fallback={<div className="min-h-svh" />}>
        <ProjectContent params={params} />
      </Suspense>
    </main>
  );
}

async function ProjectContent({ params }: { params: PageProps<"/projects/[slug]">["params"] }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  if (!project.sections) return <Placeholder project={project} />;

  return (
    <article className="pb-24 sm:pb-40">
      <h1 className="sr-only">{project.title}</h1>
      {project.sections.map((section, i) => (
        <Section
          key={i}
          section={section}
          first={i === 0}
          heading={project.accent ?? INK}
          type={TYPE[project.type ?? "hand"]}
          afterFull={["hero", "full"].includes(project.sections?.[i - 1]?.layout ?? "")}
        />
      ))}
    </article>
  );
}

// `width`: the column each image sits in; `gap`: space between the images of one section.
const SECTION_STYLES: Record<
  "hero" | "full" | "inset" | "portrait" | "small",
  { width: string; gap: string; sizes: string; img?: string }
> = {
  hero: { width: "", gap: "", sizes: "100vw", img: "sm:h-svh sm:object-cover" },
  full: { width: "", gap: "", sizes: "100vw" },
  inset: {
    width: "mx-auto w-full max-w-5xl px-4 sm:px-8",
    gap: "gap-16 sm:gap-24",
    sizes: "(min-width: 1088px) 1024px, 100vw",
  },
  portrait: {
    width: "mx-auto w-full max-w-2xl px-4 sm:px-8",
    gap: "gap-16 sm:gap-24",
    sizes: "(min-width: 736px) 672px, 100vw",
  },
  small: {
    width: "mx-auto w-full max-w-sm px-4 sm:px-8",
    gap: "gap-16 sm:gap-24",
    sizes: "(min-width: 384px) 320px, 100vw",
  },
};

// Every heading (section titles and image tags) starts on this one left edge, the edge of the
// widest image column, so they line up down the page whatever the width of the piece below them.
const HEADING_COLUMN = "mx-auto w-full max-w-5xl px-4 sm:px-8";

// A project's type: handwritten headings over the default body font, Manrope throughout with
// semibold headings, or La Belle Aurore script headings over Manrope. `tag` is the label above an
// image; the handwritten one is set at a slight tilt.
const TYPE = {
  hand: {
    title: "font-hand text-5xl sm:text-6xl",
    label: "font-hand text-2xl sm:text-3xl",
    body: "",
    tag: "font-hand text-3xl sm:text-4xl",
    tagTilt: "origin-left -rotate-2",
  },
  display: {
    title: "font-display font-semibold text-3xl sm:text-4xl",
    label: "font-display font-semibold text-lg sm:text-xl",
    body: "font-display",
    tag: "font-display font-semibold text-xl sm:text-2xl",
    tagTilt: "",
  },
  aurore: {
    title: "font-aurore text-4xl sm:text-5xl",
    label: "font-aurore text-2xl sm:text-3xl",
    body: "font-display",
    tag: "font-aurore text-2xl sm:text-3xl",
    tagTilt: "",
  },
};
type Type = (typeof TYPE)[keyof typeof TYPE];

// Paper for a note: fine fractal grain over a warm sheet, a little darker toward the edges.
const PAPER = [
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.27 0 0 0 0 0.16 0 0 0 0.09 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
  "radial-gradient(ellipse at center, transparent 55%, rgba(150, 115, 60, 0.12))",
].join(", ");

function Section({
  section,
  first,
  heading,
  type,
  afterFull,
}: {
  section: ProjectSection;
  first: boolean;
  // Colour of the section title, markers, labels and image tags.
  heading: string;
  type: Type;
  afterFull: boolean;
}) {
  // A bigger breath after a full-bleed run, the regular rhythm between inset pieces.
  // An opening inset section starts below the fixed navbar.
  const bleed = section.layout === "hero" || section.layout === "full";
  const spacing = first
    ? bleed
      ? ""
      : "pt-24 sm:pt-32"
    : afterFull
      ? "mt-24 sm:mt-40"
      : "mt-16 sm:mt-24";

  if (section.layout === "text") {
    return (
      <section className={spacing} style={{ color: INK }}>
        {section.title && (
          <h2 className={`${HEADING_COLUMN} mb-6 sm:mb-8 ${type.title}`} style={{ color: heading }}>
            {section.title}
          </h2>
        )}
        <div
          className={`mx-auto w-full max-w-2xl space-y-5 px-4 text-base leading-relaxed sm:px-8 sm:text-lg sm:leading-relaxed ${type.body}`}
        >
          {section.paragraphs.map((block, i) => (
            <Fragment key={i}>
              {(block.marker || block.label) && (
                <p className={`${type.label} ${i > 0 ? "pt-4" : ""}`} style={{ color: heading }}>
                  {block.marker ? `[${block.marker}]` : block.label}
                </p>
              )}
              {block.text && <p>{block.text}</p>}
              {block.list && (
                <ul className="space-y-2">
                  {block.list.map((item) => (
                    <li key={item} className="flex gap-3">
                      {/* A small dot in the heading colour, level with the first line. */}
                      <span
                        aria-hidden
                        className="mt-[0.7em] size-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: heading }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </Fragment>
          ))}
        </div>
      </section>
    );
  }

  if (section.layout === "note") {
    return (
      <section className={spacing}>
        <div className="mx-auto w-full max-w-2xl px-4 sm:px-8">
          <div
            className="-rotate-1 rounded-[3px] px-7 py-9 shadow-[0_14px_36px_-14px_rgba(70,59,43,0.45)] ring-1 ring-[#463B2B]/10 sm:px-12 sm:py-12"
            style={{ backgroundColor: "#FBF5E6", backgroundImage: PAPER }}
          >
            <h2 className="font-aurore text-4xl sm:text-5xl" style={{ color: heading }}>
              {section.title}
            </h2>
            <p className="mt-5 font-aurore text-xl leading-[1.9] sm:mt-6 sm:text-2xl sm:leading-[1.9]" style={{ color: INK }}>
              {section.text}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (section.layout === "video") {
    return (
      <section className={spacing}>
        <div className={SECTION_STYLES.inset.width}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${section.youtubeId}`}
            title={section.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="block aspect-video h-auto w-full"
          />
        </div>
      </section>
    );
  }

  if (section.layout === "cutouts") {
    return (
      <section className={`${SECTION_STYLES.inset.width} ${spacing}`}>
        <Cutouts groups={section.groups} heading={heading} type={type} />
      </section>
    );
  }

  if (section.layout === "site") {
    return (
      <section className={spacing}>
        <Tagged tag={section.tag} color={heading} type={type}>
          <LiveSite url={section.url} title={section.title} heading={heading} />
        </Tagged>
      </section>
    );
  }

  if (section.layout === "strip") {
    return (
      <section className={spacing}>
        <Strip images={section.images} />
      </section>
    );
  }

  if (section.layout === "story") {
    return (
      <section className={spacing}>
        <Story pages={section.pages} type={type} />
      </section>
    );
  }

  if (section.layout === "embed") {
    return (
      <section className={spacing}>
        <Tagged tag={section.tag} color={heading} type={type}>
          <div className={SECTION_STYLES.inset.width}>
            <iframe
              src={section.url}
              title={section.title}
              loading="lazy"
              allow="autoplay; fullscreen; clipboard-write"
              allowFullScreen
              className="block aspect-[4/3] w-full rounded-xl ring-1 ring-black/10 sm:aspect-video"
            />
          </div>
        </Tagged>
      </section>
    );
  }

  const style = SECTION_STYLES[section.layout];

  return (
    <section className={`flex flex-col ${style.gap} ${spacing}`}>
      {section.images.map((image, i) => (
        <Tagged key={image.src} tag={image.tag} color={heading} type={type}>
          <div className={style.width}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes={style.sizes}
              priority={first && i === 0}
              // The opening run is short enough on phones that all of it shows on the first screen.
              loading={first && i > 0 ? "eager" : undefined}
              className={`block h-auto w-full ${style.img ?? ""}`}
            />
          </div>
        </Tagged>
      ))}
    </section>
  );
}

// An image with a label above it, the label on the shared heading edge.
function Tagged({
  tag,
  color,
  type,
  children,
}: {
  tag: ProjectImage["tag"];
  color: string;
  type: Type;
  children: ReactNode;
}) {
  if (!tag) return children;
  return (
    <figure>
      <figcaption className={`${HEADING_COLUMN} mb-2 sm:mb-3 ${type.tag}`} style={{ color }}>
        <span className={`inline-block ${type.tagTilt}`}>{tag}</span>
      </figcaption>
      {children}
    </figure>
  );
}

// One row of images sharing the width equally, so the whole set shows at once with no scrolling.
// The row runs wider than the text column to give each image more room. On phones, where a row of
// many would be too small to see, they wrap two to a line.
function Strip({ images }: { images: ProjectImage[] }) {
  return (
    <ul className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-2 px-4 sm:grid-flow-col sm:auto-cols-fr sm:grid-cols-none sm:gap-3 sm:px-8">
      {images.map((image) => (
        <li key={image.src}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={`(min-width: 1280px) ${Math.round(1216 / images.length)}px, (min-width: 640px) ${Math.round(100 / images.length)}vw, 50vw`}
            className="h-auto w-full"
          />
        </li>
      ))}
    </ul>
  );
}

// Picture-book pages: each image beside the passage it goes with, swapping sides from page to page.
// Wide spreads take the larger share of the row; a tall page (e.g. a poster) the smaller one.
// On phones the text sits under its image.
function Story({ pages, type }: { pages: { image: ProjectImage; text: string }[]; type: Type }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 sm:gap-24 sm:px-8">
      {pages.map(({ image, text }, i) => {
        const tall = image.height > image.width;
        return (
          <figure key={image.src} className="grid items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-14">
            <div className={`${tall ? "lg:col-span-5" : "lg:col-span-7"} ${i % 2 ? "lg:order-last" : ""}`}>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes={
                  tall
                    ? "(min-width: 1152px) 420px, (min-width: 1024px) 38vw, 100vw"
                    : "(min-width: 1152px) 620px, (min-width: 1024px) 56vw, 100vw"
                }
                className="h-auto w-full"
              />
            </div>
            <figcaption
              className={`max-w-md text-base leading-relaxed sm:text-lg sm:leading-relaxed ${tall ? "lg:col-span-7" : "lg:col-span-5"} ${type.body}`}
              style={{ color: INK }}
            >
              {text}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

// Cut-out heights per group size, smaller on phones. On large screens a group of four lg or md
// cut-outs fits on one line of the panel.
const CUTOUT_HEIGHTS: Record<CutoutGroup["size"], { img: string; sizes: string }> = {
  lg: { img: "h-28 sm:h-32 lg:h-40", sizes: "(min-width: 1024px) 240px, 180px" },
  md: { img: "h-16 sm:h-20 lg:h-28", sizes: "(min-width: 1024px) 200px, 140px" },
  sm: { img: "h-14 sm:h-20 lg:h-24", sizes: "(min-width: 1024px) 160px, 120px" },
};

// Transparent illustrations on a paper-coloured panel, in labelled groups. Each lifts a little on
// hover; a `bob` group also floats gently, staggered so the birds don't move in step.
function Cutouts({ groups, heading, type }: { groups: CutoutGroup[]; heading: string; type: Type }) {
  return (
    <div className="flex flex-col gap-14 rounded-2xl bg-[#F6F0E2] px-5 py-10 sm:gap-20 sm:px-12 sm:py-16">
      {groups.map((group) => (
        <figure key={group.tag}>
          <figcaption className={type.tag} style={{ color: heading }}>
            {group.tag}
          </figcaption>
          <ul className="mt-6 flex flex-wrap items-end justify-center gap-x-6 gap-y-8 sm:mt-10 sm:gap-x-10 lg:gap-x-8">
            {group.images.map((image, i) => (
              <li
                key={image.src}
                className={group.bob ? "animate-bob motion-reduce:animate-none" : undefined}
                style={
                  group.bob
                    ? ({
                        "--duration": `${3.5 + (i % 3) * 0.6}s`,
                        "--delay": `${-i * 0.9}s`,
                        // Every other bird flies a little lower.
                        marginBottom: i % 2 ? 0 : 24,
                      } as CSSProperties)
                    : undefined
                }
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes={CUTOUT_HEIGHTS[group.size].sizes}
                  className={`w-auto transition duration-500 ease-soft hover:-translate-y-2 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:transform-none ${CUTOUT_HEIGHTS[group.size].img}`}
                />
              </li>
            ))}
          </ul>
        </figure>
      ))}
    </div>
  );
}

// A live website in a browser-style frame, loaded only as it nears the screen, with a link to open
// it in its own tab. Taller than wide on phones, so the site stays usable there.
function LiveSite({ url, title, heading }: { url: string; title: string; heading: string }) {
  return (
    <div className={SECTION_STYLES.inset.width}>
      <div className="overflow-hidden rounded-xl bg-white shadow-[0_20px_50px_-24px_rgba(23,23,23,0.45)] ring-1 ring-black/10">
        <div className="flex h-9 items-center gap-1.5 bg-[#F3EEE6] px-4" aria-hidden>
          <span className="size-2.5 rounded-full bg-black/15" />
          <span className="size-2.5 rounded-full bg-black/15" />
          <span className="size-2.5 rounded-full bg-black/15" />
          <span className="mx-auto truncate pr-10 font-display text-xs text-black/50">
            {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </span>
        </div>
        <iframe src={url} title={title} loading="lazy" className="block aspect-[4/5] w-full sm:aspect-[16/10]" />
      </div>
      <div className="mt-8 flex justify-center">
        <a
          href={url}
          target="_blank"
          rel="noopener"
          style={{ "--accent": heading } as CSSProperties}
          className="inline-flex items-center gap-2 rounded-full border-2 border-(--accent) px-6 py-3 font-display font-semibold text-(--accent) transition-colors duration-300 hover:bg-(--accent) hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--accent)"
        >
          Visit the website <span aria-hidden>↗</span>
        </a>
      </div>
    </div>
  );
}

// Shown until a project's own layout is added in projects.ts.
function Placeholder({ project }: { project: Project }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-20 sm:px-8 sm:pt-32">
      <Link
        href="/#projects"
        className="font-display text-sm font-bold text-[#5A83BB] transition-opacity hover:opacity-60"
      >
        ← Projects
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold text-[#5A83BB] sm:text-4xl">
        {project.title}
      </h1>
      <Image
        src={project.cover}
        alt={project.title}
        width={project.width}
        height={project.height}
        sizes="(min-width: 1152px) 1088px, 100vw"
        priority
        className="mt-8 h-auto w-full rounded-lg sm:mt-12"
      />
    </div>
  );
}
