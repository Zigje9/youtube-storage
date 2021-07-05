require('dotenv').config();
const s3 = require('../utils/s3');

const getFile = () => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: `${process.env.AWS_BUCKET}`,
      MaxKeys: 300,
    };
    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = getFile;
