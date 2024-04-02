import React, { useState } from 'react';
import './filterform.css';

const FilterForm = () => {
  const [genre, setGenre] = useState('');
  const [category, setCategory] = useState('');
  const [platform, setPlatform] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to an API or update state
    console.log('Genre:', genre);
    console.log('Category:', category);
    console.log('Platform:', platform);
  };

  return (
    <div className="filter-form">
      <h2>Filter Games</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="genre">Genre</label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Select genre</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="RPG">RPG</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="Singleplayer">Singleplayer</option>
            <option value="Multiplayer">Multiplayer</option>
            <option value="Co-op">Co-op</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="platform">Platform</label>
          <select
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="">Select platform</option>
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
          </select>
        </div>
        <button type="submit">Filter Games</button>
      </form>
    </div>
  );
};

export default FilterForm;
