CREATE PROCEDURE usp_DeleteAllCategories
AS
BEGIN
    DELETE FROM Categories
    DBCC CHECKIDENT ('Products', RESEED, 0);
END

