const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const roomService = require('./src/services/roomService');
require('./src/data/db'); // ensure database & migrations run

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Mount auth routes
app.use(authRoutes);

// Views / HTML routes
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/public/login.html'));
});

app.get('/dashboard', authRoutes.requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'src/public/dashboard.html'));
});

app.get('/api/rooms', authRoutes.requireAuth, (req, res) => {
  try {
    const rooms = roomService.getRoomsForDashboard();
    res.json({ success: true, rooms });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/', (req, res) => {
  res.redirect('/login');
});

// Footer / About
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/public/about.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
