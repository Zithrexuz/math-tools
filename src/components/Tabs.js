import React from 'react';
import styled from 'styled-components';

/*
const TabContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 10px 0;
`;
*/
const TabContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #333; // Dark background color
  padding: 10px 0;
`;

// 10px margin It's the spacing between tabs
// border-radius: 5px
/*
const TabButton = styled.button`
  margin: 0 10px; 
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ddd;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
`;
*/
const TabButton = styled.button`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
  margin: 0 10px; 
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #555; // Darker button color
  color: #fff; // Light text color
  font-size: 1em; // Larger font size for better mobile compatibility
  font-family: 'Roboto', sans-serif; // Apply the font
  font-weight: 700;
  cursor: pointer;

  transition: background-color 0.3s ease; // Smooth transition on hover

  &:hover {
    background-color: #777; // Lighter color on hover for a subtle effect
  }

  @media (max-width: 600px) { // Media query for better mobile compatibility
    font-size: 1.2em; // Even larger font size on small screens
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
