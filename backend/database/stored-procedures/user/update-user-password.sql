CREATE PROCEDURE UpdateUserPassword
    (@email VARCHAR(255),
    @password VARCHAR(255))
AS
BEGIN
    UPDATE users
SET password = @password, updatedAt = GETDATE()
WHERE email = @email
END