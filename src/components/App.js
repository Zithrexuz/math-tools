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
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  margin-bottom: 40px;
`;

function App() {
  const [tab, setTab] = useState('home');
  const [players, setPlayers] = useState([]);
  const [gameCreated, setGameCreated] = useState(false);
  const [validPlayers, setValidPlayers] = useState(Array(playerCount).fill(true)); // a check value for checking if players a valid for creating the table.

  const handleTabChange = (newTab) => {
    setTab(newTab);
    setGameCreated(false);
  };

  const handlePlayerNameChange = (index, event) => {
    const newPlayers = [...players];
    newPlayers[index] = { name: event.target.value };
    setPlayers(newPlayers);

    const newValidPlayers = [...validPlayers];
    newValidPlayers[index] = event.target.value.trim() !== '';
    setValidPlayers(newValidPlayers);
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
          players={players}
          onPlayerNameChange={handlePlayerNameChange}
          onCreatePlayers={(count) => {
            setPlayers(new Array(count).fill({ name: '' }));
            //setGameCreated(true);
          }}
        />
      )}
    </AppContainer>
  );
}

export default App;
