import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './carousel.css';

const Carousel = ({ games }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(Array(games.length).fill(false));
  console.log(isAdded)

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + games.length) % games.length);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % games.length);
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/is_in_library/${games[currentIndex].name}`)
      .then(response => {
        const updatedIsAdded = [...isAdded];
        updatedIsAdded[currentIndex] = response.data.data;
        setIsAdded(updatedIsAdded);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [currentIndex]);

  const handleClickAddToLibrary = async () => {
    const updatedIsAdded = [...isAdded];
    updatedIsAdded[currentIndex] = !updatedIsAdded[currentIndex];
    setIsAdded(updatedIsAdded);
    if (!isAdded[currentIndex]) {
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
    } else {
      try {
        const response = await axios.get(`http://localhost:5000/remove_from_library/${games[currentIndex].name}`);
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
    <div>
      <div className="recommended-text">RECOMMENDED FOR YOU</div>
      <div className='main-carousel-container'>
        <div className='text-container'>
          <div className='carousel-title'>{games[currentIndex].name}</div>
          {!isAdded[currentIndex] ? (
            <div className="add-library-container">
              <div className="button-content" onClick={handleClickAddToLibrary}>
                <span className="button-text">Add To Library</span>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="bookmark"
                  height="30"
                  width="30"
                  viewBox="0 0 384 512">
                  <path fill="#ffffff" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="add-library-container">
              <div className="button-content" onClick={handleClickAddToLibrary}>
                <span className="button-text">Remove From Library</span>
                <svg
                  className="bookmark"
                  xmlns="http://www.w3.org/2000/svg"
                  height="30"
                  width="30"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="#ffffff"
                    d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
        <img className="main-content-carousel" src={games[currentIndex].header_image} alt={games[currentIndex].name} />
      </div>
      <div className='footer'>
        <div className='navigation-container' onClick={handlePrev}>
          <svg className='left-arrow' xmlns="http://www.w3.org/2000/svg" height='20px' width='20px' viewBox="0 0 320 512"><path fill="#ffffff" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" /></svg>
          <span className="navigation-text">Previous</span>
        </div>
        <div className="caoursel-total-display hero-options">
          {games.map((game, index) => (
            <div
              key={index}
              className="list-item"
              data-highlighted={index === currentIndex ? "" : null}
            ></div>
          ))}
        </div>
        <div className='navigation-container' onClick={handleNext}>
          <span className="navigation-text">Next</span>
          <svg xmlns="http://www.w3.org/2000/svg" height='20px' width='20px' viewBox="0 0 320 512"><path fill="#ffffff" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
        </div>
      </div>
    </div>
  );
};

export default Carousel;