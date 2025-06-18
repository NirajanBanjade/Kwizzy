INSERT INTO users(name,email,password_hash)
VALUES ('NIRAJAN','nirajanbanjade123@gmail.com','NIRAJAN');

INSERT INTO quizzes(user_id,title)
VALUES(1,'PYTHON');

INSERT INTO questions (quiz_id, question_text, choices, correct_answer)
VALUES 
(1, 'Which tag is used for headings in HTML?', ARRAY['<p>', '<div>', '<h1>', '<span>'], '<h1>'),
(1, 'Which language is used for styling web pages?', ARRAY['HTML', 'CSS', 'JavaScript', 'C++'], 'CSS');

INSERT INTO quiz_attempts (user_id, quiz_id, score)
VALUES (1, 1, 2);