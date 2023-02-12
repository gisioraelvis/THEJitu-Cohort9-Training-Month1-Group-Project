-- DROP PROCEDURE IF EXISTS usp_FindProductById;

CREATE PROCEDURE usp_FindProductById
    (@productId INT)
AS
BEGIN
    SELECT *
    FROM Products
    WHERE id = @productId
END;