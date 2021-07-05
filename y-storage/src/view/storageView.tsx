import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'dotenv/config';
import AWS from 'aws-sdk';
import { saveAs } from 'file-saver';
import color from '../assets/colors';

interface GetBlobParam {
  Bucket: string;
  Key: string;
}
interface GetFileParam {
  Bucket: string;
  MaxKeys: number;
}

interface ThumbnailProps {
  videoId: string;
}
interface SpanProps {
  nowSelect: boolean;
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
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  height: 17%;
  background-color: red;
  border-radius: 20px;
`;

const Thumbnail = styled.div<ThumbnailProps>`
  height: 80px;
  width: 140px;
  background-image: url(${(props) => 'https://i.ytimg.com/vi/' + props.videoId.slice(0, -4) + '/mqdefault.jpg'});
  background-size: cover;
`;

const PageNumber = styled.span<SpanProps>`
  cursor: pointer;
  font-size: 20px;
  font-weight: ${(props) => (props.nowSelect ? 'bold' : 'lighter')};
  text-decoration: ${(props) => (props.nowSelect ? 'underline' : 'none')};
`;

const PageContainer = styled.div`
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const FileContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  background-color: ${color.gray.lv1};
  align-items: center;
  justify-content: space-evenly;
`;

const StorageHeader = styled.div`
  width: 100%;
  height: 12vh;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    96deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 18%,
    rgba(41, 90, 186, 1) 41%,
    rgba(6, 68, 160, 1) 76%,
    rgba(0, 212, 255, 1) 95%
  );
`;

const StorageView: React.FC = () => {
  const [fileList, setFileList] = useState<any>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const numberOfPost = 4;
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
  // onClick={() => downloadFlow(e.Key)
  return (
    <>
      <StorageHeader></StorageHeader>
      <FileContainer>
        {getCurrentPostList(fileList).map((e: any) => {
          return (
            <File key={e.Key}>
              <Thumbnail videoId={e.Key}></Thumbnail>
              <div>id</div>
              <div>lastmodified</div>
              <div>download</div>
            </File>
          );
        })}
      </FileContainer>
      <PageContainer>
        {setCenterPage(totalPageNumbers, currentPage).map((number: number) => (
          <div key={number}>
            <PageNumber
              onClick={() => {
                setCurrentPage(number);
              }}
              nowSelect={number - currentPage === 0 ? true : false}
            >
              {number}
            </PageNumber>
          </div>
        ))}
      </PageContainer>
    </>
  );
};

export default StorageView;
