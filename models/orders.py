from flask_mysqldb import MySQL
from config import Config
import json

mysql = MySQL()

class Order:
    @staticmethod
    def create_order(user_id, total_price):
        """Create a new order and return its order_id."""
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO orders (user_id, total_price) VALUES (%s, %s)", (user_id, total_price))
        mysql.connection.commit()
        order_id = cur.lastrowid
        cur.close()
        return order_id

    @staticmethod
    def get_order_by_id(order_id):
        """Retrieve an order by its ID."""
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM orders WHERE id = %s", (order_id,))
        order = cur.fetchone()
        cur.close()
        return order

    @staticmethod
    def get_all_orders():
        """Retrieve all orders."""
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM orders")
        orders = cur.fetchall()
        cur.close()
        return orders

    @staticmethod
    def seed_orders_from_json():
        """Seed orders from the food_data.json file into the database."""
        # Load the JSON data from the food_data.json file
        with open('food_data.json', 'r') as file:
            data = json.load(file)

        # Loop through the 'orders' in the JSON data and insert them into the database
        for order in data['orders']:
            user_id = order['user_id']
            total_price = order['total_price']

            # Call create_order to insert into the database
            order_id = Order.create_order(user_id, total_price)

            print(f"Order {order_id} for user {user_id} with total price {total_price} has been added.")

        print(f"Successfully seeded {len(data['orders'])} orders into the database.")
