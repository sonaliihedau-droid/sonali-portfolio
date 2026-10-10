// `wide`: a long strip, shown across the whole collage instead of in a column.
export type Sketch = { src: string; width: number; height: number; alt: string; wide?: true };

const DIR = "/sktech/digital";

// Shown in order in the Sketchbook's Digital Illustration collage; a wide one splits the columns around it.
export const DIGITAL_ILLUSTRATIONS: Sketch[] = [
  {
    src: `${DIR}/image1.jpg`,
    width: 2008,
    height: 2906,
    alt: "A cottage in a green meadow, seen through an opening in a carved stone wall",
  },
  {
    src: `${DIR}/image12.png`,
    width: 406,
    height: 575,
    alt: "A girl in tall grass, her face hidden behind a giant daisy under a blue sky",
  },
  {
    src: `${DIR}/image4.png`,
    width: 1920,
    height: 1080,
    alt: "A dreamy landscape of golden fields under a pastel sunset sky with billowing clouds",
  },
  {
    src: `${DIR}/image5.png`,
    width: 1920,
    height: 1318,
    alt: "Panda study: green sketches of pandas walking, climbing bamboo, sitting and rolling",
  },
  {
    src: `${DIR}/image10.png`,
    width: 2800,
    height: 540,
    alt: "A sequence of five frames of a bear walking up to a basket and sitting down with it",
    wide: true,
  },
  {
    src: `${DIR}/image13.png`,
    width: 3035,
    height: 2150,
    alt: "Bright green hills with fluffy sheep under a blue sky, painted in loose strokes",
  },
  {
    src: `${DIR}/image15.png`,
    width: 1920,
    height: 1080,
    alt: "A curly-haired girl in a green sweater crouching to look at a tiny sprout",
  },
  {
    src: `${DIR}/image16.jpg`,
    width: 2480,
    height: 3508,
    alt: "Two figures embracing on the floor of a sunlit room overgrown with vines",
  },
  {
    src: `${DIR}/image14.png`,
    width: 1920,
    height: 1080,
    alt: "A pencil sketch of a couple sitting close, one feeding the other, dated 01.23",
  },
  {
    src: `${DIR}/image3.png`,
    width: 1920,
    height: 1080,
    alt: "Dolphin study: pink line sketches of dolphins swimming, leaping and diving",
  },
];

// The sepia ink drawings, shown as a marquee above the Digital Illustration collage.
export const DIGITAL_MARQUEE: Sketch[] = [
  {
    src: `${DIR}/image7.png`,
    width: 1920,
    height: 1080,
    alt: "Whispering Canopies: a gnarled tree holding up a branch-framed title sign",
  },
  {
    src: `${DIR}/image11.png`,
    width: 1920,
    height: 1080,
    alt: "A sleepy round forest spirit sitting in the grass among buzzing bees",
  },
  {
    src: `${DIR}/image2.png`,
    width: 1920,
    height: 1080,
    alt: "A lone twisted, leafless tree drawn in ink on warm paper",
  },
  {
    src: `${DIR}/image6.png`,
    width: 1920,
    height: 1080,
    alt: "A small mud hut on a grassy ledge, with smoke curling up from its roof",
  },
  {
    src: `${DIR}/image9.png`,
    width: 1920,
    height: 1080,
    alt: "A small girl looking up at a tall tree whose trunk curls over like a creature",
  },
  {
    src: `${DIR}/image8.png`,
    width: 1920,
    height: 1080,
    alt: "A tree stump bound with rope, drawn in brown ink with swirls rising from it",
  },
];

const COLOUR_DIR = "/sktech/colour";

// Marker pages for the Sketchbook's Colour marquees: the first row is COLOUR_ROW_SPLIT pages, the second the rest.
export const COLOUR_ROW_SPLIT = 8;
export const COLOUR_SKETCHES: Sketch[] = [
  {
    src: `${COLOUR_DIR}/image1.jpg`,
    width: 1500,
    height: 1432,
    alt: "“Error” in bold purple lettering outlined in teal, surrounded by pink swirls and leaf doodles",
  },
  {
    src: `${COLOUR_DIR}/image3.jpg`,
    width: 1460,
    height: 1600,
    alt: "A couple standing close together, drawn in lilac and teal with a pink outline and yellow sparkles",
  },
  {
    src: `${COLOUR_DIR}/image6.jpg`,
    width: 1600,
    height: 1456,
    alt: "Jhumka, a story: a girl with jhumka earrings, a boy, and a pair of earrings in a box",
  },
  {
    src: `${COLOUR_DIR}/image13.jpg`,
    width: 1600,
    height: 1528,
    alt: "A money plant growing in a glass jar beside a calendar note reading “until that time”",
  },
  {
    src: `${COLOUR_DIR}/image7.jpg`,
    width: 1505,
    height: 1600,
    alt: "A close-up portrait of a woman with flowing lilac hair, resting her chin on her hand",
  },
  {
    src: `${COLOUR_DIR}/image10.jpg`,
    width: 1580,
    height: 1460,
    alt: "A comic page: a morning alarm, a boy stretching awake, and “me at lunch table at 2:00”",
  },
  {
    src: `${COLOUR_DIR}/image2.jpg`,
    width: 1444,
    height: 1420,
    alt: "A boy with round glasses beneath a purple moon, pink planets and sparkling stars",
  },
  {
    src: `${COLOUR_DIR}/image11.jpg`,
    width: 1486,
    height: 1600,
    alt: "Three portraits of women in teal, lilac and purple on a bright yellow background",
  },
  {
    src: `${COLOUR_DIR}/image5.jpg`,
    width: 1600,
    height: 1492,
    alt: "Meet Mr. Bob Garden: a bald man with a small plant on his head, with a handwritten note",
  },
  {
    src: `${COLOUR_DIR}/image12.jpg`,
    width: 1600,
    height: 1509,
    alt: "A girl with long teal and coral hair, a steaming teacup, and a girl in a pink dress saying “Gawwd”",
  },
  {
    src: `${COLOUR_DIR}/image9.jpg`,
    width: 1600,
    height: 1349,
    alt: "A girl relaxing on her bed by a window that looks out onto green hills",
  },
  {
    src: `${COLOUR_DIR}/image4.jpg`,
    width: 1600,
    height: 1512,
    alt: "A woman in a saree making a graceful hand gesture, drawn in coral within a purple border",
  },
  {
    src: `${COLOUR_DIR}/image14.jpg`,
    width: 1507,
    height: 1600,
    alt: "“You are having your breakfast now?” A mother calls, with a clock and a big cup of tea",
  },
  {
    src: `${COLOUR_DIR}/image8.jpg`,
    width: 1528,
    height: 1428,
    alt: "Five character portraits in coloured frames: a bearded man, women, and young men",
  },
  {
    src: `${COLOUR_DIR}/image15.jpg`,
    width: 1600,
    height: 1467,
    alt: "Two girls with braids, one in pink and one in purple, sketched side by side",
  },
];

const PENCIL_DIR = "/sktech/pencil";

// Shown in order in the Sketchbook's Pencil collage, arranged so the columns come out even.
export const PENCIL_SKETCHES: Sketch[] = [
  {
    src: `${PENCIL_DIR}/image4.jpg`,
    width: 742,
    height: 1356,
    alt: "A seated woman with leaves sprouting from her head and shoulders",
  },
  {
    src: `${PENCIL_DIR}/image1.jpg`,
    width: 1306,
    height: 850,
    alt: "A row of strange plants with flat, umbrella-like caps",
  },
  {
    src: `${PENCIL_DIR}/image9.jpg`,
    width: 1046,
    height: 1600,
    alt: "A dreamlike pond of giant hanging leaves, lily pads, reeds and curling ferns",
  },
  {
    src: `${PENCIL_DIR}/image12.jpg`,
    width: 1540,
    height: 1484,
    alt: "Giant mushrooms rising out of curling grass",
  },
  {
    src: `${PENCIL_DIR}/image14.jpg`,
    width: 1380,
    height: 1599,
    alt: "A woman wrapped in a shawl, standing among leafy plants",
  },
  {
    src: `${PENCIL_DIR}/image13.jpg`,
    width: 978,
    height: 1600,
    alt: "Wildflowers growing up against a dry stone wall",
  },
  {
    src: `${PENCIL_DIR}/image6.jpg`,
    width: 1316,
    height: 918,
    alt: "A two-storey house among pine trees, with wide steps leading up to it",
  },
  {
    src: `${PENCIL_DIR}/image2.jpg`,
    width: 1102,
    height: 1600,
    alt: "A twisting, vine-wrapped tree trunk rising from curling ferns",
  },
  {
    src: `${PENCIL_DIR}/image11.jpg`,
    width: 1600,
    height: 1493,
    alt: "An old domed building overgrown with trees under swirling clouds",
  },
  {
    src: `${PENCIL_DIR}/image8.jpg`,
    width: 1600,
    height: 1232,
    alt: "A young woman and man talking in front of shop windows",
  },
  {
    src: `${PENCIL_DIR}/image10.jpg`,
    width: 1079,
    height: 1600,
    alt: "A page of doodles: a bear, a moth, a birdcage, a tall man and a curly-haired girl",
  },
  {
    src: `${PENCIL_DIR}/image7.jpg`,
    width: 1104,
    height: 1600,
    alt: "Character sketches: a man's face, a “Lyla” name banner, a girl under a mushroom cap and small creatures",
  },
  {
    src: `${PENCIL_DIR}/image3.jpg`,
    width: 1154,
    height: 1599,
    alt: "A path lined with ornate street lamps and tall grass",
  },
  {
    src: `${PENCIL_DIR}/image5.jpg`,
    width: 1285,
    height: 1600,
    alt: "A girl with wild curly hair, wearing dungarees",
  },
];
