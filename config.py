import os

class Config:
    MYSQL_HOST = os.getenv('MYSQL_HOST', 'localhost')
    MYSQL_USER = os.getenv('MYSQL_USER', 'root')
    MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD', 'mysql@25')  # Change this to your DB password
    MYSQL_DB = os.getenv('MYSQL_DB', 'food_ordering')
