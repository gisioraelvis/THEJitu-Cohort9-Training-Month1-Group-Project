-- DROP PROCEDURE IF EXISTS usp_GetAllProducts

CREATE PROCEDURE usp_GetAllProducts
AS
BEGIN
        SELECT
                p.id, p.userId, p.name, p.image, p.description, p.price, p.countInStock,
                b.id AS brandId, b.name AS brandName,
                c.id AS categoryId, c.name AS categoryName,
                r.id AS reviewId, r.userId AS reviewUserId, r.rating, r.comment
        FROM
                products p
                INNER JOIN product_brand pb ON p.id = pb.productId
                INNER JOIN brands b ON pb.brandId = b.id
                INNER JOIN product_category pc ON p.id = pc.productId
                INNER JOIN categories c ON pc.categoryId = c.id
                LEFT JOIN product_review pr ON p.id = pr.productId
                LEFT JOIN reviews r ON pr.reviewId = r.id
END;

-- CREATE PROCEDURE usp_GetAllProducts
-- AS
-- BEGIN
--         SELECT*
--         FROM products
-- END;