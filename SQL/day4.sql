CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(50)
);

CREATE TABLE Subjects (
    subject_id INT,
    subject_name VARCHAR(30)
);

INSERT INTO Subjects
VALUES
(1, 'Math'),
(2, 'Science');

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50),
    department_id INT,
    salary DECIMAL(10,2),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);
INSERT INTO departments VALUES
(1, 'HR'),
(2, 'IT'),
(3, 'Finance'),
(4, 'Marketing'),
(5, 'Sales');

INSERT INTO employees VALUES
(101, 'Ali', 2, 60000),
(102, 'John', 1, 45000),
(103, 'Sara', 2, 70000),
(104, 'David', 3, 55000),
(105, 'Emma', NULL, 50000),
(106, 'Chris', 4, 65000),
(107, 'Sophia', 2, 75000);

SELECT *
FROM employees
JOIN deparments
ON employees.department_id = departments.department_id;


CREATE TABLE Restaurants(
	id INT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	location VARCHAR(100) NOT NULL
);

CREATE TABLE Orders(
	order_id INT PRIMARY KEY,
	restaurant_id INT NOT NULL,
	order_date DATE NOT NULL
);

INSERT INTO Restaurants (id, name, location) VALUES
(1, 'A2B', 'Chennai'),
(2, 'KFC', 'Coimbatore'),
(3, 'Dominos', 'Madurai'),
(4, 'Burger King', 'Salem'),
(5, 'Subway', 'Trichy');


INSERT INTO Orders (order_id, restaurant_id, order_date) VALUES
(101, 1, '2026-08-01'),
(102, 2, '2026-08-02'),
(103, 1, '2026-08-03'),
(104, 3, '2026-08-03'),
(105, 2, '2026-08-04'),
(106, 1, '2026-08-05'),
(107, 4, '2026-08-05');

DROP TABLE Orders;
DROP TABLE Restaurants;


CREATE TABLE Restaurants (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL
);

CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    restaurant_id INT REFERENCES Restaurants(id),
    order_date DATE,
);

INSERT INTO Restaurants (id, name, location)
VALUES
(1, 'Pizza Hut', 'Chennai'),
(2, 'KFC', 'Madurai'),
(3, 'Dominos', 'Trichy'),
(4, 'Burger King', 'Coimbatore'),
(5, 'Subway', 'Salem');

INSERT INTO Orders (order_id, restaurant_id, order_date)
VALUES
(101, 1, '2026-08-01'),
(102, 2, '2026-08-02'),
(103, 1, '2026-08-03'),
(104, 3, '2026-08-04');

SELECT * FROM Restaurants
INNER JOIN Orders
ON Restaurants.id = Orders.restaurant_id;


CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(50),
    class VARCHAR(20)
);
INSERT INTO Students (student_id, student_name, class)
VALUES
(1, 'Ali', '10A'),
(2, 'Rahul', '10A'),
(3, 'John', '10B'),
(4, 'Sara', '10C');

CREATE TABLE Marks (
    mark_id INT PRIMARY KEY,
    student_id INT,
    subject VARCHAR(30),
    marks INT,
    FOREIGN KEY (student_id) REFERENCES Students(student_id)
);

INSERT INTO Marks (mark_id, student_id, subject, marks)
VALUES
(101, 1, 'Math', 95),
(102, 2, 'Math', 80),
(103, 3, 'Math', 91);

INSERT INTO Marks Values (104,1,'Science',20);
INSERT INTO Marks Values (106,1,'Science',null);

INSERT INTO Marks Values (105,null,'Science',20);

DROP TABLE Students CASCADE;
DROP TABLE Marks cascade;

CREATE TABLE Students (
    student_id INT,
    student_name VARCHAR(50),
    class VARCHAR(20)
);

CREATE TABLE Marks (
    mark_id INT,
    student_id INT,
    subject VARCHAR(30),
    marks INT
);

INSERT INTO Students
VALUES
(1, 'Ali', '10A'),
(2, 'Rahul', '10A'),
(3, 'John', '10B'),
(4, 'Sara', '10C');

INSERT INTO Marks
VALUES
(101, 1, 'Math', 95),
(102, 2, 'Math', 80),
(103, 3, 'Math', 91),
(104, 5, 'Math', 88);


--RIGHT JOIN
SELECT student_name ,marks FROM students
RIGHT JOIN marks
ON students.student_id=marks.student_id;

--INNER JOIN
SELECT student_name ,marks
FROM students
INNER JOIN marks
ON Students.student_id=Marks.student_id;


SELECT * from students s
inner join marks m
on s.student_id=m.student_id;


--LEFT JOIN
SELECT *
FROM Students
LEFT JOIN marks
ON Students.studeNt_id = Marks.student_id;

--FULL OUTER JOIN
SELECT s.student_name ,m.marks
FROM students s
FULL OUTER JOIN marks m
ON s.student_id = m.student_id;


--SELF JOIN
SELECT
    e.emp_name AS Employee,
    m.emp_name AS Manager
FROM Employees e
JOIN Employees m
ON e.manager_id = m.emp_id;



--CROSS JOIN
SELECT * FROM Students
CROSS JOIN subjects;



--NATURAL JOIN
SELECT student_name, marks
FROM Students
NATURAL JOIN Marks;


--LEFT SEMI JOIN

SELECT s.student_name FROM students s
WHERE EXISTS(
	SELECT 1
	FROM marks m
	WHERE s.student_id=m.student_id
)


select student_name,mark from students
inner join marks
on students.student_id=marks.student_id



SELECT s.student_name ,m.mark from students s
inner join marks m




CREATE TABLE hires_2024 (
    emp_id INT,
    name VARCHAR(50)
);

CREATE TABLE hires_2025 (
    emp_id INT,
    name VARCHAR(50)
);

INSERT INTO hires_2024
VALUES
(101, 'Asha'),
(102, 'Ravi'),
(103, 'Meera');

INSERT INTO hires_2025
VALUES
(201, 'Ravi'),
(202, 'Karan'),
(203, 'Priya');

--UNION
SELECT name FROM hires_2024
UNION 
SELECT name FROM hires_2025;


--INTERSECT
SELECT name FROM hires_2024
INTERSECT 
SELECT name FROM hires_2025;


--EXCEPT
SELECT name FROM hires_2024
EXCEPT 
SELECT name FROM hires_2025;










