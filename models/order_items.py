from flask_mysqldb import MySQL
from config import Config
import json

mysql = MySQL()

class OrderItem:
    @staticmethod
    def add_order_item(order_id, food_item_id, quantity, price):
        """Add a single order item to the database."""
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO order_items (order_id, food_item_id, quantity, price) VALUES (%s, %s, %s, %s)",
                    (order_id, food_item_id, quantity, price))
        mysql.connection.commit()
        cur.close()

    @staticmethod
    def get_items_by_order_id(order_id):
        """Get all items for a specific order by order_id."""
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM order_items WHERE order_id = %s", (order_id,))
        order_items = cur.fetchall()
        cur.close()
        return order_items

    @staticmethod
    def seed_order_items_from_json():
        """Seed order items from food_data.json into the database."""
        # Load order items data from the JSON file
        with open('food_data.json', 'r') as file:
            data = json.load(file)

        # Loop through the order items in the JSON data
        for order_item in data['order_items']:
            order_id = order_item['order_id']
            food_item_id = order_item['food_item_id']
            quantity = order_item['quantity']
            price = order_item['price']

            # Insert the order item into the database
            OrderItem.add_order_item(order_id, food_item_id, quantity, price)

        print(f"Successfully seeded {len(data['order_items'])} order items into the database.")
