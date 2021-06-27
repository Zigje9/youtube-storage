const express = require('express');
const router = express.Router();

router.post('/file', (req, res, next) => {
  const { selectList } = req.body;
  if (selectList) {
    res.status(200).json({ h: 'i' });
  } else {
    res.status(400).json({ message: '잘못된 데이터 형식' });
  }
});

module.exports = router;
