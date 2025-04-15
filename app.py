from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from config import Config
from routes.food_routes import food_bp
from routes.order_routes import order_bp
from db import mysql  # Import the mysql object from db.py
from flask_cors import CORS  # Importing CORS to enable cross-origin resource sharing

# Load environment variables from .env file
load_dotenv()

# Initialize Flask application
app = Flask(__name__)

# Load configuration from Config class and environment variables
app.config.from_object(Config)

# Access environment variables using os.getenv
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST', 'localhost')  # Default to localhost if not set
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER', 'root')  # Default to root if not set
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD', '')  # Default to empty if not set
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB', 'food_order_db')  # Default to food_order_db if not set

CORS(app)

# Initialize MySQL
mysql.init_app(app)  # Initialize mysql with app

# Initialize CORS for cross-origin requests (if your frontend is hosted elsewhere)
CORS(app)

# Register Blueprints for API routes
app.register_blueprint(food_bp, url_prefix='/api/food')
app.register_blueprint(order_bp, url_prefix='/api/order')

# Root route for testing the application
@app.route('/')
def index():
    return "Welcome to the Food Ordering API!"

# Error handling for 404
@app.errorhandler(404)
def page_not_found(e):
    return {"error": "Page not found"}, 404

# Error handling for internal server errors
@app.errorhandler(500)
def internal_server_error(e):
    return {"error": "Internal server error"}, 500

# Run the application
if __name__ == "__main__":
    app.run(debug=True)

