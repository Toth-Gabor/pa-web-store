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
    password      TEXT   NOT NULL,
    administrator BOOLEAN DEFAULT FALSE,
    CONSTRAINT email_not_empty CHECK (email <> ''),
    CONSTRAINT pw_not_empty CHECK (password <> '')
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

INSERT INTO users (user_name, email, password, administrator)
VALUES ('Gábor', 'user1@user1', 'user1', TRUE); -- 1

INSERT INTO users (user_name, email, password)
VALUES ('Péter', 'user2@user2', 'user2'), -- 2
       ('András', 'user2@user3', 'user3'); -- 3

INSERT INTO products (product_name, brand, specification, description, price, photo_url)
VALUES ('EF 50mm F1.8 STM lens', 'Canon',
        'Mount: Canon EF | Elements/groups: 6/5 | Diaphragm blades: 7 | Autofocus: Stepping motor | Stabilizer: None | Minimum focus distance: 0.35m | Maximum magnification: 0.21x | Filter thread: 49mm | Dimensions (WxL): 69x39mm | Weight: 160g',
        'A great low-cost portrait lens for APS-C Canon DSLRs',
        114, 'Canon_EF_50mm_F1.8_STM_lens.jpg'),
       ('EF-S 17-55mm f2.8 IS USM', 'Canon',
        'Mount: Canon EF-S | Effective zoom range: 27-88mm | Lens construction: 19 elements in 12 groups | No. of diaphragm blades: 7 blades | Minimum focus distance: 0.35m | Filter size: 77mm | Dimensions: 84x111mm | Weight: 645g',
        'A veteran APS-C format lens, with high-quality build',
        765, 'photos/Canon_EF-S_17-55mm_f2.8_IS_USM.jpg'),
       ('EF 24-70mm f2.8L II USM', 'Canon',
        'Mount: Canon EF | Effective zoom range: 24-70mm | Lens construction: 18 elements in 13 groups | No. of diaphragm blades: 9 blades | Minimum focus distance: 0.38m | Filter size: 82mm | Dimensions: 89x113mm | Weight: 805g',
        'This Mk II edition is the reinvention of a classic',
        1789, 'photos/Canon_EF_24-70mm_f2.8L_II_USM.jpg'),
       ('EF 24-105mm f4L IS II USM', 'Canon',
        'Mount: Canon EF | Effective zoom range: 24-105mm | Lens construction: 17 elements in 12 groups | No. of diaphragm blades: 10 blades | Minimum focus distance: 0.45m | Filter size: 77m | Dimensions: 84x118mm | Weight: 795g',
        'Another Canon standard zoom gets upgraded',
        1299, 'photos/Canon_EF_24-105mm_f4L_IS_II_USM.jpg'),
       ('Canon Ef front lens cap', 'Canon', '55mm Front Lens Cap', 'Snap-clips',
        8, 'photos/Canon_lens_cap.jpg'),
       ('Canon Ef front lens cap', 'Canon', '58mm Front Lens Cap', 'Snap-clips',
        9, 'photos/Canon_lens_cap.jpg'),
       ('Canon Ef front lens cap', 'Canon', '67mm Front Lens Cap', 'Snap-clips',
        10, 'photos/Canon_lens_cap.jpg'),
       ('Canon Ef front lens cap', 'Canon', '72mm Front Lens Cap', 'Snap-clips',
        10, 'photos/Canon_lens_cap.jpg');


INSERT INTO attributes_table (att_name, text, num, bool, type, product_id)
VALUES ('Mount', 'EF', NULL, NULL, 'text', 1),
       ('Mount', 'EF-S', NULL, NULL, 'text', 2),
       ('Mount', 'EF', NULL, NULL, 'text', 3),
       ('Mount', 'EF', NULL, NULL, 'text', 4),
       ('Diameter', null, 55, null, 'num', 5),
       ('Diameter', null, 58, null, 'num', 6),
       ('Diameter', null, 67, null, 'num', 7),
       ('Diameter', null, 72, null, 'num', 8);