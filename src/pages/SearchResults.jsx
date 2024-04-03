import React from 'react';
import { useLocation } from 'react-router-dom';

function SearchResults() {
  const location = useLocation();
  const searchResults = location.state;
  console.log(searchResults);

  return (
    <div>
      <h2>Results:</h2>
      <ul>
        {searchResults.data.map((item, index) => (
          <li key={index}>
            appid: {item.appid}, name: {item.name}, header: {item.header_image}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
