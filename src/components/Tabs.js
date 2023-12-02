/*
import React from 'react';

function Tabs({ onChange }) {
  return (
    <div>
      <button onClick={() => onChange('home')}>Home</button>
      <button onClick={() => onChange('cardGames')}>Card Games</button>
      {/* Add your other tabs here //}
    </div>
  );
}

export default Tabs;
*/

import React from 'react';
import styled from 'styled-components';

const TabContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 10px 0;
`;

// 10px margin
const TabButton = styled.button`
  margin: 0 20px; 
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ddd;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
`;

function Tabs({ onChange, gameCreated }) {
  const handleTabChange = (newTab) => {
    if (!gameCreated) {
      onChange(newTab);
    }
  };

  return (
    <TabContainer>
      <TabButton onClick={() => handleTabChange('home')}>Home</TabButton>
      <TabButton onClick={() => handleTabChange('cardGames')}>Card Games</TabButton>
      {/* Add your other tabs here */}
    </TabContainer>
  );
}

export default Tabs;
