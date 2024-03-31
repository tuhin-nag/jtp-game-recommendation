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
          cursor: 'pointer',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '1rem',
        }}></div>
      <div className="game-title">
        <span>{game.name}</span>
        {/* <button className="save-game" onClick={handleClickAddToLibrary}></button> */}
        <svg className='save-game' xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 384 512" onClick={handleClickAddToLibrary}><path fill="#ffffff" d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" /></svg>
      </div>
    </div>
  );
}

export default GameCard;