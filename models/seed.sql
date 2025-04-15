INSERT INTO food_items (id, name, description, price, image_url) VALUES
(201, 'Burger', 'Classic beef burger with cheese and toppings', 7.75, 'https://images.unsplash.com/photo-1550547660-d9450f859349'),
(202, 'Pizza', 'Large pepperoni pizza', 19.99, 'https://images.unsplash.com/photo-1601924582975-4c3b6c5c9b91'),
(203, 'Fries', 'Crispy golden french fries', 4.50, 'https://images.unsplash.com/photo-1541599540903-216a46ca1f9b'),
(204, 'Soda', 'Refreshing carbonated beverage', 3.00, 'https://images.unsplash.com/photo-1600281979565-38b2ec15f1f3'),
(205, 'Pasta', 'Spaghetti with marinara sauce', 12.99, 'https://images.unsplash.com/photo-1589308078056-f3b9c8c4f0c5'),
(206, 'Salad', 'Fresh green salad with vinaigrette', 6.50, 'https://images.unsplash.com/photo-1551183053-bf91a1d81141'),
(207, 'Chicken Wings', 'Spicy baked chicken wings (6 pieces)', 9.25, 'https://images.unsplash.com/photo-1613145991370-960edeb7c845'),
(208, 'Steak', 'Grilled sirloin steak', 23.00, 'https://images.unsplash.com/photo-1551189014-8be9a7b1d9c5'),
(209, 'Ice Cream', 'Vanilla ice cream with chocolate sauce', 5.50, 'https://images.unsplash.com/photo-1565958011702-44b3223a3c20'),
(210, 'Coffee', 'Brewed black coffee', 3.50, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93');


INSERT INTO orders (id, user_id, total_price) VALUES
(101, 1, 24.25),
(102, 2, 29.97),
(103, 1, 29.50),
(104, 3, 53.97),
(105, 2, 24.50),
(106, 4, 34.50),
(107, 1, 21.25),
(108, 3, 34.00);



INSERT INTO order_items (id, order_id, food_item_id, quantity, price) VALUES
(1, 101, 201, 2, 15.50),
(2, 101, 203, 1, 8.75),
(3, 102, 202, 3, 9.99),
(4, 103, 201, 1, 15.50),
(5, 103, 204, 2, 7.25),
(6, 104, 205, 1, 12.99),
(7, 104, 202, 2, 19.99),
(8, 105, 203, 4, 4.50),
(9, 105, 206, 1, 6.50),
(10, 106, 201, 1, 16.00),
(11, 106, 207, 2, 9.25),
(12, 107, 204, 3, 3.25),
(13, 107, 208, 1, 11.50),
(14, 108, 202, 1, 20.50),
(15, 108, 205, 1, 13.50);
