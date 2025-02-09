import React from 'react';
import { SpriteAnimator } from 'react-sprite-animator';
import { useSettings } from '../contexts/settingsContext';
import pipeBody from '../assets/game_assets/Tiles/pipeBody.png';
import pipeHeadTop from '../assets/game_assets/Tiles/pipeHeadTop.png';
import pipeHeadBottom from '../assets/game_assets/Tiles/pipeHeadBottom.png';

const Pipe = ({ x, height, isTop, type, cn }) => {
  const pipeWidth = 60; // Display width of the pipe
  const headHeight = 30; // Display height of the pipe head
  const bodyHeight = height - headHeight; // Display height of the tiled body
  const { settings } = useSettings(); // Get the settings from the context
  const pipeStyle = settings.pipeStyle; // Get the pipeStyle from the settings
  const pipeStyles = 
  {
    'green': 0,
    'blue': 3,
    'white': 4,
    'purple': 5,
  };
  // Sprite sheet configurations
  const bodyConfig = {
    sprite: pipeBody,
    frameWidth: 28,
    frameCount: 8,
    totalWidth: 28 * 8, // 224px
    frameHeight: 50,
    framePadding: 0 // Ensure no padding between frames
  };

  const headConfig = {
    frameWidth: 32,
    frameCount: 8,
    totalWidth: 32 * 8,
    frameHeight: 16,
  };

  return (
    <div className={'animate__animated animate__fadeIn' + cn}
      style={{
        position: 'absolute',
        [isTop ? 'top' : 'bottom']: 0,
        left: `${x}px`,
        height: `${height}px`,
        width: `${pipeWidth}px`,
      }}
    >
      {/* Pipe Head */}
      <div
        style={{
          position: 'absolute',
          top: isTop ? bodyHeight : 0,
          left: -6,
          height: `${headHeight}px`,
          width: '100%',
          zIndex: 2,
        }}
      >
        <SpriteAnimator
          sprite={type === 'top' ? pipeHeadTop : pipeHeadBottom}
          width={32}
          height={16}
          scale={.45}
          direction="horizontal"
          frameCount={1}
          frameWidth={headConfig.frameWidth}
          frameHeight={headConfig.frameHeight}
          startFrame={pipeStyles[pipeStyle]}
          animate={false}
          loop={false}
        />
      </div>

      {/* Pipe Body */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: `${bodyHeight + headHeight}px`,
          width: '100%',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        <SpriteAnimator
          sprite={bodyConfig.sprite}
          width={bodyConfig.frameWidth}  // Use actual frame width
          height={bodyHeight}
          scale={0.45}
          direction="horizontal"
          frameCount={1}
          frameWidth={bodyConfig.frameWidth}
          frameHeight={bodyConfig.frameHeight}
          startFrame={pipeStyles[pipeStyle]}  // Frame indexes start at 0
          animate={false}
          loop={false}
          style={{
            position: 'absolute',
            left: `-${(bodyConfig.frameWidth * 0.45)}px`  // Compensate for scaling offset
          }}
        />
      </div>


    </div>
  );
};

export default Pipe;