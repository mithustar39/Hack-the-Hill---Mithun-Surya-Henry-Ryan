import styled from "styled-components";

export const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #2c3e50, #4b0082);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  color: white;

  h1 {
    font-size: 2.5rem;
    color: #8a2be2;
  }
`;

export const HomeContainer = styled.div`
  color: white;
  text-align: center;
  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #8a2be2;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }
`;

export const Button = styled.button`
  background-color: #8a2be2;
  color: white;
  padding: 10px 20px;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #4b0082;
  }
`;

export const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const TrackerContainer = styled.div`
  color: white;
  text-align: center;
  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #8a2be2;
  }
`;

export const MeditationContainer = styled.div`
  color: white;
  text-align: center;
  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #8a2be2;
  }
`;
