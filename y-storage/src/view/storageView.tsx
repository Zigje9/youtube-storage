import React from 'react';
import 'dotenv/config';
import AWS from 'aws-sdk';
import { saveAs } from 'file-saver';

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

  const getBlobObject = (fileName) => {
    return new Promise((resolve, reject) => {
      const params: any = {
        Bucket: process.env.REACT_APP_AWS_BUCKET,
        Key: fileName,
      };
      s3.getObject(params, (err, data: any) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const blob = new Blob([new Uint8Array(data.Body)], { type: 'audio/mpeg' });
          resolve(blob);
        }
      });
    });
  };

  const downloadFile = (mp3: any, fileName) => {
    saveAs(mp3, fileName);
    console.log(mp3);
  };

  const down = async (fileName) => {
    const blobObject = await getBlobObject(fileName);
    downloadFile(blobObject, fileName);
  };

  down(fileName);

  return (
    <>
      <h1>storage View</h1>
    </>
  );
};

export default StorageView;
