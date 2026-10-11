// Each way to reach Sonali, drawn as a small hand-painted icon (72×72), shared by the About screen
// and the Contact section. The icons stand alone on the page; `alt` names each link for screen
// readers. `external` opens in a new tab; `download` saves the file under that name.
export type ContactLink = {
  href: string;
  icon: string;
  alt: string;
  external?: true;
  download?: string;
};

export const CONTACT_LINKS: ContactLink[] = [
  { href: "mailto:sonaliihedau@gmail.com", icon: "/contact/a.png", alt: "Email Sonali" },
  { href: "https://www.behance.net/sonaliihedau", icon: "/contact/b.png", alt: "Sonali on Behance", external: true },
  {
    href: "https://www.linkedin.com/in/sonali-hedau/",
    icon: "/contact/c.png",
    alt: "Sonali on LinkedIn",
    external: true,
  },
  {
    href: "/resume.pdf",
    icon: "/contact/d.png",
    alt: "Download Sonali's résumé",
    download: "Sonali-Hedau-Resume.pdf",
  },
];
