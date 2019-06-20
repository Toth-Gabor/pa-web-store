/*
    Database initialization script that runs on every web-application redeployment.
*/
DROP TRIGGER IF EXISTS product_quantity_check ON products;
DROP FUNCTION IF EXISTS product_quantity_check;
DROP TRIGGER IF EXISTS productid_occurence_check ON attributes_table;
DROP FUNCTION IF EXISTS productId_occurence_check;
DROP TRIGGER IF EXISTS product_quantity_check_on_update ON cart;
DROP FUNCTION IF EXISTS product_quantity_check_on_update;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS attributes_table CASCADE;
DROP TABLE IF EXISTS line_item CASCADE;
DROP TABLE IF EXISTS cart CASCADE;


CREATE TABLE users
(
    user_id       SERIAL NOT NULL PRIMARY KEY,
    user_name     TEXT   NOT NULL,
    email         TEXT   NOT NULL UNIQUE,
    password      TEXT   NOT NULL,
    administrator BOOLEAN DEFAULT FALSE,
    CONSTRAINT email_not_empty CHECK (email <> ''),
    CONSTRAINT pw_not_empty CHECK (password <> '')
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

CREATE TABLE orders
(
    order_id   SERIAL  NOT NULL PRIMARY KEY,
    user_id    INTEGER NOT NULL,
    order_date DATE,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE line_item
(
    order_id   INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity   INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (order_id) ON DELETE CASCADE,
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

CREATE TABLE cart
(
    product_id       INTEGER        NOT NULL,
    product_name     TEXT           NOT NULL,
    product_price    DECIMAL(10, 2) NOT NULL,
    product_quantity INTEGER        NOT NULL,
    user_id          INTEGER DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE FUNCTION product_quantity_check_on_update() RETURNS TRIGGER
AS
'
    BEGIN
        IF new.product_quantity > (SELECT quantity
                                   FROM products
                                            INNER JOIN cart ON cart.product_id = products.product_id
                                   WHERE products.product_id = cart.product_id) OR
           new.product_quantity < 0
        THEN
            RAISE EXCEPTION ''This quantity out of range!'';
        END IF;
        RETURN new;
    END; '
    LANGUAGE plpgsql;

CREATE TRIGGER product_quantity_check_on_update
    BEFORE UPDATE
    ON cart
    FOR EACH ROW
EXECUTE PROCEDURE product_quantity_check_on_update();

CREATE FUNCTION product_quantity_check() RETURNS TRIGGER
AS
'
    BEGIN
        IF new.quantity < 0 THEN
            RAISE EXCEPTION ''This product out of stock!'';
        END IF;
        RETURN new;
    END; '
    LANGUAGE plpgsql;

CREATE TRIGGER product_quantity_check
    BEFORE INSERT OR UPDATE
    ON products
    FOR EACH ROW
EXECUTE PROCEDURE product_quantity_check();

CREATE FUNCTION productId_occurence_check() RETURNS TRIGGER
AS
'
    BEGIN
        IF (SELECT count(product_id)
            FROM attributes_table
            WHERE product_id = new.product_id) > 5 THEN
            RAISE EXCEPTION ''Can not be more than 5!'';
        END IF;
        RETURN new;
    END; '
    LANGUAGE plpgsql;

CREATE TRIGGER productid_occurence_check
    BEFORE INSERT OR UPDATE
    ON attributes_table
    FOR EACH ROW
EXECUTE PROCEDURE productId_occurence_check();



INSERT INTO users (user_name, email, password, administrator)
VALUES ('Gábor', 'user1@user1', 'user1', TRUE); -- 1

INSERT INTO users (user_name, email, password)
VALUES ('Kriszta', 'user2@user2', 'user2'), -- 2
       ('Dorottya', 'user3@user3', 'user3'); -- 3

INSERT INTO products (product_name, brand, specification, description, quantity, price, photo_url)
VALUES ('EF 50mm F1.8 STM lens', 'Canon',
        'Mount: Canon EF | Elements/groups: 6/5 | Diaphragm blades: 7 | Autofocus: Stepping motor | Stabilizer: None | Minimum focus distance: 0.35m | Maximum magnification: 0.21x | Filter thread: 49mm | Dimensions (WxL): 69x39mm | Weight: 160g',
        'A great low-cost portrait lens for APS-C Canon DSLRs',
        10, 114, 'photos/Canon_EF_50mm_F1.8_STM_lens.jpg'),
       ('EF-S 17-55mm f2.8 IS USM', 'Canon',
        'Mount: Canon EF-S | Effective zoom range: 27-88mm | Lens construction: 19 elements in 12 groups | No. of diaphragm blades: 7 blades | Minimum focus distance: 0.35m | Filter size: 77mm | Dimensions: 84x111mm | Weight: 645g',
        'A veteran APS-C format lens, with high-quality build',
        11, 765, 'photos/Canon_EF-S_17-55mm_f2.8_IS_USM.jpg'),
       ('EF 24-70mm f2.8L II USM', 'Canon',
        'Mount: Canon EF | Effective zoom range: 24-70mm | Lens construction: 18 elements in 13 groups | No. of diaphragm blades: 9 blades | Minimum focus distance: 0.38m | Filter size: 82mm | Dimensions: 89x113mm | Weight: 805g',
        'This Mk II edition is the reinvention of a classic',
        20, 1789, 'photos/Canon_EF_24-70mm_f2.8L_II_USM.jpg'),
       ('EF 24-105mm f4L IS II USM', 'Canon',
        'Mount: Canon EF | Effective zoom range: 24-105mm | Lens construction: 17 elements in 12 groups | No. of diaphragm blades: 10 blades | Minimum focus distance: 0.45m | Filter size: 77m | Dimensions: 84x118mm | Weight: 795g',
        'Another Canon standard zoom gets upgraded',
        5, 1299, 'photos/Canon_EF_24-105mm_f4L_IS_II_USM.jpg'),
       ('Canon Ef front lens cap', 'Canon', '55mm Front Lens Cap', 'Snap-clips',
        10, 8, 'photos/Canon_lens_cap.jpg'),
       ('Canon Ef front lens cap', 'Canon', '58mm Front Lens Cap', 'Snap-clips',
        20, 9, 'photos/Canon_lens_cap.jpg'),
       ('Canon Ef front lens cap', 'Canon', '67mm Front Lens Cap', 'Snap-clips',
        13, 10, 'photos/Canon_lens_cap.jpg'),
       ('Canon Ef front lens cap', 'Canon', '72mm Front Lens Cap', 'Snap-clips',
        11, 10, 'photos/Canon_lens_cap.jpg');


INSERT INTO attributes_table (att_name, text, num, bool, type, product_id)
VALUES ('Mount', 'EF', NULL, NULL, 'text', 1),
       ('test1', 'test1', NULL, NULL, 'text', 1),
       ('test2', 'test2', NULL, NULL, 'text', 1),
       ('test3', 'test3', NULL, NULL, 'text', 1),
       ('test4', 'test4', NULL, NULL, 'text', 1),
       ('Mount', 'EF-S', NULL, NULL, 'text', 2),
       ('Mount', 'EF', NULL, NULL, 'text', 3),
       ('Mount', 'EF', NULL, NULL, 'text', 4),
       ('Diameter', NULL, 55, NULL, 'num', 5),
       ('Diameter', NULL, 58, NULL, 'num', 6),
       ('Diameter', NULL, 67, NULL, 'num', 7),
       ('Diameter', NULL, 72, NULL, 'num', 8);

INSERT INTO orders (user_id, order_date)
VALUES (1, '2008-01-01 00:00:01'),
       (1, '2004-01-01 00:00:01'),
       (2, '2011-01-01 00:00:01');

INSERT INTO line_item (order_id, product_id, quantity)
VALUES (1, 2, 10),
       (2, 1, 23),
       (3, 1, 33);

INSERT INTO cart (product_id, product_name, product_price, product_quantity, user_id) VALUES
        (2,'EF-S 17-55mm f2.8 IS USM', 765, 1, 1),
        (3,'EF 24-70mm f2.8L II USM', 1789, 4, 1),
        (5,'Canon Ef front lens cap', 8, 1, 1);


