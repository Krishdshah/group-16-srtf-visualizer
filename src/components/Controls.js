import React from 'react';

const Controls = ({ onStart, onReset, isRunning, isFinished }) => {
  return (
    <div className="controls">
      <button onClick={onStart} disabled={isRunning || isFinished}>
        ▶️ Start
      </button>
      <button onClick={onReset}>🔄 Reset</button>
    </div>
  );
};

export default Controls;