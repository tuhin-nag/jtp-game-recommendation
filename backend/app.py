from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from flask_cors import CORS
import model_loader


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost:3306/games'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

library = []
encoder = model_loader.load_encoder()
model = model_loader.load_model()


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


@app.route('/header_image/<name>')
def header_image(name):
    appid = get_appid_from_name(name)
    sql_query = text(
        'SELECT header_image FROM media where appid = :appid')
    cursor = db.session.execute(sql_query, {'appid': appid})
    results = cursor.fetchall()
    data = {'header_image': results[0].header_image,
            'name': name}
    cursor.close()
    return {'data': data}


@app.route('/add_to_library/<name>')
def add_to_library(name):
    library.append(get_appid_from_name(name))
    return {'data': library}


@app.route('/get_library')
def get_library():
    return {'data': library}


@app.route('/remove_from_library/<name>')
def remove_from_library(name):
    library.remove(get_appid_from_name(name))
    return {'data': library}


@app.route('/recommend')
def recommend():
    if len(library) == 0:
        return {'data': []}
    recommendations = get_recommendations(
        encoder.transform([library[0]])[0], 10)
    rec = [{'name': get_name_from_appid(
        id), 'header_image': get_header_image(id)} for id in recommendations]
    return {'data': rec}


def get_recommendations(item_id, top_n=5):
    sim_scores = model[item_id]
    top_similar_items = sim_scores.argsort()[::-1][1:top_n+1]
    top_similar_items = [encoder.inverse_transform(
        [i])[0] for i in top_similar_items]
    return top_similar_items


def get_appid_from_name(name):
    sql_query = text(
        'SELECT appid FROM games where name = :name')
    cursor = db.session.execute(sql_query, {'name': name})
    results = cursor.fetchall()
    appid = results[0].appid
    return appid


def get_name_from_appid(appid):
    sql_query = text(
        'SELECT name FROM games where appid = :appid')
    cursor = db.session.execute(sql_query, {'appid': appid})
    results = cursor.fetchall()
    name = results[0].name
    return name


def get_header_image(appid):
    sql_query = text(
        'SELECT header_image FROM media where appid = :appid')
    cursor = db.session.execute(sql_query, {'appid': appid})
    results = cursor.fetchall()
    header_image = results[0].header_image
    return header_image


if __name__ == '__main__':
    app.run(debug=True)
