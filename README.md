# Video Game Recommender

This is a full-stack web application that provides video game recommendations based on user preferences and their library. The application utilizes Flask for the backend and React for the frontend.
## Table of Contents

- [Features](#features)
- [Recommendation System](#recommendation-system)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [With Docker](#with-docker)
  - [Without Docker](#without-docker)
- [Usage](#usage)
- [Implementation](#implementation)

## Features

- Search for games by name
- Filter games by genre, category, and platform
- View top games overall and top games in specific genres
- Add games to a personal library
- Get personalized game recommendations based on your library

## Recommendation System
- The games are recommended based on their similarity, scored by a metric called [cosine similarity](https://www.geeksforgeeks.org/cosine-similarity/)
- When compared to other recommendation methods, such as KMeans or Jaccardian similarity, this gave the best results
- Similarity is scored on the basis of the games' genre, developer, category and rating

## Technologies Used
- Docker
### Backend
- Python
- Flask
- MySQL

### Frontend

- React
- HTML
- CSS

Although I am more familiar with Django, I personally feel like Django has too much boilerplate, so I wanted to try my hand at something new. MySQL is the DBMS that I am most familiar with, and since I wanted to focus on the website's functionality, I went with it to ensure a smooth development process. I am proficient in React and using components is always great for code modularity, which is why I chose it for the frontend.

## Prerequisites

- Docker 

Install Docker by following the instructions [here](https://docs.docker.com/get-docker/).

- Docker Compose

Install Docker Compose by following the instructions [here](https://docs.docker.com/compose/install/).

- Git

Install Git by following the instructions [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

## Installation
### With Docker

1. Clone the repository:
    ```bash
    git clone https://github.com/tuhin-nag/jtp-game-recommendation.git
    ```
2. Navigate to the project directory:
    ```bash
    cd video-game-recommender
    ```
3. Run docker-compose up:
    ```bash
    docker-compose up --build
    ```
4. Open your web browser and navigate to http://localhost:5173 to access the application.
    #### Notes
   - Do not worry if this takes a long time initially, Docker has to download all the necessary files for the application to run. On your following launches, the process will be much quicker!
   - Until the backend and database are fully ready and communicating, the page will display "Loading...". While this is on the screen, please wait patiently, the page will load automatically. During the loading time, the logs may show errors from the backend, that is due to the implemented retry mechanism and will resolve itself.
   


### Without Docker

1. Clone the repository:
    ```bash
    git clone https://github.com/tuhin-nag/jtp-game-recommendation.git
    ```
2. Navigate to the project directory:
    ```bash
    cd video-game-recommender
    ```
3. Install the required dependencies for the frontend:
    ```bash
    npm install
    ```
4. Install the required dependencies for the backend:
    ```bash
    cd backend
    pip install -r requirements.txt
    ```

5. Set up the MySQL database and import the provided dataset.
   
6. Start the Flask development server:
    ```bash
    flask run
    ```
7. In a separate terminal, start the React development server:
    ```bash
    npm start
    ```
8. Open your web browser and navigate to http://localhost:5173 to access the application.

## Usage

- The homepage displays recommended games, and top games in specific genres.
- Use the search bar to search for games by name.

![image](https://github.com/tuhin-nag/jtp-game-recommendation/assets/68266325/ea1bd74c-7ec5-410a-a992-81e72016ab2e)
- Click on the filter icon to open the filter form and filter games by genre, category, and platform.

![image](https://github.com/tuhin-nag/jtp-game-recommendation/assets/68266325/8054d968-77e9-4553-b712-7accfe63a288)

- Click on the "Add to Library" button to add a game to your personal library.

![image](https://github.com/tuhin-nag/jtp-game-recommendation/assets/68266325/e42b2aff-8bf9-4f6d-9502-626c0fc744b2)

- Navigate to the "Library" page to view and manage your library.

![image](https://github.com/tuhin-nag/jtp-game-recommendation/assets/68266325/04bc1a89-a888-427b-bb8b-6b3cbca00253)

- Return to the "Home Page" to view your recommendations.


## Implementation
#### Home Page 
![home-page](https://github.com/tuhin-nag/jtp-game-recommendation/assets/68266325/7a35c931-7fa5-40ec-9639-5862731e421e)

#### Search Results Page
![search-page](https://github.com/tuhin-nag/jtp-game-recommendation/assets/68266325/94a52869-3931-49a5-9c23-b50dbcbd7939)

#### Library Page
![library-page](https://github.com/tuhin-nag/jtp-game-recommendation/assets/68266325/cf7733b3-2cef-4a21-b3c4-75d58de3b375)

