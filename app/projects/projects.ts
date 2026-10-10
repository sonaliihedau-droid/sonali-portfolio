// `tag`: a handwritten label shown above the image, e.g. "Initial sketch".
export type ProjectImage = { src: string; width: number; height: number; alt: string; tag?: string };

// "hero": fills the whole window on desktop (cropped to fit), full width on phones.
// "full": edge to edge, images joined with no gap so they read as one continuous artwork.
// "inset": centred and narrower than the window, with space around it.
// "portrait": a narrower inset for tall pages, so they don't run several screens long.
// "text": a titled run of paragraphs, such as a synopsis or script. `marker` labels a paragraph,
// e.g. "Past", where the story moves in time.
export type ProjectSection =
  | { layout: "hero" | "full" | "inset" | "portrait"; images: ProjectImage[] }
  | { layout: "text"; title: string; paragraphs: { marker?: string; text: string }[] };

// A decorative frame for a project's cover on the home page; the cover is placed in its window.
// `window` is the empty area in the frame image, in the frame's own pixels.
export type CoverFrame = {
  src: string;
  width: number;
  height: number;
  window: { x: number; y: number; width: number; height: number };
};

export type Project = {
  slug: string;
  title: string;
  cover: string;
  width: number;
  height: number;
  coverFrame?: CoverFrame;
  sections?: ProjectSection[];
};

// Each project's images live in public/<folder>/; image1.png is its cover on the Projects page.
export const PROJECTS: Project[] = [
  {
    slug: "aangan",
    title: "Aangan",
    cover: "/aangan/image1.png",
    width: 1920,
    height: 1080,
    sections: [
      {
        layout: "hero",
        images: [
          {
            src: "/aangan/image1.png",
            width: 1920,
            height: 1080,
            alt: "Aangan title card: a sunlit courtyard with a charpai under a tree and an iron gate, with the title आंगण in mustard brush lettering",
          },
        ],
      },
      {
        layout: "text",
        title: "Synopsis",
        paragraphs: [
          {
            text: "A young woman sitting in her quiet courtyard is reminded of her grandmother when sunlight reflects off her bangles. The memory takes her back to a tender childhood moment filled with love and everyday rituals. As the memories fade, she is left alone in the empty aangan, feeling the quiet absence of her grandmother.",
          },
        ],
      },
      {
        layout: "inset",
        images: [
          {
            src: "/aangan/image2.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard: kitchen and tea boiling, pouring the tea, walking outside to the courtyard, sitting on the charpai, a reflection on a bangle, a swirling transition to the past and a dragonfly flying in the aangan",
            tag: "Storyboard",
          },
        ],
      },
      {
        layout: "text",
        title: "Script",
        paragraphs: [
          {
            marker: "Present",
            text: "The sound of the stove slowly faded as the tea turned a deep amber color. The girl poured the hot tea into a cup, the warmth spreading into her hands. She stepped outside and sat on the old woven charpai. The afternoon sun was bright and the courtyard was silent.",
          },
          {
            text: "As she lifted the cup, sunlight hit the bangles on her wrist. They shone and threw small reflections onto the dusty ground. She watched the light move, a soft, familiar smile on her face. The sparkle reminded her of something.",
          },
          {
            marker: "Past",
            text: "A dragonfly buzzed nearby. Under the shade of the large neem tree, her grandmother was resting on the charpai. Her cotton sari moved gently in the breeze. The six-year-old girl sat beside her with her legs folded, staring at her grandmother’s wrist. The green glass bangles shone brightly in the sunlight. They looked like jewels to the little girl.",
          },
          {
            text: "Unable to stop herself, she reached out. Her small fingers tried hard to slide one bangle off her grandmother’s loose, wrinkled hand. Her tongue stuck out as she concentrated.",
          },
          { text: "Clink. The soft sound of glass broke the silence. The girl froze in fear." },
          {
            text: "Her grandmother opened one eye. She did not scold her. She picked up the bangle, wiped it on her sari, and slipped it onto the girl’s arm. It was too big and slid all the way to her elbow. Her grandmother smiled and placed a finger on her lips. “Shhh.” The girl laughed quietly.",
          },
          {
            marker: "Present",
            text: "The girl’s face stayed calm, her eyes gentle as she looked into the empty space in front of her. The courtyard filled with memories.",
          },
          {
            text: "For a moment, she did not see the dry ground. She saw grandmother and her spreading white sheets out with spicy mango pickles drying in the sun. She saw they are water splashing from a bucket as they watered the plants. She saw herself sitting on the floor between her grandmother’s knees, the strong smell of coconut oil in the heat while wrinkled hands rubbed her hair and told her stories.",
          },
          {
            text: "Slowly, the memories faded. The colors drained away until only the harsh sunlight remained. A lump rose in her throat. She looked at the tea in her hands. It was no longer warm. She could not drink it.",
          },
          {
            text: "Her hand shook as she placed the cup on the edge of the charpai. She turned and walked away.",
          },
          {
            text: "There was no movement. No grandmother. No laughter. Only the wide, sunlit Aangan, completely empty.",
          },
        ],
      },
      {
        layout: "inset",
        images: [
          {
            src: "/aangan/image3.png",
            width: 1920,
            height: 1080,
            alt: "Pencil sketch of the courtyard: gate, trees, potted plants, a bench, a birdcage and a charpai in the foreground",
          },
          {
            src: "/aangan/image4.png",
            width: 1920,
            height: 1080,
            alt: "Line drawing of a kitchen with carved cabinet doors, open shelves, a diamond-tiled backsplash and a gas stove",
            tag: "Background · kitchen",
          },
          {
            src: "/aangan/image5.png",
            width: 1920,
            height: 1080,
            alt: "Clean line drawing of the courtyard layout with the charpai, iron gate, lamp post and potted plants",
            tag: "Background · courtyard",
          },
          {
            src: "/aangan/image6.png",
            width: 1920,
            height: 1080,
            alt: "Colour studies: a tree stump, two terracotta pots of herbs, a leafy bush and a young tree",
            tag: "Colour studies",
          },
          {
            src: "/aangan/image8.png",
            width: 1920,
            height: 1080,
            alt: "The final coloured courtyard: dappled shade, a charpai with a pillow, the iron gate and terracotta pots",
            tag: "Final background",
          },
        ],
      },
      {
        layout: "portrait",
        images: [
          {
            src: "/aangan/image9.png",
            width: 1920,
            height: 1743,
            alt: "Title lettering explorations of आंगण in charcoal, leading to the final mustard brush version",
            tag: "Title lettering",
          },
          {
            src: "/aangan/image10.png",
            width: 2480,
            height: 3508,
            alt: "Film poster: आंगण (Courtyard), a grandmother braiding a girl's hair on a rug in the courtyard. A short film by Sonali Hedau, guided by Saurabh Vyas",
            tag: "Resulting poster",
          },
        ],
      },
    ],
  },
  {
    slug: "kai",
    title: "Kai",
    cover: "/kai/image1.png",
    width: 2486,
    height: 1423,
    coverFrame: {
      src: "/kai/frame-kai.jpeg",
      width: 1350,
      height: 1080,
      window: { x: 183, y: 245, width: 971, height: 652 },
    },
    sections: [
      {
        layout: "full",
        images: [
          {
            src: "/kai/image2.png",
            width: 1920,
            height: 1080,
            alt: "A bare branch with a yellow swing and a small blue bird",
          },
          {
            src: "/kai/image3.png",
            width: 1920,
            height: 1080,
            alt: "A girl reads against a tree beside a teal pond; the title Kai floats underwater",
          },
          {
            src: "/kai/image4.png",
            width: 1920,
            height: 1080,
            alt: "Brief: to create your own graphic novel that tells a fiction or non-fiction story in any genre, following the principle of sequential art. This is the story of Kai, a tiny glow who opens its eyes underwater and discovers a bright, colorful world. I wanted to show how even the smallest light can make the whole ocean feel alive. Below, a strip of pencil storyboard frames.",
          },
          {
            src: "/kai/image5.png",
            width: 1920,
            height: 1080,
            alt: "Title explorations for Kai in glowing yellow and teal pencil, with the colour palette: dark teal, light teal, olive green, berry and mustard",
          },
        ],
      },
      {
        layout: "inset",
        images: [
          {
            src: "/kai/image6.png",
            width: 1920,
            height: 1080,
            alt: "Sketchbook page: title design, layout thumbnails, sea study and aquatic life studies",
          },
          {
            src: "/kai/image7.png",
            width: 4096,
            height: 2897,
            alt: "Underwater spread: sun rays fall on a glowing Kai among coral, a pink starfish and swirling sea plants",
          },
        ],
      },
      {
        layout: "portrait",
        images: [
          {
            src: "/kai/image8.png",
            width: 2480,
            height: 3508,
            alt: "Book cover: Kai, written and illustrated by Sonali Hedau, glowing beneath lily pads in a teal sea",
          },
        ],
      },
    ],
  },
  // Images live in public/raw/; the URL uses the full project name.
  {
    slug: "raw-mango",
    title: "Raw Mango",
    cover: "/raw/image1.png",
    width: 1920,
    height: 1080,
    sections: [
      {
        layout: "inset",
        images: [
          {
            src: "/raw/image1.png",
            width: 1920,
            height: 1080,
            alt: "Raw Mango title card: green lettering on black with fine red-brown floral linework",
          },
          {
            src: "/raw/image2.png",
            width: 1920,
            height: 1080,
            alt: "Brief: create a 30-second experimental advertisement film that communicates a brand's identity through visually engaging motion. The film focuses on a small traditional motif that morphs and transforms, symbolizing the blend of heritage and contemporary design. Through fluid animation, texture and rhythm, the film aims to evoke the essence of craftsmanship and culture while maintaining clarity for the audience.",
          },
          {
            src: "/raw/image3.png",
            width: 1920,
            height: 1080,
            alt: "Moodboard: pomegranates, embroidered saris, a kohl-lined gaze with a red bindi, pomegranate motif sketches and a palette of deep red, bottle green, near-black and blush",
          },
          {
            src: "/raw/image4.png",
            width: 1920,
            height: 1422,
            alt: "Motifs study: hand-drawn lotus, pomegranate, leaf, peacock and parrot motifs in mustard, brown, green and purple",
          },
        ],
      },
    ],
  },
  {
    slug: "visual",
    title: "Visual",
    cover: "/visual/image1.png",
    width: 1920,
    height: 1080,
    sections: [
      {
        layout: "inset",
        images: [
          {
            src: "/visual/image1.png",
            width: 1920,
            height: 1080,
            alt: "A sepia sketch of a small stone house glowing with warm light in a dark forest",
          },
          {
            src: "/visual/image2.png",
            width: 1920,
            height: 1080,
            alt: "Brief: this assignment explores the technical workflow of visual storytelling, from story development and script writing to breaking the script into shots and a storyboard. Bright Lies. Tagline: “Bounded by Shadow, Freed by Light”. Synopsis: after saving an injured “fairy” named Lila, Aditi grows weak and discovers the creature is actually a vampire feeding on her. Betrayed, Aditi traps the parasite in a mirrored jar and vows to hunt down others of its kind. Beside it, a screenplay page and a pencil sketch of Aditi",
          },
          {
            src: "/visual/image3.png",
            width: 1920,
            height: 1080,
            alt: "Lyla reference: pencil studies of the fairy kneeling by a tree, two close-ups of her face and a full-length pose",
          },
          {
            src: "/visual/image4.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard: a forest of twisted trees and hanging vines",
          },
          {
            src: "/visual/image5.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard: a forest path between tree trunks and tall grass",
          },
          {
            src: "/visual/image6.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard: close-up of bare feet walking along the forest path",
          },
          {
            src: "/visual/image7.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard: Aditi walks into the dark forest holding a glowing lantern",
          },
          {
            src: "/visual/image8.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard: close-up of the swinging lantern lighting up the trees",
          },
          {
            src: "/visual/image9.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard: Aditi raises the lantern, looking worried",
          },
          {
            src: "/visual/image10.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard: lantern light falls on a clearing beneath a large mushroom",
          },
          {
            src: "/visual/image11.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard: the tiny fairy lies curled up asleep in Aditi's palm",
          },
          {
            src: "/visual/image12.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard: the injured fairy crouches alone on the ground, wings folded",
          },
          {
            src: "/visual/image13.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard: Aditi kneels beside the lantern, peering into the grass",
          },
        ],
      },
    ],
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
