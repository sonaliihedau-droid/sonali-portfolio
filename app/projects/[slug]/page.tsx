import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProject, PROJECTS, type Project, type ProjectSection } from "../projects";

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

const SECTION_STYLES = {
  hero: { box: "flex flex-col", sizes: "100vw", img: "sm:h-svh sm:object-cover" },
  full: { box: "flex flex-col", sizes: "100vw" },
  inset: {
    box: "mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 sm:gap-24 sm:px-8",
    sizes: "(min-width: 1088px) 1024px, 100vw",
  },
  portrait: {
    box: "mx-auto flex w-full max-w-2xl flex-col gap-16 px-4 sm:gap-24 sm:px-8",
    sizes: "(min-width: 736px) 672px, 100vw",
  },
};

function Section({
  section,
  first,
  afterFull,
}: {
  section: ProjectSection;
  first: boolean;
  afterFull: boolean;
}) {
  const style: { box: string; sizes: string; img?: string } = SECTION_STYLES[section.layout];
  const { box, sizes } = style;
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

  return (
    <section className={`${box} ${spacing}`}>
      {section.images.map((image, i) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={first && i === 0}
          // The opening run is short enough on phones that all of it shows on the first screen.
          loading={first && i > 0 ? "eager" : undefined}
          className={`block h-auto w-full ${style.img ?? ""}`}
        />
      ))}
    </section>
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
