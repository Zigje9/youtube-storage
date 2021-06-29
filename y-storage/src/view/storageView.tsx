import React from 'react';
import 'dotenv/config';

import AWS from 'aws-sdk';
const s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

const StorageView: React.FC = () => {
  const params: any = {
    Bucket: process.env.REACT_APP_AWS_BUCKET,
    MaxKeys: 100,
  };
  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
  return <h1>storage View</h1>;
};

export default StorageView;
