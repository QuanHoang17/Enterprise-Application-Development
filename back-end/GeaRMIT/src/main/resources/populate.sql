SELECT * FROM brand;
DELETE from brand;
INSERT INTO  brand
VALUES
       ('brand01','MSI'),
       ('brand02','Razer'),
       ('brand03','Logitech'),
       ('brand04', 'Elgato'),
       ('brand05', 'HyperX');


SELECT * from category;
DELETE from category;
INSERT INTO category
VALUES
('category01','Best gaming mouses in the world', 'Mouse'),
('category02', 'Best gaming keyboard in the world','Keyboard'),
('category03', 'Best gaming keyboard in the world','Headsets'),
('category04', 'Best gaming mouse pads in the world','Mouse Pads'),
('category05', 'Best gaming microphones in the world','Microphones')
;

SELECT * from customer;


SELECT * from product;
DELETE from product;
INSERT INTO product
VALUES
       ('item01','MX ERGO is crafted for the shape of your hand and built for fast and precise tracking.', '2021-05-20', 'MX ERGO', 120, 20, 'brand03', 'category01'),
       ('item02','A state of the art PixArt PAW 3309 optical sensor with up to 6400 DPI can keep up with your every move.', '2021-05-20', 'CLUTCH GM20 ELITE', 260, 20, 'brand01', 'category01'),
       ('item03','Introducing the Razer Orochi V2—a compact, ultra-lightweight wireless gaming mouse with the longest battery life that’s second to none.', '2021-05-20', 'RAZER OROCHI V2', 690, 20, 'brand02', 'category01'),
       ('item04','Craft is a wireless keyboard with a premium typing experience and a versatile input dial that adapts to what you’re making', '2021-05-20', 'LOGITECH CRAFT', 210, 20, 'brand03', 'category02'),
       ('item05','MX ERGO is crafted for the shape of your hand and built for fast and precise tracking.', '2021-05-20', 'VIGOR GK60', 420, 50, 'brand01', 'category02'),
       ('item06','Gaming Keyboard with Razer™ Analog Optical Switches', '2021-05-20', 'Razer Huntsman V2 Analog', 450, 10, 'brand03', 'category02'),
       ('item07', 'The Logitech G Pro X wired gaming headset has a sturdy, comfortable design', '2021-05-06', 'Logitech G Pro X Gaming Headset', 130, 20, 'brand03', 'category03'),
       ('item08', 'The Razer Nari Essential is a budget-friendly wireless gaming headset with a powerful audio performance.', '2021-05-06', 'Razer Nari Essential', 100, 20, 'brand02', 'category03'),
       ('item09', 'The wired Razer Blackshark V2 gaming headset offers excellent audio quality and a light, comfortable fit.', '2021-05-06', 'Razer Blackshark V2', 100, 20, 'brand02', 'category03'),
       ('item10', 'The Razer Gigantus V2 has everything you need in a cloth mouse pad at around $10: a textured surface, padded comfort, and a non-slip underside.', '2021-05-06', 'Razer Gigantus V2', 10, 20, 'brand02', 'category04'),
       ('item11', 'The best selling Razer Goliathus mouse mat is now powered by Razer Chroma, with customizable full spectrum of 16.8 million color options.', '2021-05-06', 'Razer Goliathus Chroma', 40, 20, 'brand02', 'category04'),
       ('item12', 'G440 features ultra low surface friction, offering high DPI gamers an ideal surface for subtle hand movements and quick mouse gestures.', '2021-05-06', 'Logitech G440', 30, 20, 'brand03', 'category04'),
       ('item13','If you are looking for a microphone to help simplify a complicated setup, the Elgato Wave:3 might be just the ticket.', '2021-05-20', 'Elgato Wave: 3', 159, 10, 'brand04', 'category05'),
       ('item14','The HyperX Quadcast is an ultra-credible USB mic that takes aim at other units in the sub-$200 price range.', '2021-05-20', 'HyperX QuadCast', 140, 10, 'brand05', 'category05'),
       ('item15','Professional Grade Single dynamic capsule ensures minimal electronic interference for a richer, warmer and true to life broadcasting experience', '2021-05-20', 'Micro Razer Seiren Elite', 200, 10, 'brand02', 'category05');


SELECT * from image;
DELETE from image;
INSERT INTO image
VALUES
    ('image01', 'item01image01.png', 'item01'),
    ('image02', 'item01image02.jpg', 'item01'),
    ('image03', 'item01image03.png', 'item01'),
    ('image04', 'item02image04.jpg', 'item02'),
    ('image05', 'item02image05.jpg', 'item02'),
    ('image06', 'item02image06.png', 'item02'),
    ('image07', 'item03image07.jpg', 'item03'),
    ('image08', 'item03image08.jpg', 'item03'),
    ('image09', 'item03image09.jpg', 'item03'),
    ('image10', 'item04image10.jpg', 'item04'),
    ('image11', 'item04image11.jpg', 'item04'),
    ('image12', 'item04image12.jpg', 'item04'),
    ('image13', 'item05image13.png', 'item05'),
    ('image14', 'item05image14.jpg', 'item05'),
    ('image15', 'item05image15.png', 'item05'),
    ('image16', 'item06image16.jpg', 'item06'),
    ('image17', 'item06image17.jpg', 'item06'),
    ('image18', 'item06image18.jpg', 'item06'),
    ('image19', 'item07image19.jpg', 'item07'),
    ('image20', 'item07image20.jpg', 'item07'),
    ('image21', 'item07image21.jpg', 'item07'),
    ('image22', 'item08image22.jpg', 'item08'),
    ('image23', 'item08image23.jpg', 'item08'),
    ('image24', 'item08image24.jpg', 'item08'),
    ('image25', 'item09image25.jpg', 'item09'),
    ('image26', 'item09image26.jpg', 'item09'),
    ('image27', 'item09image27.jpg', 'item09'),
    ('image28', 'item10image28.jpg', 'item10'),
    ('image29', 'item10image29.jpg', 'item10'),
    ('image30', 'item10image30.jpg', 'item10'),
    ('image31', 'item11image31.jpg', 'item11'),
    ('image32', 'item11image32.jpg', 'item11'),
    ('image33', 'item11image33.jpg', 'item11'),
    ('image34', 'item12image34.png', 'item12'),
    ('image35', 'item12image35.jpeg', 'item12'),
    ('image36', 'item12image36.png', 'item12'),
    ('image37', 'item13image37.jpeg', 'item13'),
    ('image38', 'item13image38.jpeg', 'item13'),
    ('image39', 'item13image39.jpeg', 'item13'),
    ('image40', 'item14image40.jpeg', 'item14'),
    ('image41', 'item14image41.jpeg', 'item14'),
    ('image42', 'item14image42.jpeg', 'item14'),
    ('image43', 'item15image43.jpeg', 'item15'),
    ('image44', 'item15image44.jpeg', 'item15'),
    ('image45', 'item15image45.jpeg', 'item15');


SELECT * FROM color;
DELETE FROM color;
INSERT INTO color
VALUES
    ('red'),('blue'), ('yellow');


SELECT * FROM product_color;
DELETE FROM product_color;
INSERT INTO product_color
VALUES
    ('item01', 'red'), ('item02', 'red'),  ('item03', 'red'), ('item04', 'blue'), ('item05', 'yellow'),
    ('item06', 'blue'), ('item01', 'blue'), ('item02', 'blue'), ('item03', 'blue'), ('item04', 'yellow'),
    ('item03', 'yellow'), ('item02', 'yellow'), ('item01', 'yellow'), ('item06', 'red'), ('item05', 'red'),
    ('item07', 'red'), ('item07', 'blue'), ('item07', 'yellow'),
    ('item08', 'red'), ('item08', 'blue'), ('item08', 'yellow'),
    ('item09', 'red'), ('item09', 'blue'), ('item09', 'yellow'),
    ('item10', 'red'), ('item10', 'blue'), ('item10', 'yellow'),
    ('item11', 'red'), ('item11', 'blue'), ('item11', 'yellow'),
    ('item12', 'red'), ('item12', 'blue'), ('item12', 'yellow'),
    ('item13', 'red'), ('item13', 'blue'), ('item13', 'yellow'),
    ('item14', 'red'), ('item14', 'blue'), ('item14', 'yellow'),
    ('item15', 'red'), ('item15', 'blue'), ('item15', 'yellow');


-- name: admin, password: admin
SELECT * FROM customer;
DELETE FROM customer;
INSERT INTO customer
VALUES
    ('c01', 'admin', 'admin@gearmit.com', true, '$2a$10$eigyxoT6gc5sklBBVv2txOigV5vtcoaAtBdagoJYEk3HvIdXAm24G', '0901094', 'admin');