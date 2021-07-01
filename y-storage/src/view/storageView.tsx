import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'dotenv/config';
import AWS from 'aws-sdk';
import { saveAs } from 'file-saver';

const s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

const getBlobObject = (fileName: string) => {
  // ex) fileName : abcdef~~.mp3
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

const downloadFile = (mp3: any, fileName: string) => {
  saveAs(mp3, fileName);
};

const downloadFlow = async (fileName: string) => {
  const blobObject = await getBlobObject(fileName);
  downloadFile(blobObject, fileName);
};

const File = styled.div`
  width: 200px;
  height: 100px;
  background-color: red;
  margin-top: 10px;
`;

const StorageView: React.FC = () => {
  const [fileList, setFileList] = useState<any>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const numberOfPost = 4;
  const lastIdx = currentPage * numberOfPost;
  const firstIdx = lastIdx - numberOfPost;
  const totalPosts = fileList.length;

  const getCurrentPostList = (fl: []) => fl.slice(firstIdx, lastIdx);

  const pageNumbers = Array.from({ length: Math.ceil(totalPosts / numberOfPost) }, (_, idx) => idx + 1);

  const getFileList = () => {
    return new Promise((resolve, reject) => {
      const params: any = {
        Bucket: process.env.REACT_APP_AWS_BUCKET,
        MaxKeys: 100,
      };
      s3.listObjectsV2(params, (err, data: any) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          data.Contents.sort((a: any, b: any) => {
            const dateA = new Date(a.LastModified).getTime();
            const dateB = new Date(b.LastModified).getTime();
            return dateA > dateB ? -1 : 1;
          });
          setFileList([...data.Contents]);
          resolve('success');
        }
      });
    });
  };

  const getFileFlow = async () => {
    await getFileList();
  };

  useEffect(() => {
    getFileFlow();
    // downloadFlow(fileName);
  }, []);

  return (
    <>
      {getCurrentPostList(fileList).map((e: any) => {
        return (
          <File key={e.Key} onClick={() => downloadFlow(e.Key)}>
            {e.Key}
          </File>
        );
      })}
      {pageNumbers.map((number) => (
        <div key={number}>
          <span
            onClick={() => {
              setCurrentPage(number);
              console.log(number);
            }}
          >
            {number}
          </span>
        </div>
      ))}
    </>
  );
};

export default StorageView;
