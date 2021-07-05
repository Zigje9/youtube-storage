import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'dotenv/config';
import AWS from 'aws-sdk';
import { saveAs } from 'file-saver';
import color from '../assets/colors';
import changeURL from '../utils/changeURL';
import changeSize from '../utils/changeSize';
import timer from '../utils/timer';
import { FolderMusic } from '@styled-icons/entypo/FolderMusic';
import { TagQuestionMark } from '@styled-icons/fluentui-system-filled/TagQuestionMark';
import { Time } from '@styled-icons/boxicons-solid/Time';
import * as animation from '../assets/animation';
import StorageHeader from '../component/sotrageHeader';
import { fileInfoAlert, timeInfoAlert } from '../utils/infoAlert';

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
  if (confirm('로컬로 다운로드를 시작하겠습니까?')) {
    try {
      const blobObject = await getBlobObject(fileName);
      downloadFile(blobObject, fileName);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('취소');
  }
};

const File = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  height: 17%;
  border-radius: 20px;
  background-color: ${color.white.lv1};
`;

const Box = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const Thumbnail = styled.div<ThumbnailProps>`
  height: 80px;
  width: 140px;
  background-image: url(${(props) => changeURL(props.videoId)});
  background-size: cover;
`;

const FileInfoIcon = styled(TagQuestionMark)`
  width: 30px;
  color: ${color.blue.lv3};
  cursor: pointer;
  &:hover {
    animation: ${animation.fill} 0.7s ease-out infinite;
  }
`;

const TimeInfoIcon = styled(Time)`
  width: 30px;
  color: ${color.blue.lv3};
  cursor: pointer;
  &:hover {
    animation: ${animation.fill} 0.7s ease-out infinite;
  }
`;

const DownLoadIcon = styled(FolderMusic)`
  width: 30px;
  color: ${color.blue.lv3};
  cursor: pointer;
  &:hover {
    animation: ${animation.fill} 0.7s ease-out infinite;
  }
`;

const PageNumber = styled.span<SpanProps>`
  cursor: pointer;
  font-size: 25px;
  color: ${(props) => (props.nowSelect ? `${color.white.lv1}` : `${color.gray.lv2}`)};
  font-weight: ${(props) => (props.nowSelect ? 'bold' : 'lighter')};
  text-decoration: ${(props) => (props.nowSelect ? 'underline' : 'none')};
`;

const PageBox = styled.div`
  width: 30px;
  height: 30px;
  text-align: center;
  font-family: math;
`;

const PageContainer = styled.div`
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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

const FileContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  background-color: ${color.gray.lv1};
  align-items: center;
  justify-content: space-evenly;
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

  const setCenterPage = (arr: any, centerIdx: number) => {
    const total = totalPageNumbers.length;
    if (total <= 5) {
      return arr;
    }
    if (centerIdx <= 3) {
      return arr.slice(0, 5);
    }

    if (centerIdx > total - 2) {
      return arr.slice(total - 4);
    }

    return arr.slice(centerIdx - 3, centerIdx + 2);
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
      <StorageHeader numOfFile={fileList.length} lastModified={fileList[0]}></StorageHeader>
      <FileContainer>
        {getCurrentPostList(fileList).map((e: any) => {
          return (
            <File key={e.Key}>
              <Thumbnail videoId={e.Key}></Thumbnail>
              <Box>
                <FileInfoIcon onClick={() => fileInfoAlert(e.Key, e.Size)}></FileInfoIcon>
                <div>{changeSize(e.Size)}</div>
              </Box>
              <Box>
                <TimeInfoIcon onClick={() => timeInfoAlert(e.LastModified)}></TimeInfoIcon>
                <div>{timer(e.LastModified)}</div>
              </Box>
              <Box>
                <DownLoadIcon onClick={() => downloadFlow(e.Key)}></DownLoadIcon>
                <div>다운로드</div>
              </Box>
            </File>
          );
        })}
      </FileContainer>
      <PageContainer>
        {setCenterPage(totalPageNumbers, currentPage).map((number: number) => (
          <PageBox key={number}>
            <PageNumber
              onClick={() => {
                setCurrentPage(number);
              }}
              nowSelect={number - currentPage === 0 ? true : false}
            >
              {number}
            </PageNumber>
          </PageBox>
        ))}
      </PageContainer>
    </>
  );
};

export default StorageView;
