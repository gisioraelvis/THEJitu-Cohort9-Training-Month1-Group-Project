-- DROP PROCEDURE IF EXISTS usp_CreateProduct;

CREATE PROCEDURE usp_CreateProduct
    (
    @userId INT,
    @name VARCHAR(100),
    @image VARCHAR(500),
    @description VARCHAR(1000),
    @rating INT,
    @numReviews INT,
    @price DECIMAL(10, 2),
    @countInStock INT
)
AS
BEGIN
    INSERT INTO Products
        (userId, name, image, description, rating, numReviews, price, countInStock)
    VALUES
        (@userId, @name, @image, @description, @rating, @numReviews, @price, @countInStock);
END