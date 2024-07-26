/**
 * 
 * EmojiHeatmap: A dynamic, interactive display of emojis that shift 
 * with mouse movement, creating a detailed color-coordinated heatmap.
 *
 * Based on original work by Jonas Kjeldmand Jensen, July 2024
 *
 */ 

// Global variables
let xOffset = 0;
let yOffset = 0;
let mouseSensitivity = 0.6;
const FONT_SIZE = 16;
const NOISE_SCALE = 0.0006;
const EMOJI_CATEGORIES = {
  purple: ['😈', '🔮', '👿', '🧕', '🤷‍♀️', '🤰', '🌸', '🌷', '🌺','🎆'],
  blue: ['🌊', '🌎', '🐟', '💙', '🔵', '🧢', '👖', '🧵', '👔', '🥏', '🟦', '🔹', '🧿', '🔷', '🚙', '🥶', '🌀', '🩻', '📘', '💎', '🛋️', '💠', '🧊', '🛗'],
  cyan: ['🐬', '🐋', '🐳', '🐟', '🐬', '🪣', '👗', '🩴'],
  green: ['🌿', '🍀', '🌱', '🐲', '🌲', '🥬', '🤢', '🥦', '🧩', '🐍', '🐉', '🐸', '💚', '🔋', '🤮', '🧃', '📗', '🟢', '🔫', '🧪', '🦚', '🦖', '🥝', '🍏', '🦎', '🐊', '🐢', '🍃', '🧑‍🌾'],
  yellow: ['🌻', '🌟', '🍋', '🍌', '🐥', '🦁', '💛', '🎗️', '🚡', '🟨', '🏆', '🎫', '🌕', '🌞', '🛎️', '📒', '🐤', '🚕', '🍍', '🍺', '⭐', '🧀'],
  orange: ['🍊', '🎃', '🦁', '🔶', '🟧', '🟠', '🦊', '🍑', '🥕', '🦐', '🏺', '🦊', '🍁', '🍯', '📙', '🧡', '💥', '🔥', '🎁', '🚚', '🦧', '🐅', '🍂', '🦺', '🏀'],
  red: ['🍎', '🍓', '🌹', '🔴', '🟥', '🏮', '💢', '🚗', '🚨', '🦀', '🦞', '🤬', '⛽', '🍉', '🛑', '🥊', '🏓', '🚩', '🚒', '🩸', '🧰', '🥩', '💃', '👹',  '🌹', '🐞', '🥵', '👺', '🥫', '💋', '😡', '💯', '💔', '🍅', '❤️‍🔥', '🌶️', '🍒', '🆘', '🧨', '🚗'],
};

/**
 * Setup function to initialize the canvas
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(FONT_SIZE);
  textAlign(CENTER, CENTER);
}

/**
 * Draw function to render emojis on the canvas
 */
function draw() {
  background(220);

  const time = frameCount * 0.00075;

  for (let x = 0; x < width; x += FONT_SIZE) {
    for (let y = 0; y < height; y += FONT_SIZE) {
      const noiseValue = calculateNoiseValue(x, y, time);
      const emoji = getEmojiFromNoiseValue(noiseValue);
      text(emoji, x, y);
    }
  }
}

/**
 * Calculate Perlin noise value for given coordinates and time
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} time - Time factor for animation
 * @returns {number} Noise value between 0 and 1
 */
function calculateNoiseValue(x, y, time) {
  return noise((x + xOffset) * NOISE_SCALE, (y + yOffset) * NOISE_SCALE, time);
}

/**
 * Get emoji character based on noise value
 * @param {number} noiseValue - Perlin noise value between 0 and 1
 * @returns {string} Emoji character
 */
function getEmojiFromNoiseValue(noiseValue) {
  let category, adjustedNoiseValue;
  if (noiseValue < 0.3) {
    category = 'purple';
    adjustedNoiseValue = map(noiseValue, 0, 0.30, 0, 1);
  } else if (noiseValue < 0.3) {
    category = 'blue';
    adjustedNoiseValue = map(noiseValue, 0.27, 0.3, 0, 1);
  } else if (noiseValue < 0.4) {
    category = 'cyan';
    adjustedNoiseValue = map(noiseValue, 0.3, 0.4, 0, 1);
  } else if (noiseValue < 0.5) {
    category = 'green';
    adjustedNoiseValue = map(noiseValue, 0.4, 0.5, 0, 1);
  } else if (noiseValue < 0.6) {
    category = 'yellow';
    adjustedNoiseValue = map(noiseValue, 0.5, 0.6, 0, 1);
  } else if (noiseValue < 0.7) {
    category = 'orange';
    adjustedNoiseValue = map(noiseValue, 0.6, 0.7, 0, 1);
  } else {
    category = 'red';
    adjustedNoiseValue = map(noiseValue, 0.7, 1, 0, 1);
  }

  const categoryEmojis = EMOJI_CATEGORIES[category];
  const index = floor(adjustedNoiseValue * (categoryEmojis.length - 1));
  return categoryEmojis[index];
}


/**
 * Handle mouse dragging to update offsets
 */
function mouseDragged() {
  xOffset += (pmouseX - mouseX) * mouseSensitivity;
  yOffset += (pmouseY - mouseY) * mouseSensitivity;
}

/**
 * Handle window resizing
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}