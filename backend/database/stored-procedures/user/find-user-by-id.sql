CREATE PROCEDURE FindUserById
    (@Id INT)
AS
BEGIN
    SELECT *
    FROM users
    WHERE Id = @Id
END