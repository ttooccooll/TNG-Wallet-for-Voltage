import React from 'react';
import AudioPlayerComponent from 'react-audio-player';

const AudioPlayer = () => {
  return (
    <div>
      <AudioPlayerComponent
        autoPlay
        src="tng_bridge_3.mp3" // Replace with the path to your audio file
      />
    </div>
  );
};

export default AudioPlayer;
