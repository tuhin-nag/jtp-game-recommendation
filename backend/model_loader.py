import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics.pairwise import cosine_similarity


def run_pipeline():
    print("started pipeline")
    df = pd.read_csv('resources/steam.csv')
    below_100_positive_ratings = df[df['positive_ratings'] < 100]
    df_filtered = df.drop(below_100_positive_ratings.index)
    df = df_filtered
    encoder = LabelEncoder()
    print("loading encoder...")
    df['appid'] = encoder.fit_transform(df['appid'])
    print("encoder loaded")

    df['genres'] = df['genres'].str.lower().str.replace(' ', '')
    df['developer'] = df['developer'].str.lower().str.replace(' ', '')
    df['categories'] = df['categories'].str.lower().str.replace(' ', '')

    df['features'] = df['genres'] + ' ' + \
        df['developer'] + ' ' + df['categories']
    df = df.dropna(subset=['features'])
    df['rating'] = df['positive_ratings'] / \
        (df['positive_ratings'] + df['negative_ratings'])

    from sklearn.feature_extraction.text import TfidfVectorizer

    vectorizer = TfidfVectorizer()
    feature_matrix = vectorizer.fit_transform(df['features'])
    feature_sim_matrix = cosine_similarity(feature_matrix)

    game_item_matrix = pd.pivot_table(
        df, index='appid', values='rating', fill_value=0)
    item_sim_matrix = cosine_similarity(game_item_matrix)

    combined_sim_matrix = 0.5 * item_sim_matrix + 0.5 * feature_sim_matrix
    print("saving model...")

    return encoder, combined_sim_matrix