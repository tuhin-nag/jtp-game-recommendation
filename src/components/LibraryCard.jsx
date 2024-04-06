import React from 'react'
import axios from 'axios'
import './styles/librarycard.css'

const LibraryCard = ({ game, fetchDataAgain }) => {
  // Function to remove the game from the library
  const handleRemoveFromLibrary = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/remove_from_library/${game.name}`)
      if (response.data.data) {
        console.log('Game removed from library:', response.data)
      } else {
        console.error('Failed to remove game from library:', response.data)
      }
    } catch (error) {
      console.error('Error calling API:', error)
    }
    fetchDataAgain()
  }
  return (
    <div className='grid-item'>
      <img src={game.header_image} alt={game.name} />
      <div className='library-card-footer'>
        <div className='library-game-title'>{game.name}</div>
        <div className="library-button" onClick={handleRemoveFromLibrary}>
          <span className="library-button-text">Remove From Library</span>
        </div>
      </div>
    </div>
  )
}

export default LibraryCard