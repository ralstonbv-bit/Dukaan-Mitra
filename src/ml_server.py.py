from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_absolute_error

app = Flask(__name__)
CORS(app)

# Educational training data used by the prototype.
# In a production app, replace this with real POS sales history from the shop database.
DEFAULT_SALES = np.array(
    [8, 10, 12, 15, 14, 16, 13, 18, 20, 17, 22, 19, 24, 21],
    dtype=float,
)

# 1 = rainy day, 0 = non-rainy day.
DEFAULT_RAIN = np.array(
    [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0],
    dtype=float,
)


def train_model(sales, rain):
    """Train a real scikit-learn regression model."""
    sales = np.asarray(sales, dtype=float)
    rain = np.asarray(rain, dtype=float)

    if len(sales) != len(rain) or len(sales) < 5:
        raise ValueError("sales_history and rain_history must have the same length (at least 5 points).")

    # Features:
    #   x1 = day index (captures trend)
    #   x2 = rain flag (learns the relationship between rain and sales)
    day_index = np.arange(len(sales), dtype=float)
    X = np.column_stack([day_index, rain])

    model = LinearRegression()
    model.fit(X, sales)

    fitted = model.predict(X)

    return model, X, sales, fitted


@app.get("/api/health")
def health():
    return jsonify({"status": "ok", "model": "scikit-learn LinearRegression"})


@app.post("/api/predict")
def predict():
    payload = request.get_json(silent=True) or {}

    sales = np.asarray(payload.get("sales_history", DEFAULT_SALES.tolist()), dtype=float)
    rain_history = np.asarray(payload.get("rain_history", DEFAULT_RAIN.tolist()), dtype=float)

    current_stock = float(payload.get("current_stock", 0))
    rain_probability = float(payload.get("rain_probability", 80))
    lead_time_days = float(payload.get("lead_time_days", 1))

    rain_probability = min(100, max(0, rain_probability))
    lead_time_days = max(1, lead_time_days)

    model, X, sales, fitted = train_model(sales, rain_history)

    next_day = len(sales)

    # Predict the same next day twice:
    # once without rain and once with rain.
    dry_prediction = float(
        max(0, model.predict([[next_day, 0]])[0])
    )
    rain_prediction = float(
        max(0, model.predict([[next_day, 1]])[0])
    )

    # Convert the weather probability into an expected demand:
    # E[D] = P(rain)*D(rain) + P(no rain)*D(no rain)
    p_rain = rain_probability / 100.0
    expected_demand = (p_rain * rain_prediction) + ((1 - p_rain) * dry_prediction)

    # PSDA part.
    mean_demand = float(np.mean(sales))
    variance = float(np.var(sales))  # population variance for this prototype
    standard_deviation = float(np.sqrt(variance))

    # Simple safety-stock demonstration.
    safety_stock = standard_deviation

    reorder_point = (expected_demand * lead_time_days) + safety_stock
    recommended_order = int(max(0, np.ceil(reorder_point - current_stock)))

    r2 = float(r2_score(sales, fitted))
    mae = float(mean_absolute_error(sales, fitted))

    return jsonify({
        "model": "scikit-learn LinearRegression",
        "training_points": int(len(sales)),
        "current_stock": current_stock,
        "rain_probability": rain_probability,
        "lead_time_days": lead_time_days,
        "dry_prediction": dry_prediction,
        "rain_prediction": rain_prediction,
        "expected_demand": expected_demand,
        "mean_demand": mean_demand,
        "variance": variance,
        "standard_deviation": standard_deviation,
        "safety_stock": safety_stock,
        "reorder_point": reorder_point,
        "recommended_order": recommended_order,
        "slope_day": float(model.coef_[0]),
        "rain_effect": float(model.coef_[1]),
        "intercept": float(model.intercept_),
        "r2": r2,
        "mae": mae,
    })


if __name__ == "__main__":
    # React app calls http://localhost:5000/api/predict
    app.run(host="0.0.0.0", port=5000, debug=True)
