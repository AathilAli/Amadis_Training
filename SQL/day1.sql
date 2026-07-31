CREATE TABLE employee (
id INT,
name VARCHAR(100),
salary DECIMAL(10,2),
is_active BOOLEAN
);

INSERT INTO employee 
VALUES (1,'Aathil Ali',25000.75,TRUE),
	(2,'Rahul',18000.50,FALSE),	
	(3,'John',32000.00,TRUE);

SELECT * from employee;
SELECT name from employee;
SELECT salary  from employee;
SELECT name,salary from employee;
SELECT id,name,is_active from employee;


CREATE TABLE students (
student_id int PRIMARY KEY,
student_name VARCHAR(20) NOT NULL,
department VARCHAR(20) NOT NULL,
cgpa DECIMAL(3,2) NOT NULL,
placement VARCHAR(20) NOT NULL 
)


SELECT * from employee where  id != 1;
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    in_stock BOOLEAN DEFAULT TRUE
);
INSERT INTO products
(product_id, product_name, category, price, stock, in_stock)
VALUES
(1, 'Laptop', 'Electronics', 65000.00, 15, TRUE),
(2, 'Mouse', 'Electronics', 800.00, 120, TRUE),
(3, 'Keyboard', 'Electronics', 1500.00, 0, FALSE),
(4, 'Chair', 'Furniture', 4500.00, 25, TRUE),
(5, 'Table', 'Furniture', 7000.00, 8, TRUE),
(6, 'Notebook', 'Stationery', 80.00, 250, TRUE),
(7, 'Pen', 'Stationery', 20.00, 500, TRUE),
(8, 'Monitor', 'Electronics', 12000.00, 5, TRUE),
(9, 'Printer', 'Electronics', 9500.00, 0, FALSE),
(10, 'Cupboard', 'Furniture', 18000.00, 3, TRUE);

SELECT * FROM products where price > 1000 and price < 15000
SELECT * FROM products where price BETWEEN 1000 AND 15000

SELECT * FROM products where stock = 0 OR stock =5 OR stock =15
SELECT * FROM products
WHERE stock IN (0, 5, 15);

SELECT * FROM products where category != 'Electronics';
SELECT * FROM products WHERE category <> 'Electronics';

SELECT * FROM products where price < 10000 AND stock > 0
SELECT * FROM products where price < 5000
SELECT * FROM products where category != 'Furniture';

SELECT * FROM products ORDER BY price ASC;
SELECT * FROM products ORDER BY product_name DESC;
SELECT * FROM products ORDER BY category ASC, price DESC;

SELECT * FROM products LIMIT 3;
SELECT * FROM products ORDER BY price ASC LIMIT 2;

SELECT DISTINCT category FROM products;
SELECT DISTINCT category, in_stock FROM products;

UPDATE products SET price = 900 WHERE product_id=2;
SELECT * FROM products WHERE product_id=2;

SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

UPDATE products SET price = 1000,stock = 50 WHERE product_id = 2

SELECT * FROM products;
DELETE FROM products WHERE product_id=6
SELECT * FROM products;

ALTER TABLE products ADD COLUMN stock_id INT
ALTER TABLE products RENAME COLUMN stocks_id 
ALTER TABLE products DROP COLUMN stocks_id

ALTER TABLE products RENAME TO items;

ALTER TABLE products ALTER COLUMN price TYPE DECIMAL(10,2);

CREATE VIEW electronic_products AS SELECT * FROM products WHERE category = 'Electronics';

SELECT * FROM electronic_products;

CREATE PROCEDURE increase_price()
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE products
    SET price = price + 500;
END;
$$;

CALL increase_price();

CREATE FUNCTION add_numbers(a INT, b INT)
RETURNS INT
AS $$
BEGIN
    RETURN a + b;
END;
$$ LANGUAGE plpgsql;
