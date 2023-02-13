-- DROP PROCEDURE IF EXISTS usp_GetAllProductsWithCategoriesAndBrands

-- CREATE PROCEDURE usp_GetAllProductsWithCategoriesAndBrands
-- AS
-- BEGIN
--     SELECT p.*, COALESCE(categories.categories, '[]') AS categories, COALESCE(brands.brands, '[]') AS brands
--     FROM products p
--         LEFT JOIN (
-- SELECT id AS productId, JSON_QUERY(
-- (
-- SELECT name
--             FROM Categories c
--                 INNER JOIN ProductCategory pc ON c.id = pc.categoryId
--             WHERE pc.productId = products.id
--             FOR JSON PATH
-- )
-- ) AS categories
--         FROM products products
-- ) categories ON p.id = categories.productId
--         LEFT JOIN (
-- SELECT id AS productId, JSON_QUERY(
-- (
-- SELECT name
--             FROM Brands b
--                 INNER JOIN ProductBrand pb ON b.id = pb.brandId
--             WHERE pb.productId = products.id
--             FOR JSON PATH
-- )
-- ) AS brands
--         FROM products products
-- ) brands ON p.id = brands.productId;
-- END;

CREATE PROCEDURE usp_GetAllProducts
AS
BEGIN
        SELECT
                p.id,
                p.userId,
                p.name,
                p.image,
                p.description,
                p.price,
                p.countInStock,
                p.createdAt,
                p.updatedAt,
                b.id AS brandId,
                b.name AS brandName,
                c.id AS categoryId,
                c.name AS categoryName,
                r.id AS reviewId,
                r.userId AS reviewUserId,
                r.rating AS reviewRating,
                r.comment AS reviewComment
        FROM
                products p
                LEFT JOIN
                product_brand pb ON p.id = pb.productId
                LEFT JOIN
                brands b ON pb.brandId = b.id
                LEFT JOIN
                product_category pc ON p.id = pc.productId
                LEFT JOIN
                categories c ON pc.categoryId = c.id
                LEFT JOIN
                product_review pr ON p.id = pr.productId
                LEFT JOIN
                reviews r ON pr.reviewId = r.id
END