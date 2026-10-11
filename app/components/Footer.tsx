import Image from "next/image";

const EMAIL = "sonaliihedau@gmail.com";

// Where the email is painted into footer.png (3200×410), as shares of the image, so the link
// stays over it at every size.
const EMAIL_AREA = { left: "63.9%", top: "50%", width: "10.5%", height: "11.5%" };

// The pond painting along the bottom of every page. Its top fades into the page; on phones the
// strip is kept tall enough to read, with the painted email centred and the sides cropped.
export default function Footer() {
  return (
    <footer className="mt-auto w-full overflow-hidden">
      <div className="relative left-1/2 aspect-[3200/410] w-full -translate-x-1/2 max-sm:w-[860px] max-sm:-translate-x-[69%]">
        <Image
          src="/footer.png"
          alt=""
          fill
          sizes="(max-width: 639px) 860px, 100vw"
          className="object-cover [mask-image:linear-gradient(to_bottom,transparent,black_35%)]"
        />
        <a
          href={`mailto:${EMAIL}`}
          aria-label={`Email Sonali: ${EMAIL}`}
          className="absolute rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#463B2B]"
          style={EMAIL_AREA}
        />
      </div>
    </footer>
  );
}
