# Flappy Bird Clone - React App

This is a Flappy Bird clone built using React. The game includes various customization options, difficulty levels, and sound settings to enhance the user experience.

## Features

- **Gameplay**: Classic Flappy Bird mechanics with a bird that the player must navigate through pipes.
- **Customization**:
  - **Bird Skins**: Choose from multiple bird skins (yellow, green, blue, white, purple).
  - **Backgrounds**: Select from different background themes (sunset, sunrise, night, fog).
  - **Pipe Styles**: Customize the appearance of the pipes (green, blue, white, purple).
- **Difficulty Levels**: Adjust the game difficulty (Easy, Medium, Hard).
- **Sound**: Toggle sound effects on or off.
- **Responsive Design**: The game is designed to be responsive and work on various screen sizes.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/flappy-bird-clone.git
   cd flappy-bird-clone
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm start
   ```

4. **Open the app**:
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to play the game.

## Usage

- **Start the Game**: Press Enter to start the game.
- **Control the Bird**: Press Space or click to make the bird jump.
- **Game Over**: The game ends when the bird hits a pipe or the ground. Your score will be displayed, and you can restart the game by pressing Space.

## Customization

You can customize the game settings by navigating to the **Settings** page:

- **Difficulty**: Adjust the difficulty level using the slider.
- **Bird Skin**: Choose a different bird skin.
- **Background**: Select a different background theme.
- **Pipe Style**: Change the appearance of the pipes.
- **Sound**: Toggle sound effects on or off.

## Project Structure

- **`App.jsx`**: Main application component with routing.
- **`Game.jsx`**: Game component containing the game logic and UI.
- **`Settings.jsx`**: Settings component for customizing the game.
- **`contexts/settingsContext.js`**: Context for managing game settings.
- **`components/ui/`**: Custom UI components like buttons, sliders, and switches.
- **`assets/`**: Game assets including images and sounds.

## Dependencies

- **React**: JavaScript library for building user interfaces.
- **React Router**: For handling routing within the app.
- **Sass**: For styling the components.
- **Custom UI Components**: Custom-built components for sliders, switches, and buttons.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- Inspired by the original Flappy Bird game.
- Built with React and other open-source libraries.

Enjoy playing the game and customizing it to your liking! 🎮

