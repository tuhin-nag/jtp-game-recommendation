import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './gamecard.css';

const GameCard = ({ game }) => {
  const { header_image, name } = game
  const [isAdded, setIsAdded] = useState(false);


  const handleClickAddToLibrary = async () => {
    setIsAdded(!isAdded);
    if (!isAdded) {
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
    } else {
      try {
        const response = await axios.get(`http://localhost:5000/remove_from_library/${game.name}`);
        if (response.data.data) {
          console.log('Game removed from library:', response.data);
        } else {
          console.error('Failed to remove game from library:', response.data);
        }
      } catch (error) {
        console.error('Error calling API:', error);
      }
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
        {!isAdded ? (
          <svg xmlns="http://www.w3.org/2000/svg"
            className="save-game"
            height="30"
            width="30"
            viewBox="0 0 384 512"
            onClick={handleClickAddToLibrary}><path fill="#ffffff" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" /></svg>
        ) : (
          <svg
            className="save-game"
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            width="30"
            viewBox="0 0 384 512"
            onClick={handleClickAddToLibrary}
          >
            <path
              fill="#ffffff"
              d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

export default GameCard;