import React from 'react';
import 'dotenv/config';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

const StorageView: React.FC = () => {
  /*
  s3 get objectlist 
  object get thumbnail, title or video from youtube api
  design UI 
  set state
  */
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

  // async function downloadFromS3() {
  //   const params: any = {
  //     Bucket: process.env.REACT_APP_AWS_BUCKET,
  //     Key: 'CzF_v-JnfT4.mp3',
  //   };
  //   const file: any = await s3
  //     .getObject(params, (err, data) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log(data);
  //       }
  //     })
  //     .promise();
  //   return {
  //     data: file.Body,
  //     mimetype: file.ContentType,
  //   };
  // }
  function downloadWithBuffers() {
    const myparam: any = {
      Bucket: process.env.REACT_APP_AWS_BUCKET,
      Key: 'CzF_v-JnfT4.mp3',
    };
    s3.getObject(myparam, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  }

  downloadWithBuffers();

  return <h1>storage View</h1>;
};

export default StorageView;
