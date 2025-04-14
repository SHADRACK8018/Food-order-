from flask_mysqldb import MySQL
from config import Config

mysql = MySQL()

class OrderItem:
    @staticmethod
    def add_order_item(order_id, food_item_id, quantity, price):
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO order_items (order_id, food_item_id, quantity, price) VALUES (%s, %s, %s, %s)",
                    (order_id, food_item_id, quantity, price))
        mysql.connection.commit()
        cur.close()

    @staticmethod
    def get_items_by_order_id(order_id):
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM order_items WHERE order_id = %s", (order_id,))
        order_items = cur.fetchall()
        cur.close()
        return order_items
