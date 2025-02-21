const express = require('express');
const fs = require('fs').promises;  // Use fs.promises for async/await
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5173;
const DATA_FILE = path.join(__dirname, 'visitors.json');

// Serve the static HTML page
app.use(express.static('public'));

// Middleware to log visits
app.use(async (req, res, next) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        let visits = [];
        if (data) {
            try {
                visits = JSON.parse(data);
            } catch (e) {
                visits = [];
            }
        }

        const visitor = {
            id: uuidv4(),
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        referrer: req.headers['referer'] || 'direct',
        time: new Date().toISOString()
        };

        visits.push(visitor);
        await fs.writeFile(DATA_FILE, JSON.stringify(visits, null, 2));
        next();  // Proceed to the next middleware after the file is updated
    } catch (err) {
        console.error('Error logging visit:', err);
        next();  // Proceed even if there’s an error
    }
});

// API to get visitor data
app.get('/visitors', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        res.json(data ? JSON.parse(data) : []);
    } catch (err) {
        console.error('Error reading visitors data:', err);
        res.json([]);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
