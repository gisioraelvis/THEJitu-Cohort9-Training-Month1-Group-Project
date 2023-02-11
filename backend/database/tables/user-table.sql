CREATE TABLE users (
  Id VARCHAR(100),
  Name nvarchar(255) NOT NULL,
  Email nvarchar(255) NOT NULL,
  Password nvarchar(255) NOT NULL,
  CONSTRAINT PK_users PRIMARY KEY (id),
  CONSTRAINT UK_users_email UNIQUE (email)
);




