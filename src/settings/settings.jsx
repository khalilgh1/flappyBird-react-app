import React from 'react';
import { Slider, Switch, Button } from '../../components/ui/custom-ui-components';
import Background from '../background/Background';
import { useSettings } from '../contexts/settingsContext';
import './settings.scss';
const FlappySettings = () => {
  const { settings, setSettings } = useSettings();
  const defaultSettings = {
    difficulty: 1,
    birdSkin: 'yellow',
    background: 'sunset',
    pipeStyle: 'green',
    sound: true
  };

  const birdSkins = ['yellow', 'green', 'blue', 'white', 'purple'];
  const pipeStyles = ['green', 'blue', 'white', 'purple'];
  const backgroundColors = [
    { name: 'sunset', value: '#FFA07A' },
    { name: 'sunrise', value: '#40ccff' },
    { name: 'night', value: '#191970' },
    { name: 'fog', value: '#15453f' }
  ];

  const handleReset = () => {
    setSettings(defaultSettings);
  };
  // Simple volume icons as SVG components
  const VolumeIcon = ({ muted }) => (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6 fill-current text-yellow-800" // Added text color
      xmlns="http://www.w3.org/2000/svg"
    >
      {muted ? (
        // Muted icon
        <>
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path
            d="M23 9l-6 6"
            stroke="currentColor" // Ensure stroke uses currentColor
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M17 9l6 6"
            stroke="currentColor" // Ensure stroke uses currentColor
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      ) : (
        // Unmuted icon
        <>
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path
            d="M15.54 8.46a5 5 0 0 1 0 7.07"
            stroke="currentColor" // Ensure stroke uses currentColor
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M19.07 4.93a10 10 0 0 1 0 14.14"
            stroke="currentColor" // Ensure stroke uses currentColor
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
  const ResetIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
      <path d="M12 4V2L8 6l4 4V8c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
    </svg>
  );

  return (
    <div className="settings max-w-4xl mx-auto p-8 bg-yellow-50 rounded-lg shadow-lg border-4 border-yellow-900">
      <Background></Background>
      <h1 className="text-4xl font-bold text-yellow-900 mb-8 text-center animate__animated animate__fadeIn">
        Game Settings
      </h1>

      {/* Difficulty Section */}
      <div className="mb-8 p-4 bg-white/50 rounded-lg animate__animated animate__fadeIn">
        <h2 className="text-2xl font-bold text-yellow-800 mb-4">Difficulty</h2>
        <div className="px-4 animate__animated animate__fadeIn">
          <Slider
            defaultValue={[settings.difficulty]}
            max={3}
            min={1}
            step={1}
            className="w-full"
            onValueChange={(value) => setSettings({ ...settings, difficulty: value[0] })}
          />
          <div className="flex justify-between mt-2 text-sm text-yellow-800 animate__animated animate__fadeIn">
            <span>Easy</span>
            <span>Medium</span>
            <span>Hard</span>
          </div>
        </div>
      </div>

      {/* Customization Section */}
      <div className="mb-8 p-4 bg-white/50 rounded-lg animate__animated animate__fadeIn">
        <h2 className="text-2xl font-bold text-yellow-800 mb-4 animate__animated animate__fadeIn">Customization</h2>

        {/* Bird Skin Selection */}
        <div className="mb-4 animate__animated animate__fadeIn">
          <label className="block text-yellow-800 mb-2 animate__animated animate__fadeIn">Bird Skin</label>
          <div className="grid grid-cols-4 gap-2">
            {birdSkins.map((skin) => (
              <Button
                key={skin}
                variant={settings.birdSkin === skin ? 'default' : 'outline'}
                onClick={() => setSettings({ ...settings, birdSkin: skin })}
              >
                {skin}
              </Button>
            ))}
          </div>
        </div>

        {/* Background Color Selection */}
        <div className="mb-4 animate__animated animate__fadeIn">
          <label className="block text-yellow-800 mb-2 animate__animated animate__fadeIn">Background Color</label>
          <div className="grid grid-cols-4 gap-2 animate__animated animate__fadeIn">
            {backgroundColors.map((color) => (
              <Button
                key={color.value}
                className="bg-btn w-full h-10 rounded"
                variant={settings.background === color.name ? 'default' : 'bordered'}
                style={{ backgroundColor: color.value }}
                onClick={() => setSettings({ ...settings, background: color.name })}
              >
                <h4>{color.name}</h4>
              </Button>
            ))}
          </div>
        </div>

        {/* Pipe Style Selection */}
        <div className="mb-4 animate__animated animate__fadeIn">
          <label className="block text-yellow-800 mb-2 animate__animated animate__fadeIn">Pipe Style</label>
          <div className="grid grid-cols-4 gap-2 animate__animated animate__fadeIn">
            {pipeStyles.map((style) => (
              <Button
                key={style}
                variant={settings.pipeStyle === style ? 'default' : 'outline'}
                onClick={() => setSettings({ ...settings, pipeStyle: style })}
              >
                {style}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Sound Toggle */}
      <div className="mb-8 p-4 bg-white/50 rounded-lg animate__animated animate__fadeIn">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-yellow-800">Sound</h2>
          <div className="flex items-center gap-2">
            {/* Make icon clickable */}
            <button
              onClick={() => setSettings(prev => ({ ...prev, sound: !prev.sound }))}
              className="sound-btn p-1 hover:bg-yellow-100 rounded-full"
            >
              <VolumeIcon muted={!settings.sound} />
            </button>
            <Switch
              checked={settings.sound}
              onCheckedChange={(checked) => setSettings({ ...settings, sound: checked })}
            />
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          className="reset-btn flex items-center gap-2"
          onClick={handleReset}
        >
          <ResetIcon />
          <h3 className='animate__animated animate__fadeIn'>Reset to Default</h3>
        </Button>
      </div>
    </div>
  );
};

export default FlappySettings;