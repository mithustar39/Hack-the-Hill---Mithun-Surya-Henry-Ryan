import styled, { createGlobalStyle } from 'styled-components';
import backgroundImage from './assets/background.jpg'; // Adjust the path as necessary
import { NavLink } from 'react-router-dom';


// Global Styles
export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif; /* Global font */
  }

  html, body {
    height: 100%;
    width: 100%;
    background: url(${backgroundImage}) no-repeat center center fixed; /* Center and fix the background */
    background-size: cover; /* Cover the entire area */
    color: #e0e0e0; /* Text color */
  }

  #root {
    height: 100%;
    display: flex;
    flex-direction: column; /* Align children vertically */
  }
`;

export const CenteredDescription = styled.div`
  text-align: center;
`;
  

// Header Styles
export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: rgba(25, 25, 25, 0.8); /* Semi-transparent background */
`;

// Navigation Bar Styles
export const NavBar = styled.nav`
  display: flex;
`;

// Navigation Button Styles
export const NavButton = styled(NavLink)`
  padding: 10px 20px;
  margin: 0 10px;
  color: #e0e0e0;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s; /* Smooth transition for hover effect */

  &.active {
    background-color: #8a2be2; /* Active button color */
    color: #fff; /* Active button text color */
  }

  &:hover {
    background-color: #6a0dad; /* Hover color */
  }
`;

// Main Container for Home Page
export const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Welcome Text Styles
export const WelcomeText = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #8a2be2; /* Purple color for welcome text */
`;

// Description Text Styles
export const DescriptionText = styled.p`
  font-size: 1.2rem;
  color: #e0e0e0;
`;

// Styles for other sections (e.g., Sleep History, Today's Sleep)
export const SectionContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: rgba(50, 50, 50, 0.8); /* Slightly transparent container */
  border-radius: 10px;
  margin: 10px 0; /* Margin between sections */
  color: #e0e0e0; /* Text color */
`;

// Sleep Tracker Section Styles
export const TrackerContainer = styled.div`
  color: #e0e0e0;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #8a2be2; /* Purple color for section header */
  }

  p {
    font-size: 1.2rem;
    color: #e0e0e0;
  }
`;

// Input Field Styles
export const Input = styled.input`
  padding: 12px;
  margin: 10px 0;
  width: 100%;
  font-size: 1rem;
  border-radius: 10px;
  border: 1px solid #8a2be2;
  background-color: #292929;
  color: #e0e0e0;
  outline: none;

  &:focus {
    border-color: #6a0dad;
  }
`;

// Button Styles
export const Button = styled.button`
  background-color: #8a2be2;
  color: #e0e0e0;
  padding: 12px 20px;
  font-size: 1.1rem;
  border: none;
  border-radius: 10px;
  margin: 15px 0;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #6a0dad;
  }
`;


// Styled Heading
export const Heading = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #8a2be2; // Main title color
`;

// Styled Subtitle with dynamic color
export const Subtitle = styled.h2<{ color: string }>`
  font-size: 2rem;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${(props) => props.color}; // Dynamic color based on props
`;

// List Item Styles
export const ListItem = styled.li`
  font-size: 1.2rem;
  margin: 5px 0;
  color: #e0e0e0; // Text color for list items
`;