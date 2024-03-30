from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost:3306/games'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


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
