import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './gamecard.css';

const GameCard = ({ game }) => {
  const { header_image, name } = game
  console.log(header_image)
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    e.currentTarget.style.transform = 'scale(0.7)';
  }
  const handleMouseLeave = (e) => {
    setIsHovered(false);
    e.currentTarget.style.transform = 'scale(0.6)';
  }

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
          aspectRatio: '16/9',
          borderRadius: '0.32rem',
          backgroundImage: `url(${header_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          cursor: 'pointer'
        }}></div>
      <div className="game-title">
        <span>{game.name}</span>
        <button className="save-game"></button>
      </div>
    </div>
  );
}

export default GameCard;