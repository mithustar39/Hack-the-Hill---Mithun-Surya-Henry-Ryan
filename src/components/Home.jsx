import React from 'react';
import { Link } from 'react-router-dom';
import { HomeContainer, Button } from '../styles';

const Home = () => {
  return (
    <HomeContainer>
      <h1>Welcome to Your Sleep App</h1>
      <p>Track your sleep, relax with meditation, and improve your rest.</p>
      <Link to="./tracker">
        <Button>Sleep Tracker</Button>
      </Link>
      <Link to="/meditation">
        <Button>Meditation</Button>
      </Link>
    </HomeContainer>
  );
};

export default Home;
