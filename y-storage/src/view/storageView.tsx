import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'dotenv/config';
import AWS from 'aws-sdk';
import { saveAs } from 'file-saver';

interface GetBlobParam {
  Bucket: string;
  Key: string;
}
interface GetFileParam {
  Bucket: string;
  MaxKeys: number;
}

const s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

const getBlobObject = (fileName: string) => {
  return new Promise((resolve, reject) => {
    const params: GetBlobParam = {
      Bucket: `${process.env.REACT_APP_AWS_BUCKET}`,
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

const PageContainer = styled.div`
  width: 300px;
  background-color: yellow;
  display: flex;
  justify-content: space-evenly;
`;

const StorageView: React.FC = () => {
  const [fileList, setFileList] = useState<any>([]);

  const [currentPage, setCurrentPage] = useState(4);
  const numberOfPost = 1;
  const lastIdx = currentPage * numberOfPost;
  const firstIdx = lastIdx - numberOfPost;
  const totalPosts = fileList.length;

  const getCurrentPostList = (fl: []) => fl.slice(firstIdx, lastIdx);

  const totalPageNumbers = Array.from({ length: Math.ceil(totalPosts / numberOfPost) }, (_, idx) => idx + 1);

  const setCenterPage = (arr: any, centerIdx: any) => {
    const left = centerIdx - 3;
    if (left < 0) {
      return arr.slice(0, 5);
    }
    const right = centerIdx + 2;
    if (right > totalPageNumbers.length) {
      return arr.slice(totalPageNumbers.length - 5, totalPageNumbers.length);
    }
    return arr.slice(left, right);
  };

  const getFileList = () => {
    return new Promise((resolve, reject) => {
      const params: GetFileParam = {
        Bucket: `${process.env.REACT_APP_AWS_BUCKET}`,
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
      <PageContainer>
        {setCenterPage(totalPageNumbers, currentPage).map((number: any) => (
          <div key={number}>
            <span
              onClick={() => {
                setCurrentPage(number);
              }}
            >
              {number}
            </span>
          </div>
        ))}
      </PageContainer>
    </>
  );
};

export default StorageView;
