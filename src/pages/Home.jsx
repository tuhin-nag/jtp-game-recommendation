import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from '../components/Carousel';
import GameCard from '../components/GameCard';
import NavBar from '../components/NavBar';
import './styles/home.css';

const Home = () => {
  // Defines state variables
  const [recommendedGames, setRecommendedGames] = useState([]);
  const [topGames, setTopGames] = useState([]);
  const [actionGames, setActionGames] = useState([]);
  const [rpgGames, setRpgGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [renderContent, setRenderContent] = useState(false);

  // Fetches data from the backend 
  useEffect(() => {

    const RETRY_LIMIT = 100; // Number of retries
    const RETRY_DELAY = 5000; // Delay between retries in milliseconds

    const fetchDataWithRetry = async (url) => {
      let retries = 0;
      while (retries < RETRY_LIMIT) {
        try {
          const response = await axios.get(url);
          return response.data.data;
        } catch (error) {
          console.error('Internal server error. Retrying...');
          retries++;
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));

        }
      }
      throw new Error('Failed to fetch data after maximum retries.');
    };
    const fetchData = async () => {
      try {
        const [recommendedResponse, topResponse, actionResponse, rpgResponse] = await Promise.all([
          fetchDataWithRetry('http://localhost:5000/recommend'),
          fetchDataWithRetry('http://localhost:5000/top_10'),
          fetchDataWithRetry('http://localhost:5000/top_in_genre/action'),
          fetchDataWithRetry('http://localhost:5000/top_in_genre/rpg'),
        ]);

        setRecommendedGames(recommendedResponse);
        setTopGames(topResponse);
        setActionGames(actionResponse);
        setRpgGames(rpgResponse)
        setIsLoading(false);
        setRenderContent(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Renders loading indicator if data is being fetched, otherwise renders the content
  return isLoading ? (
    <div className='loading'>Loading...</div>
  ) : renderContent ? (
    <div className='outer'>
      <NavBar />
      <div className="carousel-container">
        <Carousel games={recommendedGames.length > 0 ? recommendedGames : topGames} />
      </div>
      <div className="section-1">
        <h1>Action Games</h1>
        <div className="section-1-content-container">
          <div className="primary-carousel">
            {actionGames.map((game) => (
              <GameCard key={game.name} game={game} />
            ))}
          </div>
        </div>
      </div>
      <div className="section-1">
        <h1>RPG Games</h1>
        <div className="section-1-content-container">
          <div className="primary-carousel">
            {rpgGames.map((game) => (
              <GameCard key={game.name} game={game} />
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Home;