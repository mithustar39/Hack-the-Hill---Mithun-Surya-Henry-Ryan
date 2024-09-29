import React from 'react';
import { SectionContainer } from './styles';

const PersonalizedTips = () => {
  return (
    <SectionContainer>
      <h2>Personalized Sleep Tips</h2>
      <p>Based on your recent sleep data, here are some personalized tips to maximize YOUR sleep life:</p>
      <ul>
        <li>Maintain a consistent bedtime to improve sleep cycles.</li>
        <li>Consider reducing caffeine intake after 2 PM.</li>
        <li>Try a relaxing bedtime routine like reading or meditation.</li>
        <li>Make sure your room is cool, dark, and quiet for optimal sleep.</li>
      </ul>
    </SectionContainer>
  );
};

export default PersonalizedTips;
