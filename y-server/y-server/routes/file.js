const express = require('express');
const router = express.Router();
const videoWork = require('../service/videoWork');

router.post('/file', (req, res, next) => {
  const selectList = req.body;
  if (selectList) {
    Object.entries(selectList).forEach(([videoId, videoTitle]) => {
      videoWork(videoId);
    });
    res.status(200).json({ message: '다운로드 성공' });
  } else {
    res.status(400).json({ message: '잘못된 데이터 형식' });
  }
});

module.exports = router;
