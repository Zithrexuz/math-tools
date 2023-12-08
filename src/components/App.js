import React, { useState } from 'react';
import styled from 'styled-components';
import Tabs from './Tabs';
import CardGames from './CardGames';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #202124; // #ADD8E6 Light blue color // #202124 for very dark blue
  // background-image: url('https://example.com/path-to-your-image.jpg');
  // background-size: cover;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #fff;
  @import url('https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap');
  font-family: 'Rubik Mono One', monospace;
  font-weight: 400;
  font-size: 3.5em; // Adjust the size as needed

  @media (max-width: 600px) {
    font-size: 2em; // Adjust the size for mobile devices
  }

`;

const Subtitle = styled.h2`
  margin-bottom: 40px;
  color: #fff;
  @import url('https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap');
  font-family: 'Rubik Mono One', monospace;
  font-weight: 400;
  font-size: 3em; // Adjust the size as needed

  @media (max-width: 600px) {
    font-size: 1.5em; // Adjust the size for mobile devices
  }
`;

function App() {
  const [tab, setTab] = useState('home');
  //const [players, setPlayers] = useState([]);
  const [gameCreated, setGameCreated] = useState(false);

  const handleTabChange = (newTab) => {
    setTab(newTab);
    setGameCreated(false);
  };

  return (
    <AppContainer>
      {tab === 'home' && (
        <>
          <Title>Math Tools</Title>
          <Subtitle>By Zith</Subtitle>
        </>
      )}
      <Tabs onChange={handleTabChange} gameCreated={gameCreated} />
      {tab === 'cardGames' && (
        <CardGames
          //players={players}
          //onPlayerNameChange={handlePlayerNameChange}
          //onCreatePlayers={(count) => {
            //setPlayers(new Array(count).fill({ name: '' }));
            //setGameCreated(true);
          //}}
        />
      )}
    </AppContainer>
  );
}

export default App;
