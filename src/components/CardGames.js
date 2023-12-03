/*
import React from 'react';

function CardGames({ players, onPlayerCountChange, onPlayerNameChange, onCreateGame }) {
  return (
    <div>
      <h2>Point Controller</h2>
      <button onClick={onCreateGame}>Create game</button>
      <input type="number" onChange={onPlayerCountChange} placeholder="Enter number of players" />
      {players.map((player, index) => (
        <input key={index} type="text" value={player} onChange={(event) => onPlayerNameChange(index, event)} placeholder={`Enter name of player ${index + 1}`} />
      ))}
      <table>
        <thead>
          <tr>
            <th>Round</th>
            {players.map((player, index) => (
              <th key={index}>{player}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Add your rounds here //}
        </tbody>
      </table>
    </div>
  );
}

export default CardGames;
*/

//import React, { useState } from 'react';
//import { useEffect } from 'react';
function CardGames({ players, onPlayerNameChange, onCreatePlayers }) {
  const [playerCount, setPlayerCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const handleCreatePlayers = () => {
    setGameStarted(true);
  };

  const handlePlayerCountChange = (event) => {
    setPlayerCount(event.target.value);
    onCreatePlayers(event.target.value);
  };

  return (
    <div>
      <Title>Point Controller</Title>
      {!gameStarted && <CreateButton onClick={handleCreatePlayers}>Create game</CreateButton>}
      {gameStarted && (
        <>
          <input type="number" min="1" onChange={handlePlayerCountChange} placeholder="Enter number of players" />
          {players.map((player, index) => (
            <div key={index}>
              <PlayerInput type="text" value={player.name} onChange={(event) => onPlayerNameChange(index, event)} placeholder={`Enter name of player ${index + 1}`} />
              <DeleteButton size={20} onClick={() => onPlayerNameChange(index, '')} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default CardGames;
