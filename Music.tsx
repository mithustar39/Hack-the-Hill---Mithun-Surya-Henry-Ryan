import React from 'react';

const MusicVideos = () => {
  return (
    <div>
      <h2>Music Videos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        <div style={{ flex: '0 0 42%', marginBottom: '50px' }}>
          <iframe 
            width="100%" 
            height="315" 
            src="https://www.youtube.com/embed/u6HG_sqpLtM" // Replace with the first video ID
            title="Music Video 1" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
        <div style={{ flex: '0 0 42%', marginBottom: '50px' }}>
          <iframe 
            width="100%" 
            height="315" 
            src="https://www.youtube.com/embed/arDH_2fW8NY" // Replace with the second video ID
            title="Music Video 2" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <p>
        <a href="https://www.youtube.com/watch?v=u6HG_sqpLtM" target="_blank" rel="noopener noreferrer">Watch on YouTube (Video 1)</a>
      </p>
      <p>
        <a href="https://www.youtube.com/watch?v=arDH_2fW8NY" target="_blank" rel="noopener noreferrer">Watch on YouTube (Video 2)</a>
      </p>
    </div>
  );
};

export default MusicVideos;