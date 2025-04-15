import json
from app import app
from models import db, FoodItem, Order, OrderItem  # Import db, FoodItem, Order, and OrderItem from models

# Load the JSON data from the file
with open('food_data.json', 'r') as f:
    data = json.load(f)

# Extract food items, orders, and order_items from JSON
food_items = data[0]['food_items']
orders = data[0]['orders']
order_items = data[0]['order_items']

# Insert data into the database
with app.app_context():
    # Clear the existing data (optional but recommended)
    db.session.query(FoodItem).delete()
    db.session.query(Order).delete()
    db.session.query(OrderItem).delete()

    # Insert food items into the database
    for item in food_items:
        food = FoodItem(
            id=item['id'],
            name=item['name'],
            description=item['description'],
            price=item['price'],
            image_url=item['image_url']
        )
        db.session.add(food)

    # Insert orders into the database
    for order in orders:
        order_entry = Order(
            id=order['id'],
            user_id=order['user_id'],
            total_price=order['total_price']
        )
        db.session.add(order_entry)

    # Insert order items into the database
    for order_item in order_items:
        order_item_entry = OrderItem(
            id=order_item['id'],
            order_id=order_item['order_id'],
            food_item_id=order_item['food_item_id'],
            quantity=order_item['quantity'],
            price=order_item['price']
        )
        db.session.add(order_item_entry)

    # Commit the transaction
    db.session.commit()

    print(f"✅ Successfully seeded {len(food_items)} food items, {len(orders)} orders, and {len(order_items)} order items!")
