from flask_mysqldb import MySQL
from config import Config

mysql = MySQL()

class FoodItem:
    @staticmethod
    def add_food(name, description, price, image_url):
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO food_items (name, description, price, image_url) VALUES (%s, %s, %s, %s)",
                    (name, description, price, image_url))
        mysql.connection.commit()
        cur.close()

    @staticmethod
    def get_all_food():
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM food_items")
        food_items = cur.fetchall()
        cur.close()
        return food_items

    @staticmethod
    def get_food_by_id(food_id):
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM food_items WHERE id = %s", (food_id,))
        food_item = cur.fetchone()
        cur.close()
        return food_item

    @staticmethod
    def update_food(food_id, name, description, price, image_url):
        cur = mysql.connection.cursor()
        cur.execute("UPDATE food_items SET name=%s, description=%s, price=%s, image_url=%s WHERE id=%s",
                    (name, description, price, image_url, food_id))
        mysql.connection.commit()
        cur.close()

    @staticmethod
    def delete_food(food_id):
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM food_items WHERE id=%s", [food_id])
        mysql.connection.commit()
        cur.close()
