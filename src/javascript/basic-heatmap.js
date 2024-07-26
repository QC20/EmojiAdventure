/**
 * 
 * EmojiHeatmap: A dynamic, interactive display of emojis that shift 
 * with mouse movement, creating a detailed color-coordinated heatmap.
 *
 * Based on original work by Jonas Kjeldmand Jensen, July 2024
 * Modified to include more color ranges and balance color distribution
 *
 */ 

// Global variables
let xOffset = 0;
let yOffset = 0;
const FONT_SIZE = 16;
let NOISE_SCALE = 0.004;
const EMOJI_CATEGORIES = {
  purple: [],
  magenta: [],
  blue: [],
  cyan: [],
  green: [],
  yellow: [],
  orange: [],
  red: [],
};

let colorCounts = {
  purple: 0, magenta: 0, blue: 0, cyan: 0,
  green: 0, yellow: 0, orange: 0, red: 0
};
let totalEmojis = 0;

/**
 * Setup function to initialize the canvas and categorize emojis
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(FONT_SIZE);
  textAlign(CENTER, CENTER);
  categorizeEmojis();
}

/**
 * Categorize emojis based on their prominent colors
 */
function categorizeEmojis() {
  const emojiRanges = [
    [0x1F300, 0x1F5FF],
    [0x1F600, 0x1F64F],
    [0x1F680, 0x1F6FF],
    [0x1F900, 0x1F9FF],
    [0x2600, 0x26FF],
    [0x2700, 0x27BF],
    [0x1F400, 0x1F4FF]
  ];

  for (let range of emojiRanges) {
    for (let code = range[0]; code <= range[1]; code++) {
      const emoji = String.fromCodePoint(code);
      const category = getEmojiCategory(emoji);
      if (category) {
        EMOJI_CATEGORIES[category].push(emoji);
      }
    }
  }

  // Ensure each category has at least one emoji
  for (let category in EMOJI_CATEGORIES) {
    if (EMOJI_CATEGORIES[category].length === 0) {
      EMOJI_CATEGORIES[category].push('❓');
    }
  }
}

/**
 * Determine the category of an emoji based on its prominent color
 * This is a simplified version and may not be 100% accurate
 * @param {string} emoji - The emoji character
 * @returns {string|null} The category name or null if not categorized
 */
function getEmojiCategory(emoji) {
  const purple ='😈👿💟💜👾🙆‍♀️🤷‍♀️🤰🍇🍆🌂🎆🪁🔮🧿🚺🛐🕉️🕎🔯⛎🟪🟣';
  const magenta = '💘💝💖💗💓💞💕🧠🫀🫁👅👄🫦💅👩‍🎤🧞‍♀️🏄‍♀️🦄🐷🐖🐽🦩🐙🪱🌸💮🪷🌷🍠🍣🍤🍭🍬💒🏩💈🎀🎟️👙👚👛🛍️🧬🧫🏳️‍⚧️👩🏻‍🎤🏄🏻‍♀️';
  const blueEmojis = '💙💦💤🧞‍♂️🦕🐳🐋🐬🐟🦈🦋🪺🫐🧊🥣🌍🌎🌏🌐🗺️🗾🏞️🏙️🚆🛝🚎🎑🚙🛻⛴️💺🛬💧🌊🌀🥏🧿🪬🧵👔👕👖🧢💎📪🗳️🛗🛋️🖌️📘🪣🩻🟦🔵🔷🔹';
  const cyanEmojis = '🦜🐠🐬🌊🦈🥶🐋🐳🐟🐬💎🔷💠🎽';
  const greenEmojis = '🌿🍀🌱🌲🥬🥦🐸💚🟢🧪🥝🍏🦎🐊🐢🦜🍃🥗🧑‍🌾';
  const yellowEmojis = '🌻🌟🍋🍌🐥💛🟨🏆🌕🔶☀️🌞🍯🐤🚕🍍⭐🌼🧀';
  const orangeEmojis = '🍊🎃🦁🔶🟧🟠🍑🥕🦊🧡🍁🦒🐅🥭🧳🔸🦺🏀🚼';
  const redEmojis = '🍎🍓🌹❤️🔴🟥🏮🚨👹🐞🍅🌶️🍒🦞🦀🆘🧨🚗';

  if (purple.includes(emoji)) return 'purple';
  if (magenta.includes(emoji)) return 'magenta';
  if (blueEmojis.includes(emoji)) return 'blue';
  if (cyanEmojis.includes(emoji)) return 'cyan';
  if (greenEmojis.includes(emoji)) return 'green';
  if (yellowEmojis.includes(emoji)) return 'yellow';
  if (orangeEmojis.includes(emoji)) return 'orange';
  if (redEmojis.includes(emoji)) return 'red';
  return null;
}

/**
 * Draw function to render emojis on the canvas
 */
function draw() {
  background(220);

  const time = frameCount * 0.01;
  colorCounts = {purple: 0, magenta: 0, blue: 0, cyan: 0, green: 0, yellow: 0, orange: 0, red: 0};
  totalEmojis = 0;

  for (let x = 0; x < width; x += FONT_SIZE) {
    for (let y = 0; y < height; y += FONT_SIZE) {
      const noiseValue = calculateNoiseValue(x, y, time);
      const emoji = getEmojiFromNoiseValue(noiseValue);
      text(emoji, x, y);
      
      // Count the emojis
      const category = getEmojiCategory(emoji);
      if (category) {
        colorCounts[category]++;
        totalEmojis++;
      }
    }
  }

  // Adjust NOISE_SCALE based on color distribution
  adjustNoiseScale();
}

/**
 * Calculate Perlin noise value for given coordinates and time
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} time - Time factor for animation
 * @returns {number} Noise value between 0 and 1
 */
function calculateNoiseValue(x, y, time) {
    const baseNoise = noise((x + xOffset) * NOISE_SCALE, (y + yOffset) * NOISE_SCALE, time);
    const detailNoise = noise((x + xOffset) * NOISE_SCALE * 8, (y + yOffset) * NOISE_SCALE * 8, time * 3) * 0.3;
    return constrain(baseNoise * 0.7 + detailNoise, 0, 1);
  }
/**
 * Get emoji character based on noise value
 * @param {number} noiseValue - Perlin noise value between 0 and 1
 * @returns {string} Emoji character
 */
function getEmojiFromNoiseValue(noiseValue) {
    // Use a custom mapping to spread out the colors more evenly
    let mappedValue;
    if (noiseValue < 0.1) {
      mappedValue = map(noiseValue, 0, 0.1, 0, 0.125); // Purple
    } else if (noiseValue < 0.3) {
      mappedValue = map(noiseValue, 0.1, 0.3, 0.125, 0.25); // Magenta
    } else if (noiseValue < 0.5) {
      mappedValue = map(noiseValue, 0.3, 0.5, 0.25, 0.5); // Blue and Cyan
    } else if (noiseValue < 0.7) {
      mappedValue = map(noiseValue, 0.5, 0.7, 0.5, 0.75); // Green and Yellow
    } else if (noiseValue < 0.9) {
      mappedValue = map(noiseValue, 0.7, 0.9, 0.75, 0.875); // Orange
    } else {
      mappedValue = map(noiseValue, 0.9, 1, 0.875, 1); // Red
    }
  
    let category;
    if (mappedValue < 0.125) {
      category = 'purple';
    } else if (mappedValue < 0.25) {
      category = 'magenta';
    } else if (mappedValue < 0.375) {
      category = 'blue';
    } else if (mappedValue < 0.5) {
      category = 'cyan';
    } else if (mappedValue < 0.625) {
      category = 'green';
    } else if (mappedValue < 0.75) {
      category = 'yellow';
    } else if (mappedValue < 0.875) {
      category = 'orange';
    } else {
      category = 'red';
    }
  
    const categoryEmojis = EMOJI_CATEGORIES[category];
    const index = floor(map(mappedValue, 0, 1, 0, categoryEmojis.length));
    return categoryEmojis[index];
  }

/**
 * Adjust NOISE_SCALE to balance color distribution
 */
function adjustNoiseScale() {
    const idealCount = totalEmojis / 8; // Assuming 8 color categories
    const purpleRatio = colorCounts.purple / idealCount;
    const redRatio = colorCounts.red / idealCount;
    const middleRatio = (colorCounts.cyan + colorCounts.green + colorCounts.yellow) / (3 * idealCount);
  
    if (purpleRatio < 0.5 || redRatio < 0.5) {
      NOISE_SCALE *= 1.05; // Increase scale if we're not seeing enough outliers
    } else if (middleRatio > 1.2) {
      NOISE_SCALE *= 0.95; // Decrease scale if we're seeing too many middle colors
    }
  
    NOISE_SCALE = constrain(NOISE_SCALE, 0.001, 0.01);
  }

/**
 * Handle mouse dragging to update offsets
 */
function mouseDragged() {
  xOffset += (pmouseX - mouseX) * 0.1;
  yOffset += (pmouseY - mouseY) * 0.1;
}

/**
 * Handle window resizing
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}