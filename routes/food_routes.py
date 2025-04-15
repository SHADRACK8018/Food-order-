from flask import Blueprint, request, jsonify
from models.food_items import FoodItem

food_bp = Blueprint('food_bp', __name__)

@food_bp.route('/', methods=['POST'])
def add_food_item():
    data = request.get_json()
    name = data['name']
    description = data['description']
    price = data['price']
    image_url = data['image_url']
    FoodItem.add_food(name, description, price, image_url)
    return jsonify({'message': 'Food item added successfully'}), 201

@food_bp.route('/', methods=['GET'])
def get_food_items():
    print("Getting all food items...")
    food_items = FoodItem.get_all_food()

    # Convert list of tuples to list of dictionaries
    formatted_items = [
        {
            "id": item[0],
            "name": item[1],
            "description": item[2],
            "price": float(item[3]),  # in case it's Decimal
            "image_url": item[4]
        } for item in food_items
    ]
    
    print("Formatted Food Items:", formatted_items)
    return jsonify(formatted_items)

@food_bp.route('/<int:id>', methods=['GET'])
def get_food_item(id):
    food_item = FoodItem.get_food_by_id(id)
    if food_item:
        formatted_item = {
            "id": food_item[0],
            "name": food_item[1],
            "description": food_item[2],
            "price": float(food_item[3]),
            "image_url": food_item[4]
        }
        return jsonify(formatted_item)
    else:
        return jsonify({'message': 'Food item not found'}), 404

@food_bp.route('/<int:id>', methods=['PUT'])
def update_food_item(id):
    data = request.get_json()
    name = data['name']
    description = data['description']
    price = data['price']
    image_url = data['image_url']
    FoodItem.update_food(id, name, description, price, image_url)
    return jsonify({'message': 'Food item updated successfully'})

@food_bp.route('/<int:id>', methods=['DELETE'])
def delete_food_item(id):
    FoodItem.delete_food(id)
    return jsonify({'message': 'Food item deleted successfully'})
