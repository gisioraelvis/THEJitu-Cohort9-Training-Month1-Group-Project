-- DROP PROCEDURE IF EXISTS usp_GetAllProductsWithCategoriesAndBrands

CREATE PROCEDURE usp_GetAllProductsWithCategoriesAndBrands
AS
BEGIN
    SELECT p.*, COALESCE(categories.categories, '[]') AS categories, COALESCE(brands.brands, '[]') AS brands
    FROM Products p
        LEFT JOIN (
SELECT id AS productId, JSON_QUERY(
(
SELECT name
            FROM Categories c
                INNER JOIN ProductCategory pc ON c.id = pc.categoryId
            WHERE pc.productId = products.id
            FOR JSON PATH
)
) AS categories
        FROM Products products
) categories ON p.id = categories.productId
        LEFT JOIN (
SELECT id AS productId, JSON_QUERY(
(
SELECT name
            FROM Brands b
                INNER JOIN ProductBrand pb ON b.id = pb.brandId
            WHERE pb.productId = products.id
            FOR JSON PATH
)
) AS brands
        FROM Products products
) brands ON p.id = brands.productId;
END;