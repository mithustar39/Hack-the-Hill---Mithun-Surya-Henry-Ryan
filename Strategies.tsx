import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { SectionContainer, Button } from './styles';

const SleepVideos = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleButtonClick = (videoType: string) => {
    // Use navigate to go to the respective video page
    navigate(`/${videoType}`);
  };

  return (
    <SectionContainer>
      <h2>Sleep Optimization Videos</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Button onClick={() => handleButtonClick('asmr')}>ASMR</Button>
        <Button onClick={() => handleButtonClick('meditation')}>Meditation/Breathing</Button>
        <Button onClick={() => handleButtonClick('yoga')}>Yoga</Button>
        <Button onClick={() => handleButtonClick('relaxing-music')}>Relaxing Music</Button>
      </div>
    </SectionContainer>
  );
};

export default SleepVideos;
