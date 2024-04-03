import React from 'react';
import { useLocation } from 'react-router-dom';
import './searchresults.css';
import NavBar from '../components/NavBar';
import Result from '../components/Result';

function SearchResults() {
  const location = useLocation();
  const searchResults = location.state;
  console.log(searchResults);

  return (
    <div>
      <NavBar />
      <div className='results-container-container'>
        <div className='results-container'>
          {searchResults.data.map((game, index) => (
            <Result key={index} game={game} />
          ))
          }
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
