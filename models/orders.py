from flask_mysqldb import MySQL
from config import Config

mysql = MySQL()

class Order:
    @staticmethod
    def create_order(user_id, total_price):
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO orders (user_id, total_price) VALUES (%s, %s)", (user_id, total_price))
        mysql.connection.commit()
        order_id = cur.lastrowid
        cur.close()
        return order_id

    @staticmethod
    def get_order_by_id(order_id):
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM orders WHERE id = %s", (order_id,))
        order = cur.fetchone()
        cur.close()
        return order

    @staticmethod
    def get_all_orders():
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM orders")
        orders = cur.fetchall()
        cur.close()
        return orders
