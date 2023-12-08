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
  background-color: #ADD8E6; // Light blue color
  // background-image: url('https://example.com/path-to-your-image.jpg');
  // background-size: cover;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');
  font-family: 'Roboto', sans-serif;
`;

const Subtitle = styled.h2`
  margin-bottom: 40px;
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');
  font-family: 'Roboto', sans-serif;
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
          <Title>Math tools</Title>
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
