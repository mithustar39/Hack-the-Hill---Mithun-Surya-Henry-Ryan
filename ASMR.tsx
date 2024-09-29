import React from 'react';

const ASMRVideos = () => {
  return (
    <div>
      <h2>ASMR Videos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        <div style={{ flex: '0 0 42%', marginBottom: '50px' }}>
          <iframe 
            width="100%" 
            height="315" 
            src="https://www.youtube.com/embed/CB_g47q-08g" // Replace with the first video ID
            title="ASMR Video 1" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
        <div style={{ flex: '0 0 42%', marginBottom: '50px' }}>
          <iframe 
            width="100%" 
            height="315" 
            src="https://www.youtube.com/embed/Bd7-JcH7sSc" // Replace with the second video ID
            title="ASMR Video 2" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <p>
        <a href="https://www.youtube.com/watch?v=CB_g47q-08g" target="_blank" rel="noopener noreferrer">Watch on YouTube (Video 1)</a>
      </p>
      <p>
        <a href="https://www.youtube.com/watch?v=Bd7-JcH7sSc" target="_blank" rel="noopener noreferrer">Watch on YouTube (Video 2)</a>
      </p>
    </div>
  );
};

export default ASMRVideos;