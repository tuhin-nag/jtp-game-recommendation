# Video Game Recommender

This is a full-stack web application that provides video game recommendations based on user preferences and their library. The application utilizes Flask for the backend and React for the frontend.

## Features

- Search for games by name
- Filter games by genre, category, and platform
- View top games overall and top games in specific genres
- Add games to a personal library
- Get personalized game recommendations based on your library

## Technologies Used

### Backend

- Flask
- MySQL

### Frontend

- React

## Installation (with Docker)

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
4. Open your web browser and navigate to http://localhost:8080 to access the application.

## Installation (without Docker)

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
8. Open your web browser and navigate to http://localhost:8080 to access the application.

## Usage

- The homepage displays recommended games, and top games in specific genres.
- Use the search bar to search for games by name.
- Click on the filter icon to open the filter form and filter games by genre, category, and platform.
- Click on the "Add to Library" button to add a game to your personal library.
- Navigate to the "Library" page to view and manage your library.
