require('dotenv').config();
const s3 = require('../utils/s3');

const getBlobObject = (fileName) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: `${process.env.AWS_BUCKET}`,
      Key: fileName,
    };
    s3.getObject(params, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(data.Body);
      }
    });
  });
};

module.exports = getBlobObject;
