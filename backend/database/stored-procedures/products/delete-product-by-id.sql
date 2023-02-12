-- DROP PROCEDURE IF EXISTS usp_DeleteProductById;

CREATE PROCEDURE usp_DeleteProductById
    (@productId INT)
AS
BEGIN
    BEGIN TRY
BEGIN TRANSACTION;
    DELETE FROM ProductCategory WHERE productId = @productId;
    DELETE FROM ProductBrand WHERE productId = @productId;
    DELETE FROM Products WHERE id = @productId;

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;
    THROW;
END CATCH;
END;