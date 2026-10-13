// `tag`: a handwritten label shown above the image, e.g. "Initial sketch".
// `caption`: a line of text under the image, e.g. the line of script a storyboard frame shows.
export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  tag?: string;
  caption?: string;
};

// "hero": fills the whole window on desktop (cropped to fit), full width on phones.
// "full": edge to edge, images joined with no gap so they read as one continuous artwork.
// "inset": centred and narrower than the window, with space around it.
// "portrait": a narrower inset for tall pages, so they don't run several screens long.
// "small": a narrow column for small images, so they're never enlarged past their own size.
// "text": a run of paragraphs, such as a synopsis or script. Without a title it continues the text
// before it, e.g. after an image that interrupts a story.
// "video": a YouTube film, embedded in the inset column. `youtubeId` is the id from the link.
// "cutouts": groups of transparent illustrations laid out on a paper-coloured panel.
// "site": a live website, embedded in a browser-style frame with a link to open it.
// "strip": one row of images sharing the width equally, all visible at once.
// "story": picture-book pages, each image beside the text it goes with, alternating sides.
// "embed": an interactive viewer from another service (e.g. a flipbook), framed full width.
export type ProjectSection =
  | { layout: "hero" | "full" | "inset" | "portrait" | "small"; images: ProjectImage[] }
  | { layout: "text"; title?: string; paragraphs: TextBlock[] }
  | { layout: "video"; youtubeId: string; title: string }
  | { layout: "cutouts"; groups: CutoutGroup[] }
  | { layout: "site"; url: string; title: string; tag?: string }
  | { layout: "strip"; images: ProjectImage[] }
  | { layout: "story"; pages: { image: ProjectImage; text: string }[] }
  | { layout: "embed"; url: string; title: string; tag?: string }
  | { layout: "note"; title: string; text: string };

// `size` sets the cut-outs' height. `bob`: each one floats gently up and down, as if in flight.
export type CutoutGroup = {
  tag: string;
  size: "lg" | "md" | "sm";
  bob?: true;
  images: ProjectImage[];
};

// One block of a text section: a paragraph, a bulleted list, or both. `marker` flags a block, e.g.
// "Past", where the story moves in time; `label` heads a point, e.g. "Aesthetic" or "Early Idea".
export type TextBlock = { marker?: string; label?: string; text?: string; list?: string[] };

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
  // Colour of the project page's headings (section titles, labels and image tags); defaults to ink.
  accent?: string;
  // Fonts of the project page. "hand" (default): handwritten headings. "display": Manrope throughout,
  // with semibold headings. "aurore": La Belle Aurore script headings over Manrope text.
  type?: "hand" | "display" | "aurore";
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
            src: "/aangan/image3.png",
            width: 1920,
            height: 1080,
            alt: "Pencil sketch of the courtyard: gate, trees, potted plants, a bench, a birdcage and a charpai in the foreground",
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
            src: "/aangan/image2.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard: kitchen and tea boiling, pouring the tea, walking outside to the courtyard, sitting on the charpai, a reflection on a bangle, a swirling transition to the past and a dragonfly flying in the aangan",
            tag: "Storyboard",
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
        ],
      },
      {
        layout: "text",
        title: "Story Idea",
        paragraphs: [
          {
            text: "In the quiet ocean, a small Kai opened its eyes for the first time. It watched silver fish swim past, their scales shining as they touched its light. Curious, the glow reached out. A shell lit up, seaweed turned golden, and tiny fish left sparkling trails as they swam by. This made Kai happy and brave. Soon it began to play tickling fish tails, swirling around jellyfish, and poking at crabs that waved their claws in surprise. The sea looked like a festival, with glowing bubbles, bright trails, and plankton shining like stars. Kai laughed as it played, but in its excitement, a soft tangle of seaweed wrapped around it and held it tight. While it wriggled and flickered, one of the same fish swam past, and the glow thought with a smile, “oh no, I forgot to tease her.”",
          },
        ],
      },
      // The finished book, spread by spread, in one row.
      {
        layout: "strip",
        images: [
          { src: "/kai/image7.png", width: 4096, height: 2897, alt: "Underwater spread: sun rays fall on a newborn glow among coral, a pink starfish and swirling sea plants" },
          { src: "/kai/image9.png", width: 4096, height: 2897, alt: "Comic spread: Kai opens its eyes for the first time while silver and pink fish swim past its light" },
          { src: "/kai/image10.png", width: 4096, height: 2897, alt: "Kai gazes out at a swirl of water, little fish and glowing lily pads as the sea fills with colour" },
          { src: "/kai/image11.png", width: 4096, height: 2897, alt: "Comic spread: Kai pokes a crab, swirls around a jellyfish and twirls past a starfish, leaving trails of light" },
          { src: "/kai/image12.png", width: 4096, height: 2897, alt: "Kai sits on a big rock among dark seaweed while sparkling schools of fish stream overhead" },
          { src: "/kai/image13.png", width: 4096, height: 2897, alt: "Kai, caught in tall seaweed, looks up as a pink fish swims by" },
        ],
      },
      {
        layout: "story",
        pages: [
          {
            image: {
              src: "/kai/image8.png",
              width: 2480,
              height: 3508,
              alt: "Book cover: Kai, written and illustrated by Sonali Hedau, glowing beneath lily pads in a teal sea",
            },
            text: "This is the story of Kai, a tiny glow who opens its eyes underwater and discovers a bright, colorful world. I wanted to show how even the smallest light can make the whole ocean feel alive.",
          },
        ],
      },
      {
        layout: "embed",
        url: "https://heyzine.com/flip-book/9e2ebd70ab.html",
        title: "Kai, the graphic novel as a flipbook",
        tag: "Flip through the book",
      },
    ],
  },
  // Images live in public/illustration/; the page has no text of its own, only the artwork.
  {
    slug: "concept-art",
    title: "Concept Art",
    cover: "/illustration/image3.png",
    width: 1920,
    height: 1080,
    sections: [
      {
        layout: "full",
        images: [
          {
            src: "/illustration/image1.png",
            width: 1920,
            height: 1080,
            alt: "I developed these concepts through drawing and experimentation, building characters and environments together. Using color, mood, and lighting, I created a consistent visual world. Colour palette: #033045, #2A7281, #94D0D0, #EED237, #074143",
          },
          {
            src: "/illustration/image2.png",
            width: 1920,
            height: 1080,
            alt: "The concept art shown small at the centre of the page: a deep teal sea curling into great spiral waves around a glowing yellow creature",
          },
          {
            src: "/illustration/image3.png",
            width: 1920,
            height: 1080,
            alt: "Concept art: a deep teal underwater world curling into great spiral waves, with a shoal of fish, swaying plants and a small glowing yellow creature",
          },
        ],
      },
    ],
  },
  // Images live in public/raw/; the URL uses the full project name.
  {
    slug: "raw-mango",
    title: "Raw Mango",
    cover: "/raw/image1-new.png",
    width: 1920,
    height: 1080,
    // Raw Mango's bottle green.
    accent: "#15643E",
    type: "display",
    sections: [
      {
        layout: "inset",
        images: [
          {
            src: "/raw/image1-new.png",
            width: 1920,
            height: 1080,
            alt: "Raw Mango title card: रॉ मैंगो in green Devanagari lettering on cream paper patterned with faded floral block prints, with red-brown flower vines curling in from the corners",
          },
        ],
      },
      {
        layout: "video",
        youtubeId: "_1KhC6nAQ7c",
        title: "Raw Mango – an experimental motion study",
      },
      {
        layout: "text",
        title: "What is the Brand about?",
        paragraphs: [
          {
            text: "Raw Mango is an Indian textile and clothing brand founded by designer Sanjay Garg. It is known for reinterpreting traditional handloom techniques through a contemporary design language.",
          },
          {
            text: "Working closely with craftspeople across Chanderi, Varanasi, West Bengal, and Rajasthan, the brand creates saris, garments, and textiles that blend heritage, craftsmanship, and modern aesthetics.",
          },
          {
            text: "Raw Mango places strong emphasis on color, motifs, and cultural narratives, offering designs that are rooted in Indian philosophy yet refreshed for today’s world.",
          },
          {
            text: "The brand stands for authenticity, craft preservation, and a refined visual identity that celebrates the beauty of handmade textiles.",
          },
        ],
      },
      {
        layout: "text",
        title: "Brand Analysis",
        paragraphs: [
          {
            label: "Aesthetic",
            list: [
              "Rich, mature colors",
              "Bold motifs",
              "Minimal yet expressive visuals",
              "Indian-rooted but contemporary",
              "Handcrafted textures",
              "Cultural identity",
            ],
          },
          {
            label: "Brand Values",
            list: [
              "Craft preservation",
              "Design rooted in culture",
              "Modern reinterpretation of tradition",
              "Handmade processes",
              "Minimal luxury",
            ],
          },
        ],
      },
      {
        layout: "inset",
        images: [
          {
            src: "/raw/image3.png",
            width: 1920,
            height: 1080,
            alt: "Moodboard: pomegranates, embroidered saris, a kohl-lined gaze with a red bindi, pomegranate motif sketches and a palette of deep red, bottle green, near-black and blush",
          },
        ],
      },
      {
        layout: "text",
        title: "Why I chose Raw Mango!",
        paragraphs: [
          {
            list: [
              "The brand’s design language aligns with mixed media & hand-drawn textures",
              "Its motifs and forms inspire surreal visual transitions",
              "Raw Mango’s identity balances tradition + modernity, which matches my animation style",
              "The brand’s minimal and artistic visuals blend perfectly with magical realism",
              "I wanted to work with a brand that values craft, narrative, and identity",
            ],
          },
        ],
      },
      {
        layout: "inset",
        images: [
          {
            src: "/raw/image4.png",
            width: 1920,
            height: 1422,
            alt: "Motifs study: hand-drawn lotus, pomegranate, leaf, peacock and parrot motifs in mustard, brown, green and purple",
          },
        ],
      },
      {
        layout: "text",
        title: "Idea Development",
        paragraphs: [
          {
            label: "Early Idea",
            text: "I wanted to explore transformation and how motifs, human forms, objects, and threads can evolve into each other in a seamless flow of magical realism.",
          },
          {
            label: "Reason",
            text: "Raw Mango’s motifs and textiles evolve from handcraft, culture, and imagination. My animation mirrors that evolution.",
          },
          {
            text: "The animation follows a continuous line of transformation. A shell becomes a human, a human becomes an eye, motifs awaken and stretch into threads, threads become a hand, the hand becomes a boat, water becomes hair, and identity re-emerges. Through magical realism, the film visualizes Raw Mango’s design philosophy: craft, memory, and evolution.",
          },
        ],
      },
      {
        layout: "inset",
        images: [
          {
            src: "/raw/image5.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard, part one: a dotted cross opens into a diamond motif, petals sprout into a flower and a bird, two birds meet, and an arch of flowers zooms out into an ornate frame",
            tag: "Storyboard",
          },
          {
            src: "/raw/image6.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard, part two: the frame closes in on a single flower, swirling lines carry a small bird across the page, and the sequence ends on the raw mango logo",
          },
        ],
      },
      {
        layout: "inset",
        images: [
          {
            src: "/raw/rough.gif",
            width: 1920,
            height: 1080,
            alt: "Rough animation: a dotted cross drawn in red-brown crayon on cream paper, the opening of the storyboard sequence",
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
        ],
      },
      {
        layout: "note",
        title: "Synopsis",
        text: "Aditi saves an injured fairy, Lila, and cares for her, but soon becomes weak, troubled by strange dreams and marks on her wrist. One night, she discovers Lila’s secret: she is a vampire feeding on her blood, hiding behind a fairy’s glow. Heartbroken, Aditi traps Lila in a mirrored jar, draining her power. As morning comes, Aditi decides to find the truth about the magic and protect others from the hidden danger.",
      },
      {
        layout: "inset",
        images: [
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
        ],
      },
      // The storyboard: each frame with the line of script it shows.
      {
        layout: "inset",
        images: [
          {
            src: "/visual/image4.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard: a forest of twisted trees and hanging vines",
            caption: "In the forest, towering trees block most of the light, their thick branches twisting together to form a dark canopy.",
          },
          {
            src: "/visual/image5.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard: a forest path between tree trunks and tall grass",
            caption: "In the forest, towering trees block most of the light, their thick branches twisting together to form a dark canopy.",
          },
          {
            src: "/visual/image6.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard: close-up of bare feet walking along the forest path",
            caption: "Aditi walks carefully, crunching over fallen leaves.",
          },
          {
            src: "/visual/image7.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard: Aditi walks into the dark forest holding a glowing lantern",
            caption: "Aditi walks carefully, crunching over fallen leaves.",
          },
          {
            src: "/visual/image8.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard: close-up of the swinging lantern lighting up the trees",
            caption: "She holds a lantern in one hand, its dim light barely piercing the heavy darkness.",
          },
          {
            src: "/visual/image9.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard: Aditi raises the lantern, looking worried",
            caption: "She holds a lantern in one hand, its dim light barely piercing the heavy darkness.",
          },
          {
            src: "/visual/image10.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard: lantern light falls on a clearing beneath a large mushroom",
            caption: "Revealing something small and pale at the base of a tree.",
          },
          {
            src: "/visual/image11.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard: the tiny fairy lies curled up asleep in Aditi's palm",
            caption: "Revealing something small and pale at the base of a tree.",
          },
          {
            src: "/visual/image12.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard: the injured fairy crouches alone on the ground, wings folded",
            caption: "Revealing something small and pale at the base of a tree.",
          },
          {
            src: "/visual/image13.png",
            width: 1920,
            height: 1080,
            alt: "Storyboard: Aditi kneels beside the lantern, peering into the grass",
            caption: "Aditi kneels, her hands trembling as she gently wraps the creature in her scarf.",
          },
        ],
      },
    ],
  },
  // An interactive website; its illustrations and assets live in public/interactive/.
  {
    slug: "keoladeo",
    title: "Birds of Keoladeo",
    cover: "/interactive/illustration.jpeg",
    width: 1600,
    height: 900,
    // The lotus mauve of the Keoladeo National Park logo.
    accent: "#8E4B78",
    type: "aurore",
    sections: [
      {
        layout: "full",
        images: [
          {
            src: "/interactive/illustration.jpeg",
            width: 1600,
            height: 900,
            alt: "A painted wetland at Keoladeo: a still lake with lily pads under soft clouds and low hills, a tree on the bank and a pink heron wading",
          },
        ],
      },
      {
        layout: "text",
        title: "The Project",
        paragraphs: [
          {
            text: "For the website project, I am exploring the birds of Keoladeo National Park, Rajasthan, focusing on both regional and migratory birds. The website will introduce visitors to the different bird species found in the park, their habitats, behaviours, and migration patterns. Through illustrations, information, and interactive visuals, the project aims to make learning about these birds simple, engaging, and visually immersive, while also highlighting the importance of Keoladeo’s wetland ecosystem.",
          },
        ],
      },
      {
        layout: "text",
        title: "Ideation",
        paragraphs: [
          {
            label: "Monsoon | The Wetland",
            text: "The monsoon brings rain to Keoladeo, filling the wetlands with water. The landscape turns green and food becomes abundant. Resident birds such as Painted Storks, Herons, Egrets and Ibises begin breeding making the wetland full of nests, chicks and activity.",
          },
        ],
      },
      {
        layout: "full",
        images: [
          {
            src: "/interactive/summer.png",
            width: 4055,
            height: 1080,
            alt: "The wetland in the monsoon: green banks and grass around clear water, a lone tree on a small island, white clouds over the hills",
          },
        ],
      },
      {
        layout: "text",
        paragraphs: [
          {
            label: "Migration | The Journey",
            text: "As the monsoon ends and winter approaches, birds from colder regions begin their long journey south. Following the Central Asian Flyway, they travel across countries and continents in search of warmer weather, food and safe wetlands. Their journey eventually brings them to Rajasthan.",
          },
          {
            label: "Keoladeo | The Winter",
            text: "During winter, Keoladeo becomes a temporary home for thousands of migratory birds. Bar-headed Geese, Greylag Geese, Northern Pintails, Gadwalls, Wigeons, pelicans and many other birds gather in its wetlands to feed, rest and survive the cold months.",
          },
        ],
      },
      {
        layout: "full",
        images: [
          {
            src: "/interactive/winter.png",
            width: 4055,
            height: 1080,
            alt: "The same wetland in winter: dry khaki grass, pale water and a hazy pink sky over the hills",
          },
        ],
      },
      {
        layout: "cutouts",
        groups: [
          {
            tag: "Resident birds",
            size: "lg",
            images: [
              { src: "/interactive/L1.png", width: 1828, height: 2143, alt: "A grey heron standing tall, its crest feathers trailing" },
              { src: "/interactive/L2.png", width: 1724, height: 1246, alt: "A painted stork with pink and black wings, bending its long yellow bill down" },
              { src: "/interactive/L3.png", width: 1873, height: 1276, alt: "A white stork with a curved yellow bill and red legs, wading" },
              { src: "/interactive/L4.png", width: 1614, height: 1583, alt: "A white spoonbill with a wispy crest and a long black spoon-shaped bill" },
            ],
          },
          {
            tag: "Migratory birds",
            size: "md",
            bob: true,
            images: [
              { src: "/interactive/F1.png", width: 1286, height: 1011, alt: "A greylag goose in flight" },
              { src: "/interactive/F4.png", width: 1321, height: 773, alt: "A bar-headed goose in flight" },
              { src: "/interactive/F3.png", width: 1076, height: 799, alt: "A great white pelican in flight, with a pink bill" },
              { src: "/interactive/F2.png", width: 1099, height: 997, alt: "A pale stork in flight, its wings washed with yellow" },
            ],
          },
          {
            tag: "Details",
            size: "sm",
            images: [
              { src: "/interactive/butterfly.png", width: 1536, height: 1024, alt: "A peach and yellow butterfly with spotted wings" },
              { src: "/interactive/dragonfly.png", width: 1536, height: 1024, alt: "A dragonfly with pale, gold-tipped wings" },
              { src: "/interactive/flower.png", width: 420, height: 595, alt: "A pink lotus in bloom" },
              { src: "/interactive/bud.png", width: 420, height: 595, alt: "A pink lotus bud" },
              { src: "/interactive/lotusleaf.png", width: 344, height: 106, alt: "Floating lotus leaves" },
            ],
          },
        ],
      },
      {
        layout: "small",
        images: [
          {
            src: "/interactive/image1.png",
            width: 407,
            height: 627,
            alt: "A hand-drawn plan of the website: a cover page, the logo over water with a hover effect, a transition, clouds, rain falling on the land, storks nesting for breeding, and a footer",
            tag: "Planning the website",
          },
        ],
      },
      {
        layout: "site",
        url: "https://bird-sanctuary-puce.vercel.app/",
        title: "Birds of Keoladeo, the live website",
        tag: "Live website",
      },
    ],
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
