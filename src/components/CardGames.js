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

// styling for game indicators like (Winner, currentround and currentplayer)
const ScoreInput = styled.input`
  background-color: ${props => props.score >= 500 ? 'lightgreen' : 'white'};
`;

const HighlightedPlayerInput = styled(PlayerInput)`
  background-color: red;
`;

const HighlightedTd = styled(Td)`
  background-color: #4caf50;
  color: white; // Change the text color to white for better contrast
`;

const DealerIndicator = styled.span`
  font-size: 0.8em;
  margin-left: 5px;
`;

function CardGames() {
  const [playerCount, setPlayerCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [currentScore, setCurrentScore] = useState('');
  const [totalScores, setTotalScores] = useState(Array(playerCount).fill(0));
  const [roundScores, setRoundScores] = useState(Array(playerCount).fill().map(() => Array(10).fill(''))); // Initialize roundScores state
  const [players, setPlayers] = useState(Array(playerCount).fill({ name: '' }));
  const [highlightEmptyFields, setHighlightEmptyFields] = useState(false);
  const [roundCount, setRoundCount] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [dealer, setDealer] = useState(null);

  const handleCreatePlayers = () => {
    setGameStarted(true);
    setPlayers(players.map(player => player || { name: '' })); // Replace null values with objects with empty name properties
  };

  const handlePlayerCountChange = (event) => {
    let count = Math.min(Math.floor(event.target.value), 5); // Limit the number of players to 5
    count = Math.max(count, 0); // Prevent negative numbers

    setPlayerCount(count);
    setPlayers(new Array(count).fill().map((_, i) => ({ name: `Player${i + 1}` }))); // Fill the players array with default names
    //setPlayers(new Array(count).fill(null)); // Fill the players array with null values
  };

  const handlePlayerNameChange = (index, event) => {
    const newPlayers = [...players];
    newPlayers[index] = { name: event.target.value };
    setPlayers(newPlayers);
  };


  const handleShowTable = () => {
    if (players.every(player => player && player.name.trim() !== '') && dealer) {
      console.log('Showing table');
      setShowTable(true);
      setCurrentPlayerIndex(players.findIndex(player => player.name === dealer)); // Set the current player to the dealer
    }
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
    if (currentScore && currentScore % 5 === 0 && currentRoundIndex < roundCount) { // Check if the input field is not empty, the number is a multiple of 5, there are more rounds, and there are more players /////&& currentPlayerIndex < playerCount
      const newScores = [...scores];
      const score = parseInt(currentScore);

      //newScores[currentPlayerIndex][currentRoundIndex] = currentScore;
      newScores[currentPlayerIndex][currentRoundIndex] = score; // Update the score for the current player
      setScores(newScores);

      // Calculate the total score for the current player
      const newTotalScores = [...totalScores];
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
        if (currentRoundIndex < roundCount) { // Check if there are more rounds
          setCurrentRoundIndex(currentRoundIndex + 1); // Move to the next round
        }
      }

      /*
      if (newTotalScores.some(score => score >= 500)) {
        setGameOver(true);
      }
      */
      if (currentPlayerIndex === players.length - 1) { // Check if all players have had their turn
        if (newTotalScores.some(score => score >= 500)) {
          setGameOver(true);
        }
      }
    }
  };
  
  const handleDealerChange = (event) => {
    setDealer(event.target.value);
  };

  const handleAddRound = () => {
    setRoundCount(roundCount + 1);
    setScores(scores.map(playerScores => [...playerScores, '']));
    setRoundScores(roundScores.map(playerScores => [...playerScores, '']));
  };


  const handleNewGame = () => {
    setPlayerCount(0);
    setPlayers([]);
    setScores([]);
    setRoundScores([]);
    setGameOver(false);
    setGameStarted(false);
    setShowTable(false);
    setRoundCount(10);
    setCurrentRoundIndex(0);
    setCurrentScore('');
    setTotalScores(Array(playerCount).fill(0));
    setDealer(null);
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
              {highlightEmptyFields && (!players[index] || players[index].name.trim() === '') ? (
              <HighlightedPlayerInput type="text" value={players[index]?.name || ''} onChange={(event) => handlePlayerNameChange(index, event)} placeholder={`Enter name of player ${index + 1}`} />
            ) : (
              <PlayerInput type="text" value={players[index]?.name || ''} onChange={(event) => handlePlayerNameChange(index, event)} placeholder={`Enter name of player ${index + 1}`} />
            )}
              {/* <PlayerInput type="text" value={players[index]?.name || ''} onChange={(event) => handlePlayerNameChange(index, event)} placeholder={`Enter name of player ${index + 1}`} /> */}
              <DeleteButton size={20} onClick={() => handlePlayerNameChange(index, { target: { value: '' } })} />
            </div>
          ))}
          {playerCount > 0 && players.every(player => player && player.name.trim() !== '') && (
          <>
          <select onChange={handleDealerChange}>
            <option value="">Select dealer</option>
            {players.map((player, index) => (
              <option key={index} value={player.name}>{player.name}</option>
            ))}
          </select>
          {playerCount > 0 && <button onClick={handleShowTable}>Go to table</button>}
        </>
      )}
      </>
      )}
      {showTable && (
        <>
          {!gameOver && <button onClick={handleAddRound}>Add Round</button>}
          {!gameOver && <input type="number" value={currentScore} onChange={handleScoreChange} placeholder={`Enter points for ${players[currentPlayerIndex]?.name}`} />}
          {!gameOver && <button onClick={handleScoreSubmit}>Submit</button>}
          <Table>
          <thead>
            <tr>
              <Th>Round</Th>
              {players.map((player, index) => (
                index === currentPlayerIndex ? <HighlightedTd key={index}>{player.name}{player.name === dealer && <DealerIndicator>(Dealer)</DealerIndicator>}</HighlightedTd> : <Th key={index}>{player.name}{player.name === dealer && <DealerIndicator>(Dealer)</DealerIndicator>}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: roundCount }, (_, i) => (
              <tr key={i}>
                {/* <Td>{i + 1}</Td> */}
                {i === currentRoundIndex ? <HighlightedTd>{i + 1}</HighlightedTd> : <Td>{i + 1}</Td>}
                {players.map((player, index) => (
                  <Td key={index}>
                    <ScoreInput type="number" placeholder={roundScores[index][i] || 0} readOnly score={roundScores[index][i] || 0} />
                    <span>({i <= currentRoundIndex ? scores[index][i] || 0 : ' '})</span>
                  </Td>
                ))}
              </tr>
            ))}
          </tbody>
          </Table>
        </>
      )}
      {gameOver && (
      <>
        <h2>Game Over!</h2>
        <h3>The winner is {players[totalScores.indexOf(Math.max(...totalScores))].name}!</h3>
        <button onClick={handleNewGame}>New Game</button>
      </>
    )}
    </div>
  );
}

export default CardGames;