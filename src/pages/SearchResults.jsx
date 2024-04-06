import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './styles/searchresults.css';
import NavBar from '../components/NavBar';
import Result from '../components/Result';

function SearchResults() {
  const location = useLocation();
  const searchResults = location.state;
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);

  const totalPages = Math.ceil(searchResults.length / resultsPerPage);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo(0, 0);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <NavBar />
      <div className='results-container-container'>
        <div className="pagination">
          <div className="left-content">Search Results</div>
          <div className="right-content">
            <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
            <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>
        <div className='results-container'>
          {currentResults.map((game, index) => (
            <Result key={index} game={game} />
          ))}
        </div>
        <div className="pagination">
          <div className="left-content"></div>
          <div className="right-content">
            <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
            <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
