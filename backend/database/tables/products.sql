CREATE TABLE Review
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    rating INT NOT NULL,
    comment VARCHAR(500) NOT NULL,
    userId INT NOT NULL,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
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
    rating INT NOT NULL,
    numReviews INT NOT NULL,
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
