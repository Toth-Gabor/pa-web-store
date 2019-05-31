/*
    Database initialization script that runs on every web-application redeployment.
*/
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS attributes_table CASCADE;
DROP TABLE IF EXISTS line_item CASCADE;

CREATE TABLE users
(
    user_id       SERIAL NOT NULL PRIMARY KEY,
    user_name     TEXT   NOT NULL,
    email         TEXT   NOT NULL UNIQUE,
    user_password TEXT   NOT NULL,
    administrator BOOLEAN DEFAULT FALSE,
    CONSTRAINT email_not_empty CHECK (email <> ''),
    CONSTRAINT pw_not_empty CHECK (user_password <> '')
);

CREATE TABLE orders
(
    order_id SERIAL  NOT NULL PRIMARY KEY,
    user_id  INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE products
(
    product_id    SERIAL         NOT NULL PRIMARY KEY,
    product_name  TEXT           NOT NULL,
    brand         TEXT           NOT NULL,
    specification TEXT           NOT NULL,
    description   TEXT           NOT NULL,
    price         DECIMAL(10, 2) NOT NULL,
    quantity      INTEGER        NOT NULL,
    photo_url     TEXT
);

CREATE TABLE line_item
(
    order_id   INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity   INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (order_id),
    FOREIGN KEY (product_id) REFERENCES products (product_id)
);

CREATE TABLE attributes_table
(
    attribute_id SERIAL NOT NULL PRIMARY KEY,
    att_name     TEXT   NOT NULL,
    text         TEXT,
    num          INTEGER,
    bool         BOOLEAN,
    type         TEXT,
    product_id   INTEGER,
    FOREIGN KEY (product_id) REFERENCES products (product_id)
);

INSERT INTO users (user_name, email, user_password, administrator)
VALUES ('Gábor', 'user1@user1', 'user1', TRUE); -- 1

INSERT INTO users (user_name, email, user_password)
VALUES ('Péter', 'user2@user2', 'user2'), -- 2
       ('András', 'user2@user3', 'user3'); -- 3


