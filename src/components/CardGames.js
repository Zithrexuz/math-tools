//import React, { useState } from 'react';
//import { useEffect } from 'react';
import React, { useState, useEffect } from 'react';
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
  border-collapse: collapse; /* This will ensure that borders from adjacent cells are combined into a single border */
`;

const Th = styled.th`
  border: 1px solid #000; /* This adds a border to your table header cells */
  padding: 10px; /* Add some padding so content isn't right up against the border */
`;

const Td = styled.td`
  border: 1px solid #000; /* This adds a border to your table data cells */
  padding: 10px; /* Add some padding so content isn't right up against the border */
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

  // Add a new state to store the scores
  const [scores, setScores] = useState(Array(playerCount).fill().map(() => Array(10).fill('')));

  // Update scores state when playerCount changes
  useEffect(() => {
    setScores(Array(playerCount).fill().map(() => Array(10).fill('')));
  }, [playerCount]);

  const handleScoreChange = (playerIndex, roundIndex, event) => {
    const newScores = [...scores];
    newScores[playerIndex][roundIndex] = event.target.value;
    setScores(newScores);
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
              <Th>Round</Th>
              {players.map((player, index) => (
                <Th key={index}>{player.name}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, i) => (
              <tr key={i}>
                <Td>{i + 1}</Td>
                {players.map((player, index) => (
                  <Td key={index}>
                    <input type="number" step="5" value={scores[index][i]} onChange={(event) => handleScoreChange(index, i, event)} />
                  </Td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
      {/*}
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
*/}

export default CardGames;
