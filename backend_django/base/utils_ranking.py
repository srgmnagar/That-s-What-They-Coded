import numpy as np
import xgboost as xgb
from .models import Candidate

def get_candidate_data():
    """ Fetch candidate data from DB and prepare features. """
    candidates = Candidate.objects.all()
    
    if not candidates:
        return None, None, None

    candidate_ids = np.array([c.candidate_id for c in candidates])
    test_scores = np.array([c.test_score for c in candidates])
    total_time = np.array([c.total_time for c in candidates])
    total_easy = np.array([c.total_easy for c in candidates])
    total_medium = np.array([c.total_medium for c in candidates])
    total_hard = np.array([c.total_hard for c in candidates])
    query_groups = np.array([c.query_group for c in candidates])

    # Feature matrix
    X = np.column_stack((test_scores, -total_time, total_easy, total_medium, total_hard))
    y = test_scores  # Primary ranking target

    return candidate_ids, X, y, query_groups

def train_rank_model(X_train, y_train, q_train):
    """ Train an XGBoost ranking model """
    params = {
        "objective": "rank:pairwise",
        "eval_metric": "ndcg",
        "eta": 0.1,
        "max_depth": 6,
        "subsample": 0.8,
        "colsample_bytree": 0.8,
        "lambda": 1.0
    }

    dtrain = xgb.DMatrix(X_train, label=y_train)
    dtrain.set_group(q_train)

    rank_model = xgb.train(params, dtrain, num_boost_round=100)
    return rank_model

def predict_ranking(rank_model, X_test, candidate_ids):
    """ Predict and return ranked candidate IDs """
    dtest = xgb.DMatrix(X_test)
    y_pred = rank_model.predict(dtest)
    sorted_indices = np.argsort(-y_pred)  # Sort in descending order
    ranked_candidates = candidate_ids[sorted_indices]
    return ranked_candidates

def rank_candidates():
    """ Main function to fetch data, train, and rank """
    candidate_ids, X, y, query_groups = get_candidate_data()
    if candidate_ids is None:
        return []

    # Split groups for train/test
    unique_groups = np.unique(query_groups)
    num_train = int(0.8 * len(unique_groups))
    train_groups, test_groups = unique_groups[:num_train], unique_groups[num_train:]

    train_indices = np.isin(query_groups, train_groups)
    test_indices = np.isin(query_groups, test_groups)

    X_train, y_train, q_train = X[train_indices], y[train_indices], query_groups[train_indices]
    X_test, y_test, q_test = X[test_indices], y[test_indices], query_groups[test_indices]

    train_group_counts = [np.sum(q_train == g) for g in np.unique(q_train)]
    test_group_counts = [np.sum(q_test == g) for g in np.unique(q_test)]

    model = train_rank_model(X_train, y_train, train_group_counts)
    ranked_candidates = predict_ranking(model, X_test, candidate_ids[test_indices])

    return ranked_candidates
