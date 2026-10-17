const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve index.html on the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// API Routes for Timetable CRUD
app.get('/api/timetable', (req, res) => {
    db.all("SELECT * FROM timetable", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post('/api/timetable', (req, res) => {
    const { course, day, time, room } = req.body;
    const sql = "INSERT INTO timetable (course, day, time, room) VALUES (?, ?, ?, ?)";
    db.run(sql, [course, day, time, room], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, course, day, time, room });
    });
});

app.delete('/api/timetable/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM timetable WHERE id = ?";
    db.run(sql, id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Deleted successfully", changes: this.changes });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});