const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// 1. GET /api/timetable -> List all records
app.get('/api/timetable', (req, res) => {
    const sql = 'SELECT * FROM timetable';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// 2. GET /api/timetable/:id -> Get one record by ID
app.get('/api/timetable/:id', (req, res) => {
    const sql = 'SELECT * FROM timetable WHERE id = ?';
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Timetable entry not found' });
        }
        res.json(row);
    });
});

// 3. POST /api/timetable -> Create a new record
app.post('/api/timetable', (req, res) => {
    const { course_code, course_name, day_of_week, class_time, weekly_goal } = req.body;
    if (!course_code) {
        return res.status(400).json({ error: 'course_code is required' });
    }

    const sql = `INSERT INTO timetable (course_code, course_name, day_of_week, class_time, weekly_goal) VALUES (?, ?, ?, ?, ?)`;
    const params = [course_code, course_name, day_of_week, class_time, weekly_goal];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            id: this.lastID,
            course_code,
            course_name,
            day_of_week,
            class_time,
            weekly_goal
        });
    });
});

// 4. PUT /api/timetable/:id -> Update a record
app.put('/api/timetable/:id', (req, res) => {
    const { course_code, course_name, day_of_week, class_time, weekly_goal } = req.body;
    const sql = `UPDATE timetable SET course_code = ?, course_name = ?, day_of_week = ?, class_time = ?, weekly_goal = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    const params = [course_code, course_name, day_of_week, class_time, weekly_goal, req.params.id];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Timetable entry not found' });
        }
        res.json({ message: 'Updated successfully', id: req.params.id });
    });
});

// 5. DELETE /api/timetable/:id -> Delete a record
app.delete('/api/timetable/:id', (req, res) => {
    const sql = 'DELETE FROM timetable WHERE id = ?';
    db.run(sql, [req.params.id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Timetable entry not found' });
        }
        res.json({ message: 'Deleted successfully', id: req.params.id });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});