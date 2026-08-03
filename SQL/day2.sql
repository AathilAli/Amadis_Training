CREATE TABLE students (
    id  SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);
INSERT INTO students VALUES (1,'Aathil');
INSERT INTO students(name) VALUES ('Aathil');
INSERT INTO students VALUES (100,'Aathil');

INSERT INTO students(name) VALUES ('Aathil');




INSERT INTO students VALUES (2,NULL);
INSERT INTO students VALUES(1,'Ali');


ALTER TABLE students ADD COLUMN phone_number VARCHAR(10) NOT NULL;
SELECT * FROM students;
DROP TABLE students;

-- ADD PRIMMARY KEY
ALTER TABLE students
ADD CONSTRAINT students_pk
PRIMARY KEY(id);

--REMOVE PRIMARY KEY
ALTER TABLE students
DROP CONSTRAINT students_pkey;

CREATE TABLE Books(
	BookID INT,
	Title VARCHAR(255)
);
CREATE TABLE Authors (
	AuthorID int,
	AuthorName VARCHAR(255)
);
INSERT INTO Books 
VALUES (1,'BookOne'),(2,'BookTwo'),(3,'BookThree');
INSERT  INTO Authors
VALUES (1,'Aathil'),(2,'Ali'),(3,'Aathil Ali');

SELECT * from Books;

INSERT INTO Books VALUES (3,'BookFour');
DELETE FROM Books WHERE BookID=3;

ALTER TABLE Books ADD CONSTRAINT pk_bookid PRIMARY KEY (BookID);

CREATE TABLE departments(
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50)
);

CREATE TABLE students(
    student_id INT PRIMARY KEY,
    student_name VARCHAR(50),
    dept_id INT, FOREIGN KEY (dept_id)
	REFERENCES departments(dept_id)
);
INSERT INTO departments
VALUES
(1, 'CSE'),
(2, 'ECE'),
(3, 'IT');

SELECT * FROM departments;

INSERT INTO students
VALUES
(101, 'Aathil', 1),
(102, 'Ali', 1),
(103, 'John', 2);

SELECT * FROM students;

INSERT INTO students
VALUES
(104, 'Sara', 10); --ERROR 
DELETE FROM departments
WHERE dept_id = 1;

DROP TABLE students;


--1NF EXAMPLE 

CREATE TABLE students(
    student_id INT PRIMARY KEY,
    student_name VARCHAR(50),
    subjects VARCHAR(100)
);

INSERT INTO students
VALUES
(1, 'Aathil', 'Math,Physics,Chemistry'),
(2, 'Ali', 'Java,Python');

-- BEFORE OUTPUT:
-- | student_id | student_name | subjects               |
-- | ---------- | ------------ | ---------------------- |
-- | 1          | Aathil       | Math,Physics,Chemistry |
-- | 2          | Ali          | Java,Python            |


CREATE TABLE student_subjects(
    student_id INT,
    student_name VARCHAR(50),
    subject VARCHAR(50)
);

INSERT INTO student_subjects
VALUES
(1,'Aathil','Math'),
(1,'Aathil','Physics'),
(1,'Aathil','Chemistry'),
(2,'Ali','Java'),
(2,'Ali','Python');

SELECT *
FROM student_subjects
WHERE subject = 'Physics';

--AFTER
-- | student_id | student_name | subject |
-- | ---------- | ------------ | ------- |
-- | 1          | Aathil       | Physics |




