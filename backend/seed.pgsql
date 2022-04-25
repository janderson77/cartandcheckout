DROP DATABASE IF EXISTS cartandcheckout_db;
CREATE DATABASE cartandcheckout_db;

\c cartandcheckout_db;

CREATE TABLE users (
    userid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(20) NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    profileimgurl TEXT,
    is_admin BOOLEAN DEFAULT false,
    UNIQUE(username),
    UNIQUE(email)
);

CREATE TABLE products (
    productid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    productname TEXT NOT NULL,
    productdescription TEXT NOT NULL

);

CREATE TABLE user_products (
    userid INTEGER REFERENCES users ON DELETE CASCADE,
    productid INTEGER REFERENCES products ON DELETE CASCADE
);