/**
 * 
 * EmojiAdventure: A dynamic, interactive display of emojis that shift 
 * with mouse movement.
 *
 * Made by Jonas Kjeldmand Jensen, July 2024
 *
 */ 


// Global variables
let xOffset = 0;
let yOffset = 0;
const FONT_SIZE = 16;
const NOISE_SCALE = 0.0004;
const EMOJI_RANGE = {
  lower: 0x1f300, // Starting Unicode value for emojis
  upper: 0x1fa9f  // Extended Ending Unicode value for flags and other emojis
  /**
    [0x1F300, 0x1F5FF], // Miscellaneous Symbols and Pictographs
    [0x1F600, 0x1F64F], // Emoticons
    [0x1F680, 0x1F6FF], // Transport and Map Symbols
    [0x1F900, 0x1F9FF], // Supplemental Symbols and Pictographs
    [0x2600, 0x26FF],   // Miscellaneous Symbols
    [0x2700, 0x27BF],   // Dingbats
    [0x1F400, 0x1F4FF]  // Animals & Nature
     */
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
  background(220); // Set the background color to a light gray (220)

  const time = frameCount * NOISE_SCALE; // Calculate the time factor using frame count and a noise scale

  for (let x = 0; x < width; x += FONT_SIZE) {
    // Loop over the canvas width, incrementing by font size
    for (let y = 0; y < height; y += FONT_SIZE) {
      // Loop over the canvas height, incrementing by font size
      const noiseValue = calculateNoiseValue(x, y, time); // Generate a noise value for the current position and time
      const emoji = getEmojiFromNoiseValue(noiseValue); // Get an emoji based on the noise value
      text(emoji, x, y); // Draw the emoji at the current position (x, y)
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
  const emojiCode = int(
    map(noiseValue, 0, 1, EMOJI_RANGE.lower, EMOJI_RANGE.upper)
  );
  return String.fromCodePoint(emojiCode);
}

/**
 * Handle mouse dragging to update offsets
 */
function mouseDragged() {
  xOffset += pmouseX - mouseX;
  yOffset += pmouseY - mouseY;
}

/**
 * Handle window resizing
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
