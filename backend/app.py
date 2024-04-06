from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from flask_cors import CORS
import model_loader
from collections import defaultdict

app = Flask(__name__)
CORS(app)

# Uncomment for containerized version
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@db:3306/games'

# Uncomment for local version
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost:3306/games'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
encoder, model = model_loader.run_pipeline()
library = []


@app.route('/')
def hello_world():
    return 'Hello, World!'


# Route to get top games in a specific genre
@app.route('/top_in_genre/<genre>')
def top_in_genre(genre):
    sql_query = text(
        'SELECT name, appid FROM games where genres = :genre order by positive_ratings desc LIMIT 4')
    cursor = db.session.execute(sql_query, {'genre': genre})
    results = cursor.fetchall()
    data = [{'name': row.name, 'header_image': get_header_image(
        row.appid)} for row in results]
    cursor.close()
    return {'data': data}


# Route to get top 10 games overall
@app.route('/top_10')
def top_ten():
    sql_query = text(
        'SELECT appid, name FROM games order by positive_ratings desc LIMIT 10')
    cursor = db.session.execute(sql_query)
    results = cursor.fetchall()
    data = [{'name': row.name, 'header_image': get_header_image(
        row.appid)} for row in results]
    cursor.close()
    return {'data': data}


# Route to add a game to the user's library
@app.route('/add_to_library/<name>')
def add_to_library(name):
    library.append(get_appid_from_name(name))
    return {'data': library}


# Route to get the user's library
@app.route('/get_library')
def get_library():
    data = [{'name': get_name_from_appid(id),
             'header_image': get_header_image(id),
             'appid': id} for id in library]
    return {'data': data}


# Route to check if a game is in the user's library
@app.route('/is_in_library/<name>')
def is_in_library(name):
    appid = get_appid_from_name(name)
    return {'data': appid in library}


# Route to remove a game from the user's library
@app.route('/remove_from_library/<name>')
def remove_from_library(name):
    appid = get_appid_from_name(name)
    if appid in library:
        library.remove(appid)
        return {'data': library}


# Route to clear the user's library
@app.route('/clear_library')
def clear_library():
    library.clear()
    return {'data': library}


# Route to get a list of genres
@app.route('/get_genres')
def get_genres():
    sql_query = text(
        'SELECT distinct genres FROM games WHERE genres NOT LIKE "%;%" LIMIT 8')
    cursor = db.session.execute(sql_query)
    results = cursor.fetchall()
    genres = [row.genres for row in results]
    cursor.close()
    return {'data': genres}


# Route to get a list of platforms
@app.route('/get_platforms')
def get_platforms():
    sql_query = text(
        'SELECT distinct platforms FROM games WHERE platforms NOT LIKE "%;%" LIMIT 8')
    cursor = db.session.execute(sql_query)
    results = cursor.fetchall()
    platforms = [row.platforms for row in results]
    cursor.close()
    return {'data': platforms}


# Route to get filtered game results based on genre, category, and platform
@app.route('/get_filter_results', methods=['POST'])
def get_filter_results():
    data = request.json
    genre = data.get('genre')
    category = data.get('category')
    platform = data.get('platform')
    sql_query = text(
        'SELECT name, appid FROM games where genres like :genre and categories like :category and platforms like :platform order by positive_ratings desc LIMIT 10')
    cursor = db.session.execute(sql_query, {
                                'genre': '%'+genre+'%', 'category': '%'+category+'%', 'platform': '%'+platform+'%'})
    results = cursor.fetchall()
    data = [{'appid': row.appid, 'name': row.name, 'header_image': get_header_image(
        row.appid)} for row in results]
    cursor.close()
    return {'data': data}


# Route to get search results based on a search query
@app.route('/get_search_results', methods=['POST'])
def get_search_results():
    data = request.json
    search_query = data.get('search_query')
    sql_query = text(
        'SELECT name, appid FROM games where name like :search_query order by positive_ratings desc LIMIT 10')
    cursor = db.session.execute(sql_query, {
                                'search_query': '%'+search_query+'%'})
    results = cursor.fetchall()
    data = [{'appid': row.appid, 'name': row.name, 'header_image': get_header_image(
        row.appid)} for row in results]
    cursor.close()
    return {'data': data}


# Route to get game recommendations based on the user's library
@app.route('/recommend')
def recommend():
    if len(library) == 0:
        return {'data': []}

    detailed_library = [{'appid': id, 'name': get_name_from_appid(
        id), 'genre': get_genre(id), 'rating': get_rating(id)} for id in library]

    highest_rated_apps = defaultdict(
        lambda: {'appid': None, 'rating': float('-inf')})

    for app in detailed_library:
        name = app['name']
        genre = app['genre']
        rating = app['rating']
        if rating > highest_rated_apps[genre]['rating']:
            highest_rated_apps[genre] = {
                'appid': app['appid'], 'name': name, 'rating': rating}

    recs = []
    num_recs_per_genre = 12 // len(highest_rated_apps)
    for genre in highest_rated_apps:
        if highest_rated_apps[genre]['appid'] is not None:
            recommendations = get_recommendations(encoder.transform(
                [highest_rated_apps[genre]['appid']])[0], num_recs_per_genre)
            recs.extend(recommendations)

    rec = [{'name': get_name_from_appid(
        id), 'header_image': get_header_image(id)} for id in recs]
    return {'data': rec}


# Helper function to get recommendations based on item ID and number of recommendations
def get_recommendations(item_id, top_n=5):
    sim_scores = model[item_id]
    top_similar_items = sim_scores.argsort()[::-1][1:top_n+1]
    top_similar_items = [encoder.inverse_transform(
        [i])[0] for i in top_similar_items]
    return top_similar_items


# Helper function to get appid from game name
def get_appid_from_name(name):
    sql_query = text(
        'SELECT appid FROM games where name = :name')
    cursor = db.session.execute(sql_query, {'name': name})
    results = cursor.fetchall()
    appid = results[0].appid
    return appid


# Helper function to get game name from appid
def get_name_from_appid(appid):
    sql_query = text(
        'SELECT name FROM games where appid = :appid')
    cursor = db.session.execute(sql_query, {'appid': appid})
    results = cursor.fetchall()
    name = results[0].name
    return name


# Helper function to get header image URL from appid
def get_header_image(appid):
    sql_query = text(
        'SELECT header_image FROM media where appid = :appid')
    cursor = db.session.execute(sql_query, {'appid': appid})
    results = cursor.fetchall()
    header_image = results[0].header_image
    return header_image


# Helper function to get genre from appid
def get_genre(appid):
    sql_query = text(
        'SELECT genres FROM games where appid = :appid')
    cursor = db.session.execute(sql_query, {'appid': appid})
    results = cursor.fetchall()
    genre = results[0].genres
    return genre


# Helper function to get rating from appid
def get_rating(appid):
    sql_query = text(
        'SELECT positive_ratings FROM games where appid = :appid')
    cursor = db.session.execute(sql_query, {'appid': appid})
    results = cursor.fetchall()
    positive_ratings = results[0].positive_ratings
    return positive_ratings


# Entry point for the Flask application
if __name__ == '__main__':
    app.run(host='0.0.0.0')
