const express = require('express');
const router = express.Router();

router.get('/index', (req, res, next) => {
  console.log('index Router');
  res.status(200).json({ h: 'i' });
});

module.exports = router;
