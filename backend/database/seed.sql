USE GadgetHub;

-- users
DELETE FROM users;
-- DBCC CHECKIDENT('users', RESEED, 1);

INSERT INTO users
    (name, email, password, isAdmin)
VALUES
    ('Admin User', 'admin@example.com', '$2b$10$TcoKdgRJCQ2ZhxCttscyEud.X44xEN.wT8UKQoBxz1XI18zo1KcWG', 1),
    ('John Doe', 'johndoe@example.com', '$2b$10$TcoKdgRJCQ2ZhxCttscyEud.X44xEN.wT8UKQoBxz1XI18zo1KcWG', 1),
    ('Jane Doe', 'janedoe@example.com', '$2b$10$TcoKdgRJCQ2ZhxCttscyEud.X44xEN.wT8UKQoBxz1XI18zo1KcWG', 0),
    ('Jim Smith', 'jimsmith@example.com', '$2b$10$TcoKdgRJCQ2ZhxCttscyEud.X44xEN.wT8UKQoBxz1XI18zo1KcWG', 0),
    ('Sarah Johnson', 'sarahjohnson@example.com', '$2b$10$TcoKdgRJCQ2ZhxCttscyEud.X44xEN.wT8UKQoBxz1XI18zo1KcWG', 0),
    ('Tommy Lee', 'tommylee@example.com', '$2b$10$TcoKdgRJCQ2ZhxCttscyEud.X44xEN.wT8UKQoBxz1XI18zo1KcWG', 0);

-- products
DELETE FROM products;
-- DBCC CHECKIDENT('products', RESEED, 1);

INSERT INTO products
    (userId, name, image, description, price, countInStock)
VALUES
    (1, 'Product 1', 'https://example.com/product1.jpg', 'This is the description of Product 1', 19.99, 10),
    (2, 'Product 2', 'https://example.com/product2.jpg', 'This is the description of Product 2', 29.99, 20),
    (3, 'Product 3', 'https://example.com/product3.jpg', 'This is the description of Product 3', 39.99, 30),
    (4, 'Product 4', 'https://example.com/product4.jpg', 'This is the description of Product 4', 49.99, 40),
    (5, 'Product 5', 'https://example.com/product5.jpg', 'This is the description of Product 5', 59.99, 50);

-- brands
DELETE FROM brands;
-- DBCC CHECKIDENT('brands', RESEED, 1);

INSERT INTO brands
    (name)
VALUES
    ('Brand 1'),
    ('Brand 2'),
    ('Brand 3'),
    ('Brand 4'),
    ('Brand 5');

-- product_brand
DELETE FROM product_brand;
-- DBCC CHECKIDENT('product_brand', RESEED, 1);

INSERT INTO product_brand
    (productId, brandId)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5);

-- categories
DELETE FROM categories;
-- DBCC CHECKIDENT('categories', RESEED, 1);

INSERT INTO categories
    (name)
VALUES
    ('Category 1'),
    ('Category 2'),
    ('Category 3'),
    ('Category 4'),
    ('Category 5');

-- product_category
DELETE FROM product_category;
-- DBCC CHECKIDENT('product_category', RESEED, 1);

INSERT INTO product_category
    (productId, categoryId)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5);

-- reviews
DELETE FROM reviews;
-- DBCC CHECKIDENT('reviews', RESEED, 1);

INSERT INTO reviews
    (userId, name, rating, comment)
VALUES
    (1, 'John Doe', 4, 'This is a review of Product 1'),
    (2, 'Jane Doe', 5, 'This is a review of Product 2'),
    (3, 'Jim Smith', 3, 'This is a review of Product 3'),
    (4, 'Sarah Johnson', 2, 'This is a review of Product 4'),
    (5, 'Tommy Lee', 1, 'This is a review of Product 5');

-- product_review
DELETE FROM product_review;
-- DBCC CHECKIDENT('product_review', RESEED, 1);

INSERT INTO product_review
    (productId, reviewId)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5);