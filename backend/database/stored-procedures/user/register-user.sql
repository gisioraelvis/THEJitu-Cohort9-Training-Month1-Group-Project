CREATE PROCEDURE RegisterUser
    (@Name NVARCHAR(255),
    @Email NVARCHAR(255),
    @Password NVARCHAR(255))
AS
BEGIN
    INSERT INTO users
        (Name, Email, Password)
    VALUES
        (@Name, @Email, @Password)
END