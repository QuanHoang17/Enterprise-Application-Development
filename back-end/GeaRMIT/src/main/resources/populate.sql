SELECT * FROM brand;
DELETE from brand;
INSERT INTO  brand
VALUES
       ('brand01','MSI'),
       ('brand02','Razer'),
       ('brand03','Logitech')
       ;


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
       ('item05','MX ERGO is crafted for the shape of your hand and built for fast and precise tracking. Adjust your hand and wrist posture with the unique 0 or 20° tilt angle to conquer those lengthy decks and spreadsheets with ease — all the way from start to finish.', '2021-05-20', 'VIGOR GK60', 420, 50, 'brand01', 'category02'),
       ('item06','Gaming Keyboard with Razer™ Analog Optical Switches', '2021-05-20', 'Razer Huntsman V2 Analog', 450, 10, 'brand03', 'category02');



SELECT * FROM color;
INSERT INTO color
VALUES
    ('red'),('blue'), ('yellow');


SELECT * FROM product_color;
INSERT INTO product_color
VALUES
       ('item01', 'red'), ('item02', 'red'),  ('item03', 'red'), ('item04', 'blue'), ('item05', 'yellow'),
       ('item06', 'blue'), ('item01', 'blue'), ('item02', 'blue'), ('item03', 'blue'), ('item04', 'yellow'),
       ('item03', 'yellow'), ('item02', 'yellow'), ('item01', 'yellow'), ('item06', 'red'), ('item05', 'red')