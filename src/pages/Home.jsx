import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from '../components/Carousel';
import GameCard from '../components/GameCard';
import './Home.css';

const Home = () => {
  const [recommendedGames, setRecommendedGames] = useState([]);
  const [topGames, setTopGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [renderContent, setRenderContent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recommendedResponse, topResponse, genreResponse] = await Promise.all([
          axios.get('http://localhost:5000/recommend'),
          axios.get('http://localhost:5000/top_10'),
        ]);

        setRecommendedGames(recommendedResponse.data.data);
        // console.log(recommendedResponse.data.data)
        setTopGames(topResponse.data.data);
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
    </div>
  ) : null;
};

export default Home;