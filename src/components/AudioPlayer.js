import React from 'react';
import AudioPlayerComponent from 'react-audio-player';

const AudioPlayer = () => {
  return (
    <div>
      <AudioPlayerComponent
        autoPlay
        src="/tng_bridge_3.mp3"
      />
    </div>
  );
};

export default AudioPlayer;
