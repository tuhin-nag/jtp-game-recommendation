import React from 'react';

const Result = ({ game }) => {
  return (
    <div className="image-with-text">
      <img src={game.header_image} alt={game.name} />
      <p className="text">{game.name}</p>
      <hr className="divider" />
    </div>
  );
}

export default Result;