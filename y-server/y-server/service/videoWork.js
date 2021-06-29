const fs = require('fs');
const youtubedl = require('youtube-dl');

require('dotenv').config();

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const videoDownload = (videoId) => {
  return new Promise((resolve, reject) => {
    try {
      youtubedl.exec(
        `http://www.youtube.com/watch?v=${videoId}`,
        ['-o', `${videoId}.mp3`, '-x', '--audio-format', 'mp3'],
        { cwd: __dirname },
        function (err, output) {
          if (err) throw err;
          console.log(output.join('\n'));
          resolve('success');
        }
      );
    } catch (error) {
      reject('fail');
    }
  });
};

const videoUpload = (videoId) => {
  return new Promise((resolve, reject) => {
    try {
      s3.upload(
        {
          Bucket: 'y-storage',
          Key: `${videoId}.mp3`,
          ACL: 'public-read-write',
          Body: fs.createReadStream(`./service/${videoId}.mp3`),
          ContentType: 'audio/mpeg',
        },
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
            resolve('success');
          }
        }
      );
    } catch (error) {
      console.log(error);
      reject('fail');
    }
  });
};

const videoDelete = (videoId) => {
  fs.unlink(`./service/${videoId}.mp3`, (err) => {
    if (err) throw err;
    console.log('deleted');
  });
};

const videoWork = async (videoId) => {
  await videoDownload(videoId);
  await videoUpload(videoId);
  videoDelete(videoId);
};

module.exports = videoWork;
