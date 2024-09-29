import React from 'react';

const MeditationVideos = () => {
  return (
    <div>
      <h2>Meditation Videos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        <div style={{ flex: '0 0 42%', marginBottom: '50px' }}>
          <iframe 
            width="100%" 
            height="315" 
            src="https://www.youtube.com/embed/g0jfhRcXtLQ" // Replace with the first video ID
            title="Meditation Video 1" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
        <div style={{ flex: '0 0 42%', marginBottom: '50px' }}>
          <iframe 
            width="100%" 
            height="315" 
            src="https://www.youtube.com/embed/1G2he0jYOl0" // Replace with the second video ID
            title="Meditation Video 2" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <p>
        <a href="https://www.youtube.com/watch?v=g0jfhRcXtLQ" target="_blank" rel="noopener noreferrer">Watch on YouTube (Video 1)</a>
      </p>
      <p>
        <a href="https://www.youtube.com/watch?v=1G2he0jYOl0" target="_blank" rel="noopener noreferrer">Watch on YouTube (Video 2)</a>
      </p>
    </div>
  );
};

export default MeditationVideos;