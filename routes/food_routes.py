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
    food_items = FoodItem.get_all_food()
    return jsonify(food_items)

@food_bp.route('/<int:id>', methods=['GET'])
def get_food_item(id):
    food_item = FoodItem.get_food_by_id(id)
    if food_item:
        return jsonify(food_item)
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
