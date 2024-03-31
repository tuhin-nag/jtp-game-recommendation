import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './carousel.css';

const Carousel = ({ games }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + games.length) % games.length);
    console.log(games[currentIndex].header_image)
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % games.length);
  };

  const handleMouseEnter = (e) => {
    setIsHovered(true);
  }
  const handleMouseLeave = (e) => {
    setIsHovered(false);
  }

  const handleClickAddToLibrary = async () => {
    setIsAdded(!isAdded);
    if (!isAdded) {
      try {
        const response = await axios.get(`http://localhost:5000/add_to_library/${games[currentIndex].name}`);
        if (response.data.data) {
          console.log('Game added to library:', response.data);
        } else {
          console.error('Failed to add game to library:', response.data);
        }
      } catch (error) {
        console.error('Error calling API:', error);
      }
    }
  }
  return (
    <div>
      <div className="button-container">
        <div className="arrow hero-options" id="left" onClick={handlePrev}></div>
        <div className="caoursel-total-display hero-options">
          {games.map((game, index) => (
            <div
              key={index}
              className="list-item"
              data-highlighted={index === currentIndex ? "" : null}
            ></div>
          ))}
        </div>
        <div className="arrow hero-options" id="right" onClick={handleNext}></div>
      </div>
      <img className="main-content-carousel" src={games[currentIndex].header_image} alt={games[currentIndex].name} />
    </div>
  );
};

export default Carousel;