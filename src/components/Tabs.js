import React from 'react';

function Tabs({ onChange }) {
  return (
    <div>
      <button onClick={() => onChange('home')}>Home</button>
      <button onClick={() => onChange('cardGames')}>Card Games</button>
      {/* Add your other tabs here */}
    </div>
  );
}

export default Tabs;
