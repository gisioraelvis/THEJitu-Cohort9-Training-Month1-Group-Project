CREATE PROCEDURE UpdateUser(
    @Id INT,
    @Name NVARCHAR(255) = NULL,
    @Email NVARCHAR(255) = NULL,
    @Password NVARCHAR(255) = NULL,
    @IsAdmin BIT = NULL
)
AS
BEGIN
    UPDATE users
    SET Name = COALESCE(@Name, Name), 
        Email = COALESCE(@Email, Email), 
        Password = COALESCE(@Password, Password), 
        IsAdmin = COALESCE(@IsAdmin, IsAdmin),
        updatedAt = GETDATE()
    WHERE Id = @Id
END