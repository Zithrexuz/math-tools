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
import React, { useState } from 'react';
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

const PointInput = styled.input`
  width: 50px;
`;

function CardGames({ players, onPlayerNameChange, onCreatePlayers }) {
  const [playerCount, setPlayerCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const handleCreatePlayers = () => {
    setGameStarted(true);
  };

  const handlePlayerCountChange = (event) => {
    const count = Math.min(event.target.value, 15); // Limit the number of players to 15
    setPlayerCount(count);
    onCreatePlayers(count);
  };

  const handlePlayerScoreChange = (playerIndex, roundIndex, event) => {
    const newPlayers = [...players];
    newPlayers[playerIndex].score[roundIndex] = event.target.value;
    onPlayerNameChange(playerIndex, { target: { value: newPlayers[playerIndex].name } });
  };

  //const handleShowTable = () => {
  //  setShowTable(true);
  //};

  return (
    <div>
      <Title>Point Controller</Title>
      {!gameStarted && <CreateButton onClick={handleCreatePlayers}>Create game</CreateButton>}
      {gameStarted && (
        <>
          <input type="number" min="1" onChange={handlePlayerCountChange} placeholder="Enter number of players" />
          {Array.from({ length: playerCount }, (_, index) => (
            <div key={index}>
              <PlayerInput type="text" value={players[index]?.name || ''} onChange={(event) => onPlayerNameChange(index, event)} placeholder={`Enter name of player ${index + 1}`} />
              <DeleteButton size={20} onClick={() => onPlayerNameChange(index, { target: { value: '' } })} />
            </div>
          ))}
          <Table>
            <thead>
              <tr>
                <th>Round</th>
                {players.map((_, index) => (
                  <th key={index}>Player {index + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }, (_, round) => (
                <tr key={round}>
                  <td>{round + 1}</td>
                  {players.map((player, index) => (
                    <td key={index}>
                      <PointInput type="number" min="0" value={player.score[round]} onChange={(event) => handlePlayerScoreChange(index, round, event)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}

export default CardGames;
