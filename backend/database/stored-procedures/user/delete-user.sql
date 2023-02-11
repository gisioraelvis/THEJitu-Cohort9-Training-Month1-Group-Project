CREATE PROCEDURE DeleteUser
    (@Id INT)
AS
BEGIN
    DELETE 
    FROM users
    WHERE Id = @Id
END