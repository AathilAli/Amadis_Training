CREATE TABLE employees (
    emp_id SERIAL PRIMARY KEY,
    emp_name VARCHAR(50) NOT NULL,
    department VARCHAR(30),
    salary DECIMAL(10,2),
    age INT
);
INSERT INTO employees (emp_name, department, salary, age)
VALUES
('Alice', 'HR', 30000, 24),
('Bob', 'IT', 45000, 27),
('Charlie', 'IT', 50000, 29),
('David', 'Sales', 35000, 26),
('Emma', 'IT', 55000, 30),
('Frank', 'HR', 32000, 25),
('Grace', 'Sales', 40000, 28),
('Henry', 'Finance', 60000, 31);

SELECT * FROM employees;

SELECT COUNT(*) from employees;
SELECT COUNT(department)
FROM employees;

SELECT MAX(emp_name) from employees;

-- 1. Highest salary
SELECT MAX(salary)
FROM employees;

-- 2. Oldest employee age
SELECT MAX(age)
FROM employees;

-- 3. Highest salary in the HR department
SELECT MAX(salary)
FROM employees
WHERE department = 'HR';

-- 4. Last employee name alphabetically
SELECT MAX(emp_name)
FROM employees;

-- 1. Lowest salary
SELECT MIN(salary)
FROM employees;

-- 2. Youngest employee
SELECT MIN(age)
FROM employees;

-- 3. Lowest salary in Sales
SELECT MIN(salary)
FROM employees
WHERE department = 'Sales';

-- 4. First employee alphabetically
SELECT MIN(emp_name)
FROM employees;

SELECT SUM(salary)
FROM employees;

-- 1. Total salary of all employees
SELECT SUM(salary)
FROM employees;

-- 2. Total salary in the HR department
SELECT SUM(salary)
FROM employees
WHERE department = 'HR';

-- 3. Total age of all employees
SELECT SUM(age)
FROM employees;

-- 4. Total salary in the Sales department
SELECT SUM(salary)
FROM employees
WHERE department = 'Sales';

SELECT AVG(salary)
FROM employees;

SELECT * from employees;


SELECT department,SUM(salary) FROM employees GROUP BY department;
SELECT SUM(salary) FROM employees WHERE department='IT';

SELECT department, SUM(salary)
FROM employees
GROUP BY department
-- HAVING SUM(salary) > 70000



SELECT department, SUM(salary)
FROM employees
GROUP BY department
HAVING SUM(salary) > 70000;


-- FROM
--    ↓
-- WHERE
--    ↓
-- GROUP BY
--    ↓
-- SUM() is calculated for each group
--    ↓
-- HAVING uses that SUM() to filter groups
--    ↓
-- SELECT displays that SUM()
--    ↓
-- ORDER BY
--    ↓
-- LIMIT


SELECT department,SUM(salary) FROM employees GROUP BY department HAVING SUM(salary) > 7000;

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(50),
    category VARCHAR(30),
    price DECIMAL(10,2),
    stock INT
);
INSERT INTO products (product_name, category, price, stock)
VALUES
('Laptop', 'Electronics', 60000, 15),
('Mouse', 'Electronics', 1000, 100),
('Keyboard', 'Electronics', 2500, 50),
('Chair', 'Furniture', 5000, 20),
('Table', 'Furniture', 8000, 10),
('Pen', 'Stationery', 20, 500),
('Notebook', 'Stationery', 100, 200),
('Monitor', 'Electronics', 15000, 25),
('Cupboard', 'Furniture', 12000, 5),
('Pencil', 'Stationery', 10, 300);

CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    student_name VARCHAR(50),
    department VARCHAR(20),
    marks INT
);

INSERT INTO students (student_name, department, marks)
VALUES
('Arun', 'CSE', 85),
('Bala', 'CSE', 90),
('Charan', 'ECE', 75),
('Deepak', 'ECE', 80),
('Ezhil', 'ECE', 70),
('Farhan', 'MECH', 65),
('Gokul', 'MECH', 60),
('Hari', 'CSE', 95),
('Imran', 'CIVIL', 88),
('John', 'CIVIL', 92);

SELECT department, COUNT(student_name) FROM students GROUP BY department;
SELECT department , SUM(marks) FROM students GROUP BY department;
SELECT department , AVG(marks) FROM students GROUP BY department;
SELECT department , MAX(marks) FROM students GROUP BY department;
SELECT department , MIN(marks) FROM students GROUP BY department;

SELECT department ,COUNT(*)  FROM students GROUP BY department HAVING COUNT(*) > 2;
SELECT department ,SUM(marks) FROM students GROUP BY department HAVING SUM(marks) > 200;
SELECT department ,AVG(marks) FROM students GROUP BY department HAVING AVG(marks) > 200;
SELECT department ,MAX(marks) FROM students GROUP BY department HAVING MAX(marks) > 200;

SELECT department, COUNT(*)
FROM students
GROUP BY department
HAVING COUNT(*) > 2;

SELECT department, COUNT(*),marks
FROM students
WHERE marks > 80
GROUP BY department
HAVING COUNT(*) >= 2;

SELECT department,marks
FROM students
GROUP BY department,marks;

SELECT student_name,marks, COUNT(*)
FROM students
GROUP BY student_name,marks;

SELECT COUNT() from products;
SELECT * FROM PRODUCTS;

SELECT category, 

       COUNT(*) 

FROM products 

GROUP BY 1; 

SELECT * FROM products;

SELECT DATE_TRUNC('month',order_date) from orders

SELECT category, SUM(price) AS revenue 
FROM  products
GROUP BY category 

SELECT  SUM(price) AS total FROM products HAVING SUM(price) > 1000; 
HAVING AVG(price) > 200;


CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(50),
    order_date DATE,
    amount DECIMAL(10,2)
);

INSERT INTO orders (customer_name, order_date, amount)
VALUES
('Alice', '2026-01-05', 1000),
('Bob', '2026-01-12', 2000),
('Charlie', '2026-01-25', 1500),
('David', '2026-02-02', 3000),
('Emma', '2026-02-15', 2500),
('Frank', '2026-03-10', 4000),
('Grace', '2026-03-18', 3500),
('Henry', '2026-03-25', 4500),
('Imran', '2026-04-05', 5000),
('John', '2026-04-20', 2000);

SELECT order_date ,DATE_TRUNC('month',order_date) FROM orders;

SELECT  DATE_TRUNC('month', order_date)
FROM orders
GROUP BY DATE_TRUNC('month', order_date);

SELECT DATE_TRUNC('month', order_date) AS month,
       SUM(amount) AS monthly_revenue
FROM orders
GROUP BY DATE_TRUNC('month', order_date);

SELECT SUM(amount) AS total FROM orders HAVING SUM(amount) > 1000; 

SELECT product_id, 
	SUM(price)											AS total_spent, 
	SUM(price) FILTER (WHERE category = 'Electronics') AS electronics_spent, 
	COUNT(*) FILTER (WHERE category = 'Stationary')  
FROM products 
GROUP BY product_id; 

SELECT * FROM products;

CREATE TABLE employees (
    emp_id SERIAL PRIMARY KEY,
    emp_name VARCHAR(50),
    department VARCHAR(20),
    salary INT
);

INSERT INTO employees (emp_name, department, salary)
VALUES
('Alice', 'HR', 30000),
('Bob', 'IT', 45000),
('Charlie', 'IT', 50000),
('David', 'Sales', 35000),
('Emma', 'IT', 55000),
('Frank', 'HR', 32000);

SELECT
COUNT(*)
FILTER (WHERE department = 'IT') AS it_employees
FROM employees;

SELECT
    COUNT(*) AS total,
    COUNT(*) FILTER (WHERE department = 'IT') AS it_count,
    COUNT(*) FILTER (WHERE department = 'HR') AS hr_count,
    COUNT(*) FILTER (WHERE department = 'Sales') AS sales_count
FROM employees;


SELECT
    customer_name,
    SUM(amount) AS total_spent
FROM orders
GROUP BY customer_name;


SELECT
    customer_name,
    SUM(amount) AS total_spent,
    SUM(amount) FILTER (WHERE amount > 3000) AS high_value_orders,
    COUNT(*) FILTER (WHERE amount <= 3000) AS small_orders
FROM orders
GROUP BY customer_name;


SELECT  COALESCE(COUNT(product_name), 0) AS total_or_zero 
FROM products  ;
SELECT COALESCE 
SELECT STRING_AGG(category,',') FROM products;
SELECT product_id, STRING_AGG(category, ', ') AS purchased_categories  FROM products  GROUP BY product_id

SELECT MODE() WITHIN GROUP(ORDER BY amount)

SELECT DISTINCT category FROM products;

