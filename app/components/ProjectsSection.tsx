import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "../projects/projects";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="mx-auto w-full max-w-6xl px-4 pt-24 pb-20 sm:px-8 sm:pt-32"
    >
      <h2 id="projects-title" className="font-display text-3xl font-bold text-[#5A83BB] sm:text-4xl">
        Projects
      </h2>

      <ul className="mt-8 grid gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8">
        {PROJECTS.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="group block overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5A83BB]"
            >
              <Image
                src={project.cover}
                alt={project.title}
                width={project.width}
                height={project.height}
                sizes="(min-width: 1152px) 560px, (min-width: 640px) 50vw, 100vw"
                className="aspect-video w-full object-cover transition-transform duration-500 ease-soft group-hover:scale-103"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
