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

const TabButton = styled.button`
  margin: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ddd;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
`;

function Tabs({ onChange }) {
  return (
    <div>
      <TabButton onClick={() => onChange('home')}>Home</TabButton>
      <TabButton onClick={() => onChange('cardGames')}>Card Games</TabButton>
      {/* Add your other tabs here */}
    </div>
  );
}

export default Tabs;
