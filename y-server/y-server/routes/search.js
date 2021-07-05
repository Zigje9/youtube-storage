const express = require('express');
const router = express.Router();
require('dotenv').config();
const getAxios = require('../service/axios');

router.post('/search', async (req, res, next) => {
  const { q, pageToken } = req.body;
  console.log(req.body);
  console.log(q);
  console.log(pageToken);
  try {
    const data = await getAxios('/search', {
      key: process.env.YOUTUBE_API_KEY,
      part: 'snippet',
      q: q,
      maxResults: 10,
      pageToken: pageToken,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: '요청 실패' });
  }
});

module.exports = router;
