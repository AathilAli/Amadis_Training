CREATE TABLE Users (
	user_id INT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Courses(
	course_id INT PRIMARY KEY,
	course_name VARCHAR(255) NOT NULL,
	description TEXT
);

CREATE TABLE Lessons(
	lesson_id INT PRIMARY KEY,
	course_id INT REFERENCES Courses(course_id),
	lesson_name VARCHAR(255) NOT NULL,
	lesson_order INT NOT NULL
);

CREATE TABLE Enrollments (
	enrollment_id INT  PRIMARY KEY,
	user_id INT REFERENCES Users(user_id),
	course_id INT REFERENCES Courses(course_id),
	enrolled_at DATE NOT NULL
);

CREATE TABLE Lesson_Progress(
	progress_id INT PRIMARY KEY,
	user_id INT REFERENCES Users(user_id),
	lesson_id INT REFERENCES Lessons(lesson_id),
	completed BOOLEAN NOT NULL,
	completed_at DATE 
);

CREATE TABLE Quizzes(
	quiz_id INT PRIMARY KEY,
	course_id INT REFERENCES Courses(course_id),	
	quiz_name VARCHAR(255) NOT NULL,
	max_score INT NOT NULL	
);

CREATE TABLE Quiz_Results(
	result_id INT PRIMARY KEY,
	user_id INT REFERENCES Users(user_id),
	quiz_id INT REFERENCES Quizzes(quiz_id),
	score INT NOT NULL,
	attempted_at DATE NOT NULL
);

CREATE TABLE Certificates(
	certificate_id INT PRIMARY KEY,
	user_id INT REFERENCES Users(user_id),
	course_id INT REFERENCES Courses(course_id),
	issued_date DATE NOT NULL
);


INSERT INTO Users (user_id, name, email)
VALUES
(1, 'Aathil', 'aathil@gmail.com'),
(2, 'Dhoni', 'dhoni@gmail.com'),
(3, 'Kohli', 'kohli@gmail.com'),
(4, 'Raina', 'raina@gmail.com'),
(5, 'Jadeja', 'jadeja@gmail.com'),
(6, 'Ashwin', 'ashwin@gmail.com');

SELECT * FROM Users;

INSERT INTO Courses (course_id, course_name, description)
VALUES
(1, 'PostgreSQL Mastery', 'Learn PostgreSQL from basics to advanced'),
(2, 'Python Programming', 'Learn Python programming fundamentals'),
(3, 'JavaScript Essentials', 'Learn modern JavaScript'),
(4, 'React Development', 'Build applications with React'),
(5, 'Node.js Backend', 'Build backend applications with Node.js');

SELECT * FROM Courses;

INSERT INTO Lessons (lesson_id, course_id, lesson_name, lesson_order)
VALUES
(1, 1, 'SQL Basics', 1),
(2, 1, 'SELECT Queries', 2),
(3, 1, 'JOINs', 3),
(4, 1, 'Aggregations', 4),

(5, 2, 'Python Basics', 1),
(6, 2, 'Functions', 2),
(7, 2, 'Lists and Dictionaries', 3),
(8, 2, 'Object-Oriented Python', 4),

(9, 3, 'JavaScript Basics', 1),
(10, 3, 'Functions and Scope', 2),
(11, 3, 'DOM Manipulation', 3),
(12, 3, 'Async JavaScript', 4),

(13, 4, 'React Basics', 1),
(14, 4, 'Components and Props', 2),
(15, 4, 'State and Events', 3),
(16, 4, 'React Hooks', 4),

(17, 5, 'Node.js Basics', 1),
(18, 5, 'Express/Fastify', 2),
(19, 5, 'REST APIs', 3),
(20, 5, 'Backend Authentication', 4);

SELECT * FROM Lessons
ORDER BY course_id, lesson_order;


INSERT INTO Enrollments (enrollment_id, user_id, course_id, enrolled_at)
VALUES
(1, 1, 1, '2026-07-01'),
(2, 1, 2, '2026-07-05'),
(3, 2, 1, '2026-07-02'),
(4, 2, 3, '2026-07-10'),
(5, 3, 1, '2026-07-03'),
(6, 3, 4, '2026-07-12'),
(7, 4, 2, '2026-07-04'),
(8, 4, 5, '2026-07-15'),
(9, 5, 3, '2026-07-06'),
(10, 5, 4, '2026-07-20'),
(11, 6, 1, '2026-07-08'),
(12, 6, 5, '2026-07-22');


SELECT * FROM Enrollments;

INSERT INTO Lesson_Progress
(progress_id, user_id, lesson_id, completed, completed_at)
VALUES

-- Aathil → PostgreSQL → completed ALL 4
(1, 1, 1, TRUE, '2026-07-05'),
(2, 1, 2, TRUE, '2026-07-06'),
(3, 1, 3, TRUE, '2026-07-07'),
(4, 1, 4, TRUE, '2026-07-08'),

-- Aathil → Python → completed 2
(5, 1, 5, TRUE, '2026-07-10'),
(6, 1, 6, TRUE, '2026-07-11'),

-- Dhoni → PostgreSQL → completed ALL 4
(7, 2, 1, TRUE, '2026-07-06'),
(8, 2, 2, TRUE, '2026-07-07'),
(9, 2, 3, TRUE, '2026-07-08'),
(10, 2, 4, TRUE, '2026-07-09'),

-- Dhoni → JavaScript → completed 1
(11, 2, 9, TRUE, '2026-07-12'),

-- Kohli → PostgreSQL → completed 3
(12, 3, 1, TRUE, '2026-07-07'),
(13, 3, 2, TRUE, '2026-07-08'),
(14, 3, 3, TRUE, '2026-07-09'),

-- Kohli → React → completed ALL 4
(15, 3, 13, TRUE, '2026-07-15'),
(16, 3, 14, TRUE, '2026-07-16'),
(17, 3, 15, TRUE, '2026-07-17'),
(18, 3, 16, TRUE, '2026-07-18'),

-- Raina → Python → completed 1
(19, 4, 5, TRUE, '2026-07-08'),

-- Raina → Node.js → completed 2
(20, 4, 17, TRUE, '2026-07-18'),
(21, 4, 18, TRUE, '2026-07-19'),

-- Jadeja → JavaScript → completed ALL 4
(22, 5, 9, TRUE, '2026-07-10'),
(23, 5, 10, TRUE, '2026-07-11'),
(24, 5, 11, TRUE, '2026-07-12'),
(25, 5, 12, TRUE, '2026-07-13'),

-- Jadeja → React → completed 2
(26, 5, 13, TRUE, '2026-07-22'),
(27, 5, 14, TRUE, '2026-07-23'),

-- Ashwin → PostgreSQL → completed ALL 4
(28, 6, 1, TRUE, '2026-07-12'),
(29, 6, 2, TRUE, '2026-07-13'),
(30, 6, 3, TRUE, '2026-07-14'),
(31, 6, 4, TRUE, '2026-07-15'),

-- Ashwin → Node.js → completed 1
(32, 6, 17, TRUE, '2026-07-25');

SELECT * FROM Lesson_Progress
ORDER BY user_id, lesson_id;

INSERT INTO Quizzes (quiz_id, course_id, quiz_name, max_score)
VALUES
(1, 1, 'SQL Basics Quiz', 100),
(2, 1, 'JOINs Quiz', 100),

(3, 2, 'Python Basics Quiz', 100),
(4, 2, 'Functions Quiz', 100),

(5, 3, 'JS Basics Quiz', 100),
(6, 3, 'Async JS Quiz', 100),

(7, 4, 'React Basics Quiz', 100),
(8, 4, 'React Hooks Quiz', 100),

(9, 5, 'Node Basics Quiz', 100),
(10, 5, 'REST API Quiz', 100);


SELECT * FROM Quizzes
ORDER BY course_id, quiz_id;


INSERT INTO Quiz_Results
(result_id, user_id, quiz_id, score, attempted_at)
VALUES

-- Aathil → PostgreSQL → high scores
(1, 1, 1, 85, '2026-07-08'),
(2, 1, 2, 90, '2026-07-09'),

-- Aathil → Python → average
(3, 1, 3, 65, '2026-07-12'),
(4, 1, 4, 70, '2026-07-13'),

-- Dhoni → PostgreSQL → high scores
(5, 2, 1, 80, '2026-07-09'),
(6, 2, 2, 85, '2026-07-10'),

-- Dhoni → JavaScript → low scores
(7, 2, 5, 40, '2026-07-13'),
(8, 2, 6, 45, '2026-07-14'),

-- Kohli → PostgreSQL → high
(9, 3, 1, 90, '2026-07-10'),
(10, 3, 2, 95, '2026-07-11'),

-- Kohli → React → high
(11, 3, 7, 88, '2026-07-18'),
(12, 3, 8, 92, '2026-07-19'),

-- Raina → Python → low
(13, 4, 3, 45, '2026-07-09'),
(14, 4, 4, 50, '2026-07-10'),

-- Raina → Node.js → low
(15, 4, 9, 40, '2026-07-20'),
(16, 4, 10, 45, '2026-07-21'),

-- Jadeja → JavaScript → high
(17, 5, 5, 85, '2026-07-13'),
(18, 5, 6, 90, '2026-07-14'),

-- Jadeja → React → low
(19, 5, 7, 50, '2026-07-24'),
(20, 5, 8, 55, '2026-07-25'),

-- Ashwin → PostgreSQL → high
(21, 6, 1, 95, '2026-07-15'),
(22, 6, 2, 90, '2026-07-16'),

-- Ashwin → Node.js → medium
(23, 6, 9, 60, '2026-07-26'),
(24, 6, 10, 65, '2026-07-27');

SELECT * FROM Quiz_Results
ORDER BY user_id, quiz_id;

INSERT INTO Certificates
(certificate_id, user_id, course_id, issued_date)
VALUES
(1, 1, 1, '2026-07-10'),
(2, 3, 4, '2026-07-20'),
(3, 5, 3, '2026-07-15');

SELECT * FROM Certificates;

-- //complete all the lesson but no certificate
SELECT
    u.name,
    c.course_name
FROM Users u
JOIN Lesson_Progress lp
    ON u.user_id = lp.user_id
JOIN Lessons l
    ON lp.lesson_id = l.lesson_id
JOIN Courses c
    ON l.course_id = c.course_id
LEFT JOIN Certificates cert
    ON u.user_id = cert.user_id
    AND c.course_id = cert.course_id
WHERE lp.completed = TRUE
  AND cert.certificate_id IS NULL
GROUP BY u.name, c.course_name
HAVING COUNT(lp.lesson_id) = 4;



-- //course with average quiz score less than 60

SELECT c.course_name, Round(AVG(qr.score),2) AS average_score
FROM Courses c
JOIN Quizzes q ON c.course_id = q.course_id
JOIN Quiz_Results qr ON q.quiz_id = qr.quiz_id
GROUP BY c.course_name
HAVING AVG(qr.score) < 60;


-- Find users who passed more than 1 courses.

SELECT
    u.name,
    COUNT(DISTINCT q.course_id) AS passed_courses
FROM Users u
JOIN Quiz_Results qr
    ON u.user_id = qr.user_id
JOIN Quizzes q
    ON qr.quiz_id = q.quiz_id
WHERE qr.score >= 60
GROUP BY u.user_id, u.name
HAVING COUNT(DISTINCT q.course_id) > 1;

-- //drop off rate enrolled but completed less than or equal to 2 lesson


SELECT
    u.name,
    c.course_name,
    COUNT(lp.lesson_id) AS lessons_completed
FROM Users u
JOIN Enrollments e
ON u.user_id = e.user_id
JOIN Courses c
ON e.course_id = c.course_id
LEFT JOIN Lessons l
ON c.course_id = l.course_id
LEFT JOIN Lesson_Progress lp
ON u.user_id = lp.user_id
AND l.lesson_id = lp.lesson_id
AND lp.completed = TRUE
GROUP BY u.user_id, u.name, c.course_id, c.course_name
HAVING COUNT(lp.lesson_id) <= 2;



SELECT * FROM Users;
SELECT * FROM Enrollments;
SELECT * FROM Courses;
SELECT * FROM Lessons;
SELECT * FROM lesson_progress;
SELECT * FROM Quizzes;
SELECT * FROM quiz_results;
SELECT * FROM Certificates;