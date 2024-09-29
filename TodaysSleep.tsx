import React from 'react';
import { SectionContainer } from './styles';

const TodaysSleep = () => {
  return (
    <SectionContainer>
      <h2>Today's Sleep</h2>
      <p>Details from your sleep last night:</p>
      <ul>
        <li>Time asleep: 7 hours 20 minutes</li>
        <li>Time to fall asleep: 15 minutes</li>
        <li>Sleep cycles: 5</li>
        <li>Deep sleep: 2 hours</li>
        <li>REM sleep: 1 hour 30 minutes</li>
      </ul>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <img 
          src="/src/Todaygraph.png" 
          alt="Sleep During the night" 
          style={{ width: '300px', height: 'auto' }} 
        />
        <img 
          src="/src/today pie.jpg" 
          alt="Total sleep today" 
          style={{ width: '300px', height: 'auto' }} 
        />
      </div>
    </SectionContainer>
  );
};

export default TodaysSleep;
