import json
from app import app
from db import mysql
from models.food_items import FoodItem
from models.orders import Order
from models.order_items import OrderItem

# Load the JSON data from the file
with open('food_data.json', 'r') as f:
    data = json.load(f)

# Extract data
food_items = data[0]['food_items']
orders = data[0]['orders']
order_items = data[0]['order_items']

with app.app_context():
    cur = mysql.connection.cursor()

    # Disable foreign key checks temporarily
    cur.execute("SET FOREIGN_KEY_CHECKS = 0")

    # Clear existing data
    cur.execute("DELETE FROM order_items")
    cur.execute("DELETE FROM orders")
    cur.execute("DELETE FROM food_items")

    # Re-enable foreign key checks
    cur.execute("SET FOREIGN_KEY_CHECKS = 1")
    mysql.connection.commit()

    # Insert food items
    for item in food_items:
        cur.execute("""
            INSERT INTO food_items (id, name, description, price, image_url)
            VALUES (%s, %s, %s, %s, %s)
        """, (item['id'], item['name'], item['description'], item['price'], item['image_url']))
    mysql.connection.commit()

    # Insert orders
    for order in orders:
        cur.execute("""
            INSERT INTO orders (id, user_id, total_price)
            VALUES (%s, %s, %s)
        """, (order['id'], order['user_id'], order['total_price']))
    mysql.connection.commit()

    # Insert order items
    for oi in order_items:
        cur.execute("""
            INSERT INTO order_items (id, order_id, food_item_id, quantity, price)
            VALUES (%s, %s, %s, %s, %s)
        """, (oi['id'], oi['order_id'], oi['food_item_id'], oi['quantity'], oi['price']))
    mysql.connection.commit()

    cur.close()
    print(f"✅ Successfully seeded {len(food_items)} food items, {len(orders)} orders, and {len(order_items)} order items!")
