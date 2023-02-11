CREATE PROCEDURE ResetPassword(@id VARCHAR(100),
    @password VARCHAR(150))
AS
BEGIN
    UPDATE users SET Password = @password WHERE Id = @id
END