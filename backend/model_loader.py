import pandas as pd
from sklearn.preprocessing import LabelEncoder
import joblib


def load_encoder():
    df = pd.read_csv('resources/steam.csv')
    df = df.assign(genre=df['genres'].str.split(';')).explode('genres')
    df = df.assign(category=df['categories'].str.split(
        ';')).explode('categories')
    encoder = LabelEncoder()
    print("loading encoder...")
    df['appid'] = encoder.fit_transform(df['appid'])
    return encoder


def load_model():
    print("loading model...")
    model = joblib.load('resources/combined_sim_matrix.pkl')
    print("model loaded")
    return model
