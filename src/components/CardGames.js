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
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [currentScore, setCurrentScore] = useState('');
  const [totalScores, setTotalScores] = useState(Array(playerCount).fill(0));
  // Initialize roundScores state
  const [roundScores, setRoundScores] = useState(Array(playerCount).fill().map(() => Array(10).fill('')));


  const handleCreatePlayers = () => {
    setGameStarted(true);
  };

  const handlePlayerCountChange = (event) => {
    const count = Math.min(event.target.value, 10); // Limit the number of players to 10
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

  // Update roundScores state when playerCount changes
  useEffect(() => {
    setRoundScores(Array(playerCount).fill().map(() => Array(10).fill('')));
  }, [playerCount]);

  
  const handleScoreChange = (event) => {
    setCurrentScore(event.target.value);
  };


  const handleScoreSubmit = () => {
    console.log(currentRoundIndex);
    if (currentScore && currentScore % 5 === 0 && currentRoundIndex < 10) { // Check if the input field is not empty, the number is a multiple of 5, there are more rounds, and there are more players /////&& currentPlayerIndex < playerCount
      const newScores = [...scores];
      const score = parseInt(currentScore);

      //newScores[currentPlayerIndex][currentRoundIndex] = currentScore;
      newScores[currentPlayerIndex][currentRoundIndex] = score; // Update the score for the current player
      setScores(newScores);

      // Calculate the total score for the current player
      const newTotalScores = [...totalScores];
      //newTotalScores[currentPlayerIndex] += score;
      newTotalScores[currentPlayerIndex] = (newTotalScores[currentPlayerIndex] || 0) + score; // Adding the previous rounds score.
      setTotalScores(newTotalScores);


      // Update roundScores
      const newRoundScores = [...roundScores];
      newRoundScores[currentPlayerIndex][currentRoundIndex] = newTotalScores[currentPlayerIndex];
      setRoundScores(newRoundScores);


      setCurrentScore(''); // Reset the current score
      if (currentPlayerIndex < playerCount - 1) {
        setCurrentPlayerIndex(currentPlayerIndex + 1); // Move to the next player
      } else {
        setCurrentPlayerIndex(0); // Reset to the first player
        if (currentRoundIndex < 10) { // Check if there are more rounds
          setCurrentRoundIndex(currentRoundIndex + 1); // Move to the next round
        }
      }
    }
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
        <>
          <input type="number" value={currentScore} onChange={handleScoreChange} placeholder={`Enter points for ${players[currentPlayerIndex]?.name}`} />
          <button onClick={handleScoreSubmit}>Submit</button>
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
                    {/* <input type="number" step="5" value={scores[index][i]} onChange={(event) => handleScoreChange(index, i, event)} /> */}
                    {/* <input type="number" value={totalScores[index] + ' (' + scores[index][i] + ')'} onChange={(event) => handleScoreChange(index, i, event)} /> {/* Added this for showing the total score and the currentscore for each round in the table cells. */}
                    {/* <input type="number" value={(totalScores[index] || 0) + ' (' + (scores[index][i] || 0) + ')'} onChange={(event) => handleScoreChange(index, i, event)} /> */}
                    {/*
                    <input type="number" placeholder={totalScores[index] || 0} onChange={(event) => handleScoreChange(index, i, event)} />
                    <span>({scores[index][i] || 0})</span>
                    */}
                    {/* This one is my latest version of the totalscore/display system for score
                    <input type="number" placeholder={i <= currentRoundIndex ? totalScores[index] || 0 : ''} readOnly />
                    <span>({i <= currentRoundIndex ? scores[index][i] || 0 : ''})</span>
                    */}
                  </Td>
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
      {/* Latest version
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
*/}
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
