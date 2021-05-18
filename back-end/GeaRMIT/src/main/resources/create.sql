DROP TABLE IF EXISTS product_color;
DROP TABLE IF EXISTS color;
DROP TABLE IF EXISTS image;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS brand;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS customer;

CREATE TABLE brand(
    id VARCHAR(255) UNIQUE,
    name VARCHAR(255) UNIQUE,
    CONSTRAINT brand_pk PRIMARY KEY (id)
);

CREATE TABLE category(
    id VARCHAR(255) UNIQUE,
    description VARCHAR(255),
    name VARCHAR(255) UNIQUE,
    CONSTRAINT category_pk PRIMARY KEY (id)
);

CREATE TABLE color(
    name VARCHAR(255) UNIQUE,
    CONSTRAINT color_pk PRIMARY KEY (name)
);

CREATE TABLE product(
    id VARCHAR(255) UNIQUE,
    description VARCHAR(255),
    issue_date TIMESTAMP,
    name VARCHAR(255) UNIQUE,
    price BIGINT,
    quantity BIGINT,
    brand_id VARCHAR(255),
    category_id VARCHAR(255),
    CONSTRAINT product_pk PRIMARY KEY (id),
    CONSTRAINT brand_id_fk FOREIGN KEY (brand_id) REFERENCES brand(id) ON DELETE CASCADE,
    CONSTRAINT category_id_fk FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);

CREATE TABLE image(
    id VARCHAR(255) UNIQUE,
    name VARCHAR(255) UNIQUE,
    product_id VARCHAR(255),
    CONSTRAINT image_pk PRIMARY KEY (id),
    CONSTRAINT product_id_fk FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);

CREATE TABLE product_color(
    product_id VARCHAR(255),
    color_name VARCHAR(255),
    CONSTRAINT product_color_pk PRIMARY KEY (product_id, color_name),
    CONSTRAINT product_id_fk FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
    CONSTRAINT color_name_fk FOREIGN KEY (color_name) REFERENCES color(name) ON DELETE CASCADE
);

CREATE TABLE customer(
    id VARCHAR(255) UNIQUE,
    name VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    enabled BOOLEAN,
    password VARCHAR(255),
    phone VARCHAR(255),
    privilege VARCHAR(255),
    CONSTRAINT customer_pk PRIMARY KEY (id)
);

CREATE TABLE token(
    id BIGINT UNIQUE,
    expiry_date TIMESTAMP,
    token VARCHAR(255),
    user_id VARCHAR(255),
    CONSTRAINT token_pk PRIMARY KEY (id),
    CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES customer(id) ON DELETE CASCADE
);
