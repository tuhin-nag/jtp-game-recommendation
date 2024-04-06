import React, { useState } from 'react';
import './styles/navbar.css';
import axios from 'axios';
import FilterForm from './FilterForm';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  // Defines state for filter visibility and search query
  const [isFilter, setIsFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigateTo = useNavigate();

  // Function to handle search input change
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to toggle the filter visibility
  const handleFilterClick = () => {
    setIsFilter(prevIsFilter => {
      console.log(!prevIsFilter)
      return !prevIsFilter;
    });
  };

  // Function to handle search on Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearchClick();
    }
  };

  // Function to handle search click
  const handleSearchClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/get_search_results', {
        search_query: searchQuery
      });
      console.log(response.data.data)
      navigateTo('/search_results', { state: response.data.data });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="navbar-container">
        <div className="logo-container">Video Game Recommender</div>
        <div className="site-control-options">
          <a href="/">Home</a>
          <a href="/library">Library</a>
        </div>
        <div className="search-box">
          <svg xmlns="http://www.w3.org/2000/svg" height='20px' width='20px' className="filter-button" onClick={handleFilterClick} viewBox="0 0 512 512"><path fill="#ffffff" d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" /></svg>
          <input type='text' placeholder='Search' value={searchQuery} onChange={handleInputChange} onKeyDown={handleKeyPress} />
          <svg xmlns="http://www.w3.org/2000/svg" height='20px' width='20px' className="filter-button" onClick={handleSearchClick} viewBox="0 0 512 512"><path fill="#ffffff" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6 .1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" /></svg>
        </div>
      </div>
      <div className={`filter-container ${!isFilter ? 'hidden' : ''}`}>
        <FilterForm />
      </div>
    </div>
  );
}

export default NavBar;