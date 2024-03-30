from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost:3306/games'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

library = []


@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/get_data')
def get_data():
    print('get_data')
    sql_query = text('SELECT name FROM games LIMIT 5')
    cursor = db.session.execute(sql_query)
    results = cursor.fetchall()
    data = [{'name': row.name} for row in results]
    cursor.close()
    return {'data': data}


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
