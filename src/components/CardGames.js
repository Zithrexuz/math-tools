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

  const handleShowTable = () => {
    setShowTable(true);
  };

  return (
    <div>
      <Title>Point Controller</Title>
      {!gameStarted && <CreateButton onClick={handleCreatePlayers}>Create game</CreateButton>}
      {gameStarted && !showTable && (
        <>
          <input type="number" min="1" onChange={handlePlayerCountChange} placeholder="Enter number of players" />
          {Array.from({ length: playerCount }, (_, index) => (
            <div key={index}>
              <PlayerInput type="text" value={players[index]?.name || ''} onChange={(event) => onPlayerNameChange(index, event)} placeholder={`Enter name of player ${index + 1}`} />
              <DeleteButton size={20} onClick={() => onPlayerNameChange(index, { target: { value: '' } })} />
            </div>
          ))}
          <button onClick={handleShowTable}>Go to table</button>
        </>
      )}
      {showTable && (
        <Table>
          <thead>
            <tr>
              <th>Player</th>
              {Array.from({ length: 10 }, (_, i) => (
                <th key={i}>Round {i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index}>
                <td>{player.name}</td>
                {Array.from({ length: 10 }, (_, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default CardGames;
