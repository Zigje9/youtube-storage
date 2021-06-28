const express = require('express');
const router = express.Router();
require('dotenv').config();

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

router.post('/file', (req, res, next) => {
  const fs = require('fs');
  const youtubedl = require('youtube-dl');
  const options = ['--extract-audio', '--audio-format', 'mp3'];
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
    // console.log(info);
    console.log('Download started');
    console.log('filename: ' + info._filename);
    console.log('size: ' + info.size);
  });
  const temp = () => {
    video.pipe(fs.createWriteStream('samplevideo.mp3'));
    return new Promise((resolve, rejects) => {
      const params = {
        Bucket: 'y-storage',
        Key: '세번째.mp3',
        ACL: 'public-read-write',
        Body: fs.createReadStream('./samplevideo.mp3'),
        ContentType: 'audio/mpeg',
      };

      s3.upload(params, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
          // return new Promise((resolve, rejects) => {
          //   fs.unlink('./myvideo.mp3', () => {
          //     console.log('deleted ~~~~~~~~');
          //   });
          // });
        }
      });
    });
  };
  temp();
  // fs.unlink('./myvideo.mp3', () => {});
  // video.pipe(fs.createWriteStream('myvideo.mp3')).then(() => {
  //   const params = {
  //     Bucket: 'y-storage',
  //     Key: 'tempvideo.mp3',
  //     ACL: 'public-read-write',
  //     Body: fs.createReadStream('./myvideo.mp3'),
  //     ContentType: 'audio/mpeg',
  //   };

  //   s3.upload(params, () => {});
  // });

  // const params = {
  //   Bucket: 'y-storage',
  //   Key: 'tempvideo.mp3',
  //   ACL: 'public-read-write',
  //   // Body: fs.createReadStream('./routes/test.txt'),
  //   Body: video.pipe(createWriteStream('myvideo.mp3')),
  //   ContentType: 'audio/mpeg',
  // };

  // s3.upload(params, () => {});
  // s3.getObject(params, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(data);
  //   }
  // });

  const { selectList } = req.body;
  if (selectList) {
    res.status(200).json({ h: 'i' });
  } else {
    res.status(400).json({ message: '잘못된 데이터 형식' });
  }
});

module.exports = router;
