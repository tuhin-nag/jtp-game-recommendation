import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import axios from 'axios'
import './styles/library.css'
import LibraryCard from '../components/LibraryCard'

function Library() {
  const [games, setGames] = useState([])
  // Function to fetch the user's library
  useEffect(() => {
    axios.get('http://localhost:5000/get_library')
      .then(response => {
        setGames(response.data.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  // Function to fetch the user's library again
  const fetchDataAgain = () => {
    axios.get('http://localhost:5000/get_library')
      .then(response => {
        setGames(response.data.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }
  console.log(games)

  // Function to clear the user's library
  const clearLibrary = () => {
    axios.get('http://localhost:5000/clear_library')
      .then(response => {
        setGames([])
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }


  return (
    <div>
      <NavBar />
      <div className='library-container-container'>
        <div className='library-container'>
          <button className='clear-all' onClick={clearLibrary}>Clear Library</button>
          {games.map(game => {
            return (
              <div>
                <div className='column-game-title' key={game.appid}>{game.name}</div>
                <hr className="divider" />
              </div>
            )
          })}
        </div>
        <div className='grid-container'>
          {games.map((game) => (
            <LibraryCard key={game.appid} game={game} fetchDataAgain={fetchDataAgain} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Library