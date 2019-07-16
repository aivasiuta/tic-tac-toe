import React from 'react';

export default ({value, onClick}) => {
  return (
    <button
      className="square"
      onClick={onClick}
    >
      {value}
    </button>
  );
}