CREATE PROCEDURE usp_CreateBrand
    (@name VARCHAR(100))
AS
BEGIN
    INSERT INTO Brands
        (name)
    VALUES
        (@name)
END