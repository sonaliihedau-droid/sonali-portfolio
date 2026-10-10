import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment, Suspense, type ReactNode } from "react";
import {
  getProject,
  PROJECTS,
  type Project,
  type ProjectImage,
  type ProjectSection,
} from "../projects";

// Ink colour for the handwritten tags and the story text.
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
          afterFull={["hero", "full"].includes(project.sections?.[i - 1]?.layout ?? "")}
        />
      ))}
    </article>
  );
}

// `width`: the column each image sits in; `gap`: space between the images of one section.
const SECTION_STYLES: Record<
  "hero" | "full" | "inset" | "portrait",
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
};

// Every heading (section titles and image tags) starts on this one left edge, the edge of the
// widest image column, so they line up down the page whatever the width of the piece below them.
const HEADING_COLUMN = "mx-auto w-full max-w-5xl px-4 sm:px-8";

function Section({
  section,
  first,
  afterFull,
}: {
  section: ProjectSection;
  first: boolean;
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
        <h2 className={`${HEADING_COLUMN} font-hand text-5xl sm:text-6xl`}>{section.title}</h2>
        <div className="mx-auto mt-6 w-full max-w-2xl space-y-5 px-4 text-base leading-relaxed sm:mt-8 sm:px-8 sm:text-lg sm:leading-relaxed">
          {section.paragraphs.map((paragraph, i) => (
            <Fragment key={i}>
              {paragraph.marker && (
                <p className={`font-hand text-2xl sm:text-3xl ${i > 0 ? "pt-4" : ""}`}>[{paragraph.marker}]</p>
              )}
              <p>{paragraph.text}</p>
            </Fragment>
          ))}
        </div>
      </section>
    );
  }

  const style = SECTION_STYLES[section.layout];

  return (
    <section className={`flex flex-col ${style.gap} ${spacing}`}>
      {section.images.map((image, i) => (
        <Tagged key={image.src} tag={image.tag}>
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

// An image with a handwritten label above it, the label on the shared heading edge.
function Tagged({ tag, children }: { tag: ProjectImage["tag"]; children: ReactNode }) {
  if (!tag) return children;
  return (
    <figure>
      <figcaption
        className={`${HEADING_COLUMN} mb-2 font-hand text-3xl sm:mb-3 sm:text-4xl`}
        style={{ color: INK }}
      >
        <span className="inline-block origin-left -rotate-2">{tag}</span>
      </figcaption>
      {children}
    </figure>
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
