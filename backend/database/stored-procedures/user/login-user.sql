CREATE PROCEDURE LoginUser(
    @Email NVARCHAR(255),
    @Password NVARCHAR(255)
)
AS
BEGIN
    SELECT *
    FROM users
    WHERE Email = @Email AND Password = @Password
END