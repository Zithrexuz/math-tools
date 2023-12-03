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
`;

function CardGames({ players, onPlayerCountChange, onPlayerNameChange, onCreateGame, gameStarted, setGameStarted }) {
  //const [gameStarted, setGameStarted] = useState(false);
  const [playerCount, setPlayerCount] = useState(0);


  useEffect(() => {
    console.log('Game started:', gameStarted);
  }, [gameStarted]);

  useEffect(() => {
    return () => {
      console.log('CardGames component unmounted');
    };
  }, []);


  const handleGameStart = () => {
    //console.log('Before onCreateGame');
    onCreateGame(); // I think here it sets the gamecreated = true
    //console.log('After onCreateGame');
    setGameStarted(true);
    //console.log('Game started:', gameStarted);
  };

  const handlePlayersCreation = () => {
    setPlayers(new Array(playerCount).fill().map(() => ({ name: '', score: new Array(10).fill(0) })));
    setGameStarted(true);
  };

  //useEffect(() => {
  //  console.log('Game started:', gameStarted);
  //}, [gameStarted]);

  console.log(players);

  /*
  return (
    <div>
      <Title>Point Controller</Title>
      {!gameStarted && <CreateButton onClick={handleGameStart}>Create game</CreateButton>}
      {gameStarted && (
        <>
          <input type="number" onChange={onPlayerCountChange} placeholder="Enter number of players" />
          {players.map((player, index) => (
            <div key={index}>
              <PlayerInput type="text" value={player.name} onChange={(event) => onPlayerNameChange(index, event)} placeholder={`Enter name of player ${index + 1}`} /> {/* <PlayerInput type="text" value={player.name} onChange={(event) => onPlayerNameChange(index, event)} placeholder={`Enter name of player ${index + 1}`} /> //}
              <DeleteButton size={20} onClick={() => onPlayerNameChange(index, '')} /> {/* <DeleteButton size={20} onClick={() => onPlayerNameChange(index, '')} /> //}
            </div>
          ))}
          */
  return (
    <div>
      <Title>Point Controller</Title>
      {!gameStarted && <CreateButton onClick={handleGameStart}>Create game</CreateButton>}
      {gameCreated && !gameStarted && (
        <>
          <input type="number" onChange={(event) => setPlayerCount(event.target.value)} placeholder="Enter number of players" />
          <button onClick={handlePlayersCreation}>Enter Player Names</button>
        </>
      )}
      {gameStarted && players.map((player, index) => (
        <div key={index}>
          <PlayerInput type="text" value={player.name} onChange={(event) => onPlayerNameChange(index, event)} placeholder={`Enter name of player ${index + 1}`} />
          <DeleteButton size={20} onClick={() => onPlayerNameChange(index, '')} />
        </div>
      ))}
      {/* }
          <Table>
            <thead>
              <tr>
                <th>Round</th>
                {players.map((player, index) => (
                  <th key={index}>{player.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Add your rounds here //}
            </tbody>
          </Table>
        </>
      )}
      {*/}
    </div>
  );
}

export default CardGames;
