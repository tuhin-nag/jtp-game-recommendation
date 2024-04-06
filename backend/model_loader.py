import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer


# Runs the entire pipeline for building the recommendation system
def run_pipeline():
    print("started pipeline")
    df = pd.read_csv('resources/steam.csv')
    df = filter_df(df)
    encoder = LabelEncoder()
    print("loading encoder...")
    df['appid'] = encoder.fit_transform(df['appid'])
    print("encoder loaded")

    feature_matrix, df = preprocess(df)
    combined_sim_matrix = make_similarity_matrix(feature_matrix, df)
    print("saving model...")

    return encoder, combined_sim_matrix


# Filters the input dataframe to remove games with less than 100 positive ratings
def filter_df(df):
    below_100_positive_ratings = df[df['positive_ratings'] < 100]
    df_filtered = df.drop(below_100_positive_ratings.index)
    return df_filtered


# Preprocesses the input dataframe
def preprocess(df):
    df['genres'] = df['genres'].str.lower().str.replace(' ', '')
    df['developer'] = df['developer'].str.lower().str.replace(' ', '')
    df['categories'] = df['categories'].str.lower().str.replace(' ', '')

    df['features'] = df['genres'] + ' ' + \
        df['developer'] + ' ' + df['categories']
    df = df.dropna(subset=['features'])
    df['rating'] = df['positive_ratings'] / \
        (df['positive_ratings'] + df['negative_ratings'])

    vectorizer = TfidfVectorizer()
    feature_matrix = vectorizer.fit_transform(df['features'])
    return feature_matrix, df


# Creates a similarity matrix for the games based on their features
def make_similarity_matrix(feature_matrix, df):
    feature_sim_matrix = cosine_similarity(feature_matrix)

    game_item_matrix = pd.pivot_table(
        df, index='appid', values='rating', fill_value=0)
    item_sim_matrix = cosine_similarity(game_item_matrix)

    combined_sim_matrix = 0.5 * item_sim_matrix + 0.5 * feature_sim_matrix
    return combined_sim_matrix
