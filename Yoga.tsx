import React from 'react';

const YogaVideos = () => {
  return (
    <div>
      <h2>Yoga Videos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        <div style={{ flex: '0 0 42%', marginBottom: '50px' }}>
          <iframe 
            width="100%" 
            height="315" 
            src="https://www.youtube.com/embed/5NhJd1PbXL4" // Replace with the first video ID
            title="Yoga Video 1" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
        <div style={{ flex: '0 0 42%', marginBottom: '50px' }}>
          <iframe 
            width="100%" 
            height="315" 
            src="https://www.youtube.com/embed/CLDHeV9OI5U" // Replace with the second video ID
            title="Yoga Video 2" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <p>
        <a href="https://www.youtube.com/watch?v=5NhJd1PbXL4" target="_blank" rel="noopener noreferrer">Watch on YouTube (Video 1)</a>
      </p>
      <p>
        <a href="https://www.youtube.com/watch?v=CLDHeV9OI5U" target="_blank" rel="noopener noreferrer">Watch on YouTube (Video 2)</a>
      </p>
    </div>
  );
};

export default YogaVideos;