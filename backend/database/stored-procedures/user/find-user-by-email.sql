CREATE PROCEDURE FindUserByEmail
    (@email VARCHAR(255))
AS
BEGIN
    SELECT *
    FROM users
    WHERE email = @email
END