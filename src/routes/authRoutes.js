const express = require('express');
const authService = require('../services/authService');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Simple session store mockup for step 2 & 3
const sessions = new Map();

router.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await authService.authenticateUser(username, password);

    const sessionId = Math.random().toString(36).substring(2);
    sessions.set(sessionId, user);
    res.cookie('session_id', sessionId, { httpOnly: true });

    res.json({ success: true, user: { username: user.username, role: user.role } });
  } catch (err) {
    res.status(401).json({ success: false, error: err.message });
  }
});

// Middleware for auth check
function requireAuth(req, res, next) {
  const sessionId = req.headers.cookie?.match(/(?:^|;\s*)session_id=([^;]*)/)?.[1];
  const user = sessionId ? sessions.get(sessionId) : null;
  if (!user) {
    return res.status(401).redirect('/login?error=' + encodeURIComponent('You must be a registered student to book a room.'));
  }
  try {
    authService.checkStudentAccess(user);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ error: err.message });
  }
}

router.sessions = sessions;
router.requireAuth = requireAuth;

module.exports = router;
