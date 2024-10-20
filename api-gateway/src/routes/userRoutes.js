const express = require('express');
const userService = require('../services/userService');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/register', (req, res) => {
  userService.Register(req.body, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error.details });
    }
    res.json(response);
  });
});

router.post('/login', (req, res) => {
  console.log("login userroutes", req.body)
  userService.Login(req.body, (error, response) => {
    if (error) {
      return res.status(401).json({ error: error.details });
    }
    console.log("login response", response)
    res.json(response);
  });
});

router.get('/profile', authMiddleware, (req, res) => {
  userService.ViewProfile({ userId: req.user.id }, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error.details });
    }
    res.json(response);
  });
});

module.exports = router;
