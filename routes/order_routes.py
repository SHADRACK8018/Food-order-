from flask import Blueprint, request, jsonify
from db import mysql  # Import mysql from db.py
from models.orders import Order
from models.order_items import OrderItem

order_bp = Blueprint('order_bp', __name__)

@order_bp.route('/', methods=['POST'])
def create_order():
    data = request.get_json()
    user_id = data['user_id']
    items = data['items']  # List of food item IDs and quantities
    
    total_price = 0
    order_id = Order.create_order(user_id, total_price)

    for item in items:
        food_item_id = item['food_item_id']
        quantity = item['quantity']
        
        # Get the price of the food item and calculate the total
        cur = mysql.connection.cursor()
        cur.execute("SELECT price FROM food_items WHERE id = %s", (food_item_id,))
        price = cur.fetchone()[0]
        total_price += price * quantity
        
        # Add order item to database
        OrderItem.add_order_item(order_id, food_item_id, quantity, price * quantity)
    
    # Update the total price of the order
    cur.execute("UPDATE orders SET total_price = %s WHERE id = %s", (total_price, order_id))
    mysql.connection.commit()
    
    return jsonify({'message': 'Order created successfully', 'order_id': order_id}), 201

@order_bp.route('/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = Order.get_order_by_id(order_id)
    if order:
        order_items = OrderItem.get_items_by_order_id(order_id)
        return jsonify({'order': order, 'items': order_items})
    else:
        return jsonify({'message': 'Order not found'}), 404
