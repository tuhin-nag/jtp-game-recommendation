import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from '../components/Carousel';
import GameCard from '../components/GameCard';
import './home.css';

const Home = () => {
  const [recommendedGames, setRecommendedGames] = useState([]);
  const [topGames, setTopGames] = useState([]);
  const [genreGames, setGenreGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [renderContent, setRenderContent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recommendedResponse, topResponse, genreResponse] = await Promise.all([
          axios.get('http://localhost:5000/recommend'),
          axios.get('http://localhost:5000/top_10'),
          axios.get('http://localhost:5000/top_in_genre/action'),
        ]);

        setRecommendedGames(recommendedResponse.data.data);
        // console.log(recommendedResponse.data.data)
        setTopGames(topResponse.data.data);
        setGenreGames(genreResponse.data.data);
        setIsLoading(false);
        setRenderContent(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : renderContent ? (
    <div className='outer'>
      <div className="carousel-container">
        <Carousel games={recommendedGames.length > 0 ? recommendedGames : topGames} />
      </div>
      <div className="section-1">
        <h1>Action Games</h1>
        <div className="section-1-content-container">
          <div className="primary-carousel">
            {genreGames.map((game) => (
              <GameCard key={game.name} game={game} />
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Home;