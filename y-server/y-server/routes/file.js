const express = require('express');
const router = express.Router();

router.post('/file', (req, res, next) => {
  const fs = require('fs');
  const youtubedl = require('youtube-dl');
  const options = ['--format=18'];
  // const options = ['--audio-format FORMAT mp3'];
  const video = youtubedl(
    'http://www.youtube.com/watch?v=90AiXO1pAiA',
    // Optional arguments passed to youtube-dl.
    options,
    // Additional options can be given for calling `child_process.execFile()`.
    { cwd: __dirname }
  );

  // Will be called when the download starts.
  video.on('info', function (info) {
    console.log(info);
    console.log('Download started');
    console.log('filename: ' + info._filename);
    console.log('size: ' + info.size);
  });

  video.pipe(fs.createWriteStream('myvideo.mp4'));
  const { selectList } = req.body;
  if (selectList) {
    res.status(200).json({ h: 'i' });
  } else {
    res.status(400).json({ message: '잘못된 데이터 형식' });
  }
});

module.exports = router;
