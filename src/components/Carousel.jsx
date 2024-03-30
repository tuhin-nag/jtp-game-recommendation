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
    if (isAdded) {
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
    <div className="carousel">
      <div className="carousel-item">
        <button className="prev-btn" onClick={handlePrev}>
          &lt;
        </button>
        <div className="image-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <img src={games[currentIndex].header_image} alt={games[currentIndex].name} />
          {isHovered && (
            <div
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: '15px 20px',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}
              onClick={handleClickAddToLibrary}
            >
              {isAdded ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : (
                <span style={{ fontSize: '18px', color: 'white' }}>
                  Add to Library
                </span>
              )}
            </div>
          )}
          <div className="carousel-item-details">
            <h3>{games[currentIndex].name}</h3>
          </div>
        </div>
        <button className="next-btn" onClick={handleNext}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;