const express = require('express');
const router = express.Router();

router.post('/file', (req, res, next) => {
  console.log(req);
  res.status(200).json({ h: 'i' });
});

module.exports = router;
