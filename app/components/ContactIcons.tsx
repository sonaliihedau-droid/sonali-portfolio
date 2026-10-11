import Image from "next/image";
import { CONTACT_LINKS } from "./contactLinks";

// A row of Sonali's contact icons; each lifts and tips a little on hover. `className` places and
// spaces the row, `iconClassName` sizes the icons.
export default function ContactIcons({ className = "", iconClassName }: { className?: string; iconClassName: string }) {
  return (
    <ul className={`flex ${className}`}>
      {CONTACT_LINKS.map(({ href, icon, alt, external, download }, i) => (
        <li key={href}>
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            {...(download ? { download } : {})}
            className="group block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5A83BB]"
          >
            <Image
              src={icon}
              alt={alt}
              width={72}
              height={72}
              className={`transition duration-500 ease-soft group-hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 ${
                i % 2 ? "group-hover:rotate-6" : "group-hover:-rotate-6"
              } ${iconClassName}`}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
