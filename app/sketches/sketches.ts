// `wide`: a long strip, shown across the whole collage instead of in a column.
// `crop`: show only this horizontal slice of the image, as [left, right] shares of its width.
export type Sketch = {
  src: string;
  width: number;
  height: number;
  alt: string;
  wide?: true;
  crop?: [number, number];
};

const LIVE_DIR = "/sktech/live-sketch";

// Cut-out PNGs (transparent, with white washes meant to melt into the page), placed unmounted in
// the Sketchbook's Live Sketches section, in the order the section zigzags through them. The
// shopfront is cropped to its drawing (its left side is empty wash), and 3.png holds two separate
// sketches, so it appears twice, cropped to each.
export const LIVE_SKETCHES: Sketch[] = [
  {
    src: `${LIVE_DIR}/1.png`,
    width: 777,
    height: 835,
    alt: "Two blue street lamps leaning together by a park bench, with doodled yellow flowers and swirling trees",
  },
  {
    src: `${LIVE_DIR}/2.png`,
    width: 1862,
    height: 835,
    crop: [0.46, 1],
    alt: "A hand holding up an ink sketch of a shopfront on an orange pad, in front of the street it was drawn on",
  },
  {
    src: `${LIVE_DIR}/3.png`,
    width: 1889,
    height: 920,
    crop: [0, 0.52],
    alt: "A watercolour of an old bungalow on a spiral pad, held up in front of the building's carved balcony",
  },
  {
    src: `${LIVE_DIR}/3.png`,
    width: 1889,
    height: 920,
    crop: [0.56, 1],
    alt: "A watercolour of a garden gate among grasses, held against a wooden fence under a doodled branch",
  },
];

const DIR = "/sktech/digital";

// Shown in order in the Sketchbook's Illustration collage; a wide one splits the columns around it.
// Each block is grouped so its columns end level: the cottage beside four near-square pieces,
// the vine room beside four landscapes, then the last four landscapes as a two-by-two.
export const DIGITAL_ILLUSTRATIONS: Sketch[] = [
  {
    src: `${DIR}/image1.jpg`,
    width: 2008,
    height: 2906,
    alt: "A cottage in a green meadow, seen through an opening in a carved stone wall",
  },
  {
    src: `${DIR}/image5.png`,
    width: 1920,
    height: 1318,
    alt: "Panda study: green sketches of pandas walking, climbing bamboo, sitting and rolling",
  },
  {
    src: `${DIR}/image13.png`,
    width: 1148,
    height: 841,
    alt: "Bright green hills with fluffy sheep under a blue sky, painted in loose strokes",
  },
  {
    src: `${DIR}/image20.png`,
    width: 595,
    height: 420,
    alt: "Bombay: a pencil-and-wash sketch of the Victoria Terminus with palms and street lamps",
  },
  {
    src: `${DIR}/image15.png`,
    width: 3035,
    height: 2150,
    alt: "A curly-haired girl in a green sweater crouching to look at a tiny sprout",
  },
  {
    src: `${DIR}/image10.png`,
    width: 2800,
    height: 540,
    alt: "A sequence of five frames of a bear walking up to a basket and sitting down with it",
    wide: true,
  },
  {
    src: `${DIR}/image16.jpg`,
    width: 2480,
    height: 3508,
    alt: "Two figures embracing on the floor of a sunlit room overgrown with vines",
  },
  {
    src: `${DIR}/image4.png`,
    width: 1920,
    height: 1080,
    alt: "A dreamy landscape of golden fields under a pastel sunset sky with billowing clouds",
  },
  {
    src: `${DIR}/image24.png`,
    width: 1920,
    height: 1080,
    alt: "A golden sun over a rolling blue sea, the clouds painted in swirling strokes",
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
  {
    src: `${DIR}/image23.png`,
    width: 2800,
    height: 540,
    alt: "Five frames of a flamingo dipping for a fish, which slips away with a splash",
    wide: true,
  },
  {
    src: `${DIR}/image21.png`,
    width: 1920,
    height: 1080,
    alt: "Guests in black evening wear at a party, painted in bold strokes against glowing pink arches",
  },
  {
    src: `${DIR}/image17.png`,
    width: 1920,
    height: 1080,
    alt: "A girl in a green dress marching with a stick over her shoulder, four pink ducks following her",
  },
  {
    src: `${DIR}/image18.png`,
    width: 1920,
    height: 1080,
    alt: "A girl in a green dress looking up at a panda resting on a branch",
  },
  {
    src: `${DIR}/image19.png`,
    width: 1920,
    height: 1080,
    alt: "A girl lying in the grass reading a book beneath a giant red mushroom",
  },
];

// The sepia ink drawings, shown as a marquee above the Illustration collage.
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
  {
    src: `${DIR}/image26.png`,
    width: 1920,
    height: 1080,
    alt: "Guffy: sketches of a curly-crowned tree creature with spiralling eyes and branches",
  },
];

const COLOUR_DIR = "/sktech/colour";

// Marker pages for the two marquees in the Sketchbook's Sketches part: the first row is COLOUR_ROW_SPLIT pages, the second the rest.
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

// The pencil pages in the Sketchbook's Sketches part, piled until spread into a collage; arranged so the columns come out even.
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
    src: `${PENCIL_DIR}/image17.png`,
    width: 1920,
    height: 1080,
    alt: "Bell flowers with swirling petals, drooping on long curved stems",
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
    src: `${PENCIL_DIR}/image16.png`,
    width: 1920,
    height: 1080,
    alt: "Animals: a ladybug and a dragonfly drawn in loose spirals",
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
    src: `${PENCIL_DIR}/image15.png`,
    width: 1920,
    height: 1080,
    alt: "A character sheet of a curly-haired girl with buns: full figure and a framed close-up of her face",
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
