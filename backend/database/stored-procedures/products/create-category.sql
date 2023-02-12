CREATE PROCEDURE usp_CreateCategory
    (@name VARCHAR(100))
AS
BEGIN
    INSERT INTO Categories
        (name)
    VALUES
        (@name)
END