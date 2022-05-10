DROP DATABASE IF EXISTS cartandcheckout_db_test;
CREATE DATABASE cartandcheckout_db_test;

\c cartandcheckout_db_test;

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

CREATE TABLE addresses (
    addressid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    streetone TEXT NOT NULL,
    streettwo TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    postalcode TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'United States',
    phonenumber TEXT NOT NULL

);

CREATE TABLE user_products (
    userid INTEGER REFERENCES users ON DELETE CASCADE,
    productid INTEGER REFERENCES products ON DELETE CASCADE
);

CREATE TABLE user_addresses (
    userid INTEGER REFERENCES users ON DELETE CASCADE,
    addressid INTEGER REFERENCES addresses ON DELETE CASCADE
);