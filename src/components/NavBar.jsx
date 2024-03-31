import React from 'react'
import './navbar.css'

function NavBar() {
  return (
    <div>
      <div className="navbar-container">
        <div className="logo-container">Baldur's Gate Sweep</div>
        <div className="site-control-options">
          <a href="">Home</a>
          <a href="">Library</a>
          {/* <a href="">Library</a> */}
        </div>
        <div className="user-control-options">
          <div className="search-button">
            <img
              src="/magnifying-glass-solid.svg"
              alt=""
              data-active="false"
              id="search-icon"
            // onClick={revealMoreOptions()}
            /><textarea
              id="search-text"
              rows="1"
            ></textarea>
            <img
              src="../assets/filter-solid.svg"
              alt=""
              id="filter"
            /></div>
        </div>
      </div>
    </div>
  )
}

export default NavBar