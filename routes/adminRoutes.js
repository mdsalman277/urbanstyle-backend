const express = require('express');
const { verifyJWT, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

// Protected admin route
router.get('/dashboard', verifyJWT, isAdmin, (req, res) => {
  res.json({ message: 'Admin dashboard', user: req.user });
});

module.exports = router;