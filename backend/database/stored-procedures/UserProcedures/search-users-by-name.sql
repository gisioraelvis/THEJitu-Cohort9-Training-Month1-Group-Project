CREATE PROCEDURE SearchUsersByName(@name VARCHAR(200))
AS
BEGIN
    SELECT *
    FROM users
    WHERE Name LIKE '%' + @name + '%'
END