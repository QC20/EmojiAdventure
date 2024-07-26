# EmojiAdventure 🌈✨

EmojiAdventure is an interactive digital art project that brings emojis to life in a mesmerizing, ever-changing canvas. This project showcases the intersection of generative art, user interaction, and the expressive power of emojis.

## Features

- **Dynamic Emoji Display**: Experience a canvas filled with emojis that shift and change based on Perlin noise algorithms.
- **Interactive Movement**: Drag your mouse to explore different areas of the emoji landscape.
- **Responsive Design**: Adapts seamlessly to any screen size or device.

## How It Works

EmojiAdventure uses Perlin noise to generate a smoothly changing pattern across the canvas. Each point on this pattern is mapped to a specific emoji from the Unicode range. As you move your mouse, the view shifts, revealing new patterns and combinations of emojis.

<div align="center">
  <img src="src\assets\img\Perlin-Noise-Field.png" alt="Image of a Perlin Noise Field in Black and Whit" style="width:400px; height:300px;">
  <p style="text-align: center;">Image of a Perlin Noise Field in Black and White.</p>
</div>

## Customization

Want to put your own spin on EmojiAdventure? Here are some ideas:

1. **Change the Emoji Range**: Modify the `EMOJI_RANGE` object to focus on specific emoji categories.
2. **Adjust the Noise Scale**: Experiment with the `NOISE_SCALE` constant to create finer or coarser patterns.
3. **Color Variations**: Introduce color by modifying the `text()` function to include fill colors based on noise values.
4. **Animation Speed**: Alter the time factor in the `draw()` function to speed up or slow down the animation.

## Getting Started

To run EmojiAdventure locally:

1. Ensure you have a web server set up (e.g., Live Server for VS Code).
2. Open the `index.html` file in your browser.
3. Start interacting with the emoji canvas!

## Contributing

We welcome contributions! Whether it's adding new features, improving performance, or fixing bugs, feel free to fork this repo and submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

Dive into the world of emojis and discover the endless possibilities of generative art with EmojiAdventure! 🚀🎨