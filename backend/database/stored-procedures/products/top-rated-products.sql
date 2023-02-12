-- CREATE PROCEDURE usp_TopRatedProducts
-- AS
-- BEGIN
--     SELECT TOP 5
--         p.id,
--         p.name,
--         p.image,
--         p.description,
--         p.rating,
--         p.numberOfReviews,
--         p.price,
--         p.countInStock
--     FROM Products p
--     ORDER BY p.rating DESC, p.numberOfReviews DESC
-- END

--  usp_TopRatedProductsWeightedRating
CREATE PROCEDURE usp_TopRatedProductsWeightedRating
AS
BEGIN
    SELECT TOP 5
        p.id,
        p.name,
        p.image,
        p.description,
        p.rating,
        p.numberOfReviews,
        p.price,
        p.countInStock
    FROM Products p
    ORDER BY (p.rating * (1.0 * p.numberOfReviews / SUM(p.numberOfReviews) OVER())) DESC
END