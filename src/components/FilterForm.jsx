import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/filterform.css';
import { useNavigate } from 'react-router-dom';

const FilterForm = () => {
  // Defines state for filter options
  const [genre, setGenre] = useState('');
  const [category, setCategory] = useState('');
  const [platform, setPlatform] = useState('');
  const navigateTo = useNavigate();

  // Defines state for available platforms and genres
  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState([]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/get_filter_results', {
        genre: genre,
        category: category,
        platform: platform
      });
      console.log(response.data.data)
      navigateTo('/search_results', { state: response.data.data });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetches available platforms and genres on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genresResponse, platformsResponse] = await Promise.all([
          axios.get('http://localhost:5000/get_genres'),
          axios.get('http://localhost:5000/get_platforms')
        ]);
        setGenres(genresResponse.data.data);
        setPlatforms(platformsResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="filter-form">
      <form onSubmit={handleSubmit}>
        <h2>Filter Games</h2>
        <div className="mb-4">
          <label htmlFor="genre">Genre</label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Select genre</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
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
            <option value="Single-player">Single-player</option>
            <option value="Multi-player">Multi-player</option>
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
            {platforms.map((platform, index) => (
              <option key={index} value={platform}>
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Filter Games</button>
      </form>
    </div>
  );
};

export default FilterForm;
