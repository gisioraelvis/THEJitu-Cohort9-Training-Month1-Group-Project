-- DROP PROCEDURE IF EXISTS usp_DeleteAllProducts;

-- CREATE PROCEDURE usp_DeleteAllProducts
-- AS
-- BEGIN
--     DELETE FROM Products
--     DBCC CHECKIDENT ('Products', RESEED, 0);
-- END

EXEC usp_DeleteAllProducts;

