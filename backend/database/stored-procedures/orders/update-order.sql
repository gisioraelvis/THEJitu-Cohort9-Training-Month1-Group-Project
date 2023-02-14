-- DROP PROCEDURE IF EXISTS usp_UpdateOrder;

CREATE PROCEDURE usp_UpdateOrder
    @id INT,
    @isPaid BIT,
    @isDelivered BIT
AS
BEGIN
    UPDATE orders
  SET
    isPaid = @isPaid,
    paidAt = CASE WHEN @isPaid = 1 THEN CURRENT_TIMESTAMP ELSE NULL END,
    isDelivered = @isDelivered,
    deliveredAt = CASE WHEN @isDelivered = 1 THEN CURRENT_TIMESTAMP ELSE NULL END,
    updatedAt = CURRENT_TIMESTAMP
  WHERE id = @id;

    SELECT *
    FROM orders
    WHERE id = @id;
END
