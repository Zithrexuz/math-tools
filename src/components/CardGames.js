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

import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';

const Title = styled.h2`
  margin-bottom: 20px;
`;

const CreateButton = styled.button`
  margin-bottom: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: #fff;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const PlayerInput = styled.input`
  margin-bottom: 10px;
`;

const DeleteButton = styled(MdDelete)`
  margin-left: 10px;
  cursor: pointer;
`;

const Table = styled.table`
  margin-top: 20px;
`;

function CardGames({ players, onPlayerCountChange, onPlayerNameChange, onCreateGame }) {
  const [gameStarted, setGameStarted] = useState(false);

  const handleGameStart = () => {
    console.log('Before onCreateGame');
    onCreateGame();
    console.log('After onCreateGame');
    setGameStarted(true);
  };

  useEffect(() => {
    console.log('Game started:', gameStarted);
  }, [gameStarted]);

  console.log(players);

  return (
    <div>
      <Title>Point Controller</Title>
      {!gameStarted && <CreateButton onClick={handleGameStart}>Create game</CreateButton>}
      {gameStarted && (
        <>
          <input type="number" onChange={onPlayerCountChange} placeholder="Enter number of players" />
          {gameStarted && players.map((player, index) => (
            <div key={index}>
              <PlayerInput type="text" value={player.name} onChange={(event) => onPlayerNameChange(index, event)} placeholder={`Enter name of player ${index + 1}`} />
              <DeleteButton size={20} onClick={() => onPlayerNameChange(index, '')} />
            </div>
          ))}
          <Table>
            <thead>
              <tr>
                <th>Round</th>
                {players.map((player, index) => (
                  <th key={index}>{player}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Add your rounds here */}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}

export default CardGames;
