/*
import React, { useState } from 'react';
import Tabs from './Tabs';
import CardGames from './CardGames';

function App() {
  const [tab, setTab] = useState('home');
  const [players, setPlayers] = useState([]);
  const [playerCount, setPlayerCount] = useState(0);

  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  const handlePlayerCountChange = (event) => {
    setPlayerCount(event.target.value);
  };

  const handlePlayerNameChange = (index, event) => {
    const newPlayers = [...players];
    newPlayers[index] = event.target.value;
    setPlayers(newPlayers);
  };

  const handleGameCreation = () => {
    setPlayers(new Array(playerCount).fill(''));
  };

  return (
    <div>
      <Tabs onChange={handleTabChange} />
      {tab === 'cardGames' && (
        <CardGames
          players={players}
          onPlayerCountChange={handlePlayerCountChange}
          onPlayerNameChange={handlePlayerNameChange}
          onCreateGame={handleGameCreation}
        />
      )}
      {/* Add your other tab components here //}
    </div>
  );
}

export default App;
*/

import React, { useState } from 'react';
import { useEffect } from 'react';
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
  const [playerCount, setPlayerCount] = useState(0);
  const [gameCreated, setGameCreated] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const handleTabChange = (newTab) => {
    setTab(newTab);
    setGameCreated(false);
  };

  /*
  const handlePlayerCountChange = (event) => {
    console.log(event.target.value);
    setPlayerCount(event.target.value);
  };
  */

  const handlePlayerCountChange = (event) => {
    const count = event.target.value;
    setPlayerCount(count);
    setPlayers(new Array(count).fill({ name: '' }));
  };

  const handlePlayerNameChange = (index, event) => {
    const newPlayers = [...players];
    newPlayers[index].name = event.target.value;
    setPlayers(newPlayers);
  };
  /*
  const handleGameCreation = () => {
    setPlayers(new Array(playerCount).fill({ name: '', score: new Array(10).fill(0) }));
    setGameCreated(true);
  };
  */
  const handleGameCreation = () => {
    setPlayers(new Array(playerCount).fill().map(() => ({ name: '', score: new Array(10).fill(0) })));
    setGameCreated(true);
  };
  

  useEffect(() => {
    console.log('Game created:', gameCreated);
  }, [gameCreated]);

  return (
    <AppContainer>
      {tab === 'home' && (
        <>
          <Title>Math tools</Title>
          <Subtitle>By Zith</Subtitle>
        </>
      )}
      <Tabs onChange={handleTabChange} gameCreated={gameCreated} />
      {tab === 'cardGames' && ( //  && !gameCreated
        <CardGames
          gameStarted={gameStarted}
          setGameStarted={setGameStarted}
          players={players}
          onPlayerCountChange={handlePlayerCountChange}
          onPlayerNameChange={handlePlayerNameChange}
          onCreateGame={handleGameCreation}
        />
      )}
      {/* Add your other tab components here */}
    </AppContainer>
  );
}


export default App;

