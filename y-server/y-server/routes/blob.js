const express = require('express');
const router = express.Router();
const getBlobObject = require('../service/getBlob');

router.post('/blob', async (req, res, next) => {
  const { fileName } = req.body;
  try {
    const data = await getBlobObject(fileName);
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: '요청 실패' });
  }
});

module.exports = router;
