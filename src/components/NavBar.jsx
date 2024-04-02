import React, { useState, useEffect } from 'react';
import './navbar.css';
import FilterForm from './FilterForm';

function NavBar() {
  const [isFilter, setIsFilter] = useState(false);

  const handleFilterClick = () => {
    setIsFilter(prevIsFilter => {
      console.log(!prevIsFilter)
      return !prevIsFilter;
    });
  };

  return (
    <div>
      <div className="navbar-container">
        <div className="logo-container">Video Game Recommender</div>
        <div className="site-control-options">
          <a href="">Home</a>
          <a href="">Library</a>
        </div>
        <div className="search-box">
          <input type='text' placeholder='Search' />
          <svg xmlns="http://www.w3.org/2000/svg" height='20px' width='20px' className="search-button" onClick={handleFilterClick} viewBox="0 0 512 512"><path fill="#ffffff" d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" /></svg>
        </div>
      </div>

      <div className={`filter-container ${!isFilter ? 'hidden' : ''}`}>
        <FilterForm />
      </div>


    </div>
  );
}

export default NavBar;