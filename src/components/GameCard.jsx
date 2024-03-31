import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './gamecard.css';

const GameCard = ({ game }) => {
  const { header_image, name } = game
  const [isAdded, setIsAdded] = useState(false);


  const handleClickAddToLibrary = async () => {
    setIsAdded(!isAdded);
    try {
      const response = await axios.get(`http://localhost:5000/add_to_library/${game.name}`);
      if (response.data.data) {
        console.log('Game added to library:', response.data);
      } else {
        console.error('Failed to add game to library:', response.data);
      }
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };
  return (
    <div className="game-card-container">
      <div
        className='game-card'
        style={{
          width: '90%',
          aspectRatio: '460/215',
          borderRadius: '0.32rem',
          backgroundImage: `url(${header_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          cursor: 'pointer'
        }}></div>
      <div className="game-title">
        <span>{game.name}</span>
        <button className="save-game" onClick={handleClickAddToLibrary}></button>
      </div>
    </div>
  );
}

export default GameCard;