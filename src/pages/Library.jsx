import React from 'react'
import NavBar from '../components/NavBar'
import './library.css'

function Library() {

  return (
    <div>
      <NavBar />
      <div className='library-container-container'>
        <div className='library-container'>
        </div>
        <div className='library-container'>
        </div>
      </div>
    </div>
  )
}

export default Library