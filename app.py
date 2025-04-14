from flask import Flask
from dotenv import load_dotenv
import os
from config import Config
from routes.food_routes import food_bp
from routes.order_routes import order_bp
from db import mysql  # Import the mysql object from db.py

# Load environment variables from .env file
load_dotenv()

# Initialize Flask application
app = Flask(__name__)
app.config.from_object(Config)

# Access environment variables using os.getenv
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')

# Initialize MySQL
mysql.init_app(app)  # Initialize mysql with app

# Register Blueprints
app.register_blueprint(food_bp, url_prefix='/api/food')
app.register_blueprint(order_bp, url_prefix='/api/order')

if __name__ == "__main__":
    app.run(debug=True)
