CREATE TABLE IF NOT EXISTS timetable (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_code VARCHAR(20) NOT NULL,
    course_name VARCHAR(150),
    day_of_week VARCHAR(20),
    class_time VARCHAR(50),
    weekly_goal TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO timetable (course_code, course_name, day_of_week, class_time, weekly_goal) VALUES
('ICT 221', 'Computer Architecture', 'Monday', '08:00 - 10:00', 'Review 8-bit registers and binary addition'),
('ICT 241', 'Digital Design', 'Monday', '10:30 - 12:30', 'Practice logic gates and truth tables'),
('ICT 251', 'Web Technologies', 'Tuesday', '09:00 - 11:00', 'Build Single-Table CRUD API with Node.js'),
('ICT 261', 'Programming', 'Tuesday', '14:00 - 16:00', 'Complete Python data structures assignment'),
('ICT 281', 'Statistics', 'Wednesday', '08:00 - 10:00', 'Calculate sample covariance and correlation'),
('ICT 221', 'Computer Architecture', 'Wednesday', '11:00 - 13:00', 'Study cache memory mapping'),
('ICT 241', 'Digital Design', 'Thursday', '10:00 - 12:00', 'Design combinational circuits'),
('ICT 251', 'Web Technologies', 'Thursday', '14:00 - 16:00', 'Test REST API endpoints in Postman'),
('ICT 261', 'Programming', 'Friday', '08:30 - 10:30', 'Debug Python script loops and functions'),
('ICT 281', 'Statistics', 'Friday', '11:00 - 12:00', 'Review probability distribution notes');