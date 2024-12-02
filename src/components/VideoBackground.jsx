import React from 'react';

const VideoBackground = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    >
      <source src="/homevideo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    {/* Corrected the opacity class */}
    <div className="absolute inset-0 bg-black opacity-30"></div>
  </div>
);

export default VideoBackground;

