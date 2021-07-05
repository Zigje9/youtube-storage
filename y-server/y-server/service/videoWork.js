const fs = require('fs');
const youtubedl = require('youtube-dl');
const s3 = require('../utils/s3');

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
