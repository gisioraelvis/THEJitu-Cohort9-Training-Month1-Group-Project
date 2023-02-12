CREATE TABLE Reviews
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    productId INT NOT NULL,
    userId INT NOT NULL,
    rating DECIMAL(10, 2) NOT NULL,
    numberOfReviews INT NOT NULL,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (productId) REFERENCES Products(id),
    FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE Brands
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Categories
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);


CREATE TABLE Products
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    image VARCHAR(500) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    rating DECIMAL(10, 2) NOT NULL,
    numberOfReviews INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    countInStock INT NOT NULL,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE ProductBrand
(
    productId INT NOT NULL,
    brandId INT NOT NULL,
    PRIMARY KEY (productId, brandId),
    FOREIGN KEY (productId) REFERENCES Products(id),
    FOREIGN KEY (brandId) REFERENCES Brands(id)
);

CREATE TABLE ProductCategory
(
    productId INT NOT NULL,
    categoryId INT NOT NULL,
    PRIMARY KEY (productId, categoryId),
    FOREIGN KEY (productId) REFERENCES Products(id),
    FOREIGN KEY (categoryId) REFERENCES Categories(id)
);

CREATE TABLE ProductReview
(
    productId INT NOT NULL,
    reviewId INT NOT NULL,
    PRIMARY KEY (productId, reviewId),
    FOREIGN KEY (productId) REFERENCES Products(id),
    FOREIGN KEY (reviewId) REFERENCES Reviews(id)
);


