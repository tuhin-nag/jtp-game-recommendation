import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import axios from 'axios'
import './library.css'
import LibraryCard from '../components/LibraryCard'

function Library() {
  const [games, setGames] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/get_library')
      .then(response => {
        setGames(response.data.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

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


  return (
    <div>
      <NavBar />
      <div className='library-container-container'>
        <div className='library-container'>

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