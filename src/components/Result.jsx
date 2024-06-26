import React, { useState, useEffect } from 'react';
import './styles/result.css';
import axios from 'axios';

const Result = ({ game }) => {
  // Defines state for whether the game is added to the library
  const [isAdded, setIsAdded] = useState(false);

  // Fetches the library status of the game on component mount
  useEffect(() => {
    axios.get(`http://localhost:5000/is_in_library/${game.name}`)
      .then(response => {
        setIsAdded(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Function to add or remove the game from the library
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
    <div>
      <div className="result">
        <img src={game.header_image} alt={game.name} />
        <p className="text">{game.name}</p>
        {!isAdded ? (
          <div className="add-to-library-container">
            <div className="save-button-content" onClick={handleClickAddToLibrary}>
              <span className="button-text">Add To Library</span>
              <svg xmlns="http://www.w3.org/2000/svg"
                className="save-game"
                height="30"
                width="30"
                viewBox="0 0 384 512">
                <path fill="#ffffff" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="add-to-library-container">
            <div className="save-button-content" onClick={handleClickAddToLibrary}>
              <span className="button-text">Remove From Library</span>
              <svg
                className="save-game"
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
      <hr className="divider" />
    </div>
  );
}

export default Result;