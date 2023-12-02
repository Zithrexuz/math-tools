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
      {/* Add your other tab components here */}
    </div>
  );
}

export default App;
