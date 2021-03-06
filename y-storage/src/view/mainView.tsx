import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../component/header';
import CheckBox from '../component/common/checkBox';
import CheckIcon from '../component/common/checkIcon';
import color from '../assets/colors';
import * as animation from '../assets/animation';
interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

interface SelectVideo {
  [key: string]: [string, string];
}

interface ThumbnailProps {
  thumbnail: string;
}

const YoutubeVideo = styled.iframe`
  position: fixed;
  width: 520px;
  height: 360px;
  margin: 0 auto;
  top: 100px;
  left: 0;
  right: 0;
  z-index: 100;
`;

const ModalContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  margin: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
`;

const YoutubeThumbnail = styled.div<ThumbnailProps>`
  height: 160px;
  width: 280px;
  background-image: url(${(props) => props.thumbnail});
  background-size: cover;
  &:hover {
    transform: scale(1.1);
    animation: ${animation.fade} 0.5s;
    cursor: pointer;
  }
`;

const VideoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${color.white.lv1};
  padding: 10px;
  width: 100%;
  height: 100%;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2vw;
  background-color: ${color.gray.lv1};
  padding: 10px;
`;

const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CartContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin-top: 1vh;
`;

const Title = styled.div`
  width: 200px;
  padding: 20px;
  font-size: 12px;
  color: ${color.blue.lv6};
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MainView: React.FC = () => {
  const [videoList, setVideoList] = useState<Video[]>([]);
  const [selectList, setSelectList] = useState<SelectVideo>({});
  const [modalId, setModalId] = useState('');

  const videoListHandler = (vl: Video[]) => {
    setVideoList(vl);
  };

  const selectListHandler = (videoId: string, videoTitle: string, videoThumbnail: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectList((prevState: SelectVideo) => ({ ...prevState, ...{ [videoId]: [videoTitle, videoThumbnail] } }));
    } else if (!isChecked && selectList.hasOwnProperty(videoId)) {
      setSelectList((prevState: SelectVideo) => {
        const newData = { ...prevState };
        delete newData[videoId];
        return newData;
      });
    }
  };

  const modalHandler = (vid: string) => {
    modalId ? setModalId('') : setModalId(vid);
  };

  const handleClickOutside = () => {
    if (modalId) {
      setModalId('');
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  });

  return (
    <>
      <Header getVl={videoListHandler} cartList={selectList}></Header>
      <GridContainer>
        {videoList &&
          videoList.map((video, idx) => {
            const videoLink = `https://www.youtube.com/embed/${video.id}?rel=0&enablejsapi=1`;
            return (
              <VideoBox key={`${video.id}_${idx}`}>
                <YoutubeThumbnail thumbnail={video.thumbnail} onClick={() => modalHandler(video.id)}></YoutubeThumbnail>
                {modalId && modalId === video.id && (
                  <ModalContainer>
                    <YoutubeVideo src={videoLink}></YoutubeVideo>
                  </ModalContainer>
                )}
                <CheckBoxContainer>
                  <Title>{video.title}</Title>
                  <CartContainer>
                    <CheckIcon></CheckIcon>
                    <CheckBox
                      selectFunction={selectListHandler}
                      videoId={video.id}
                      videoTitle={video.title}
                      videoThumbnail={video.thumbnail}
                    ></CheckBox>
                  </CartContainer>
                </CheckBoxContainer>
              </VideoBox>
            );
          })}
      </GridContainer>
    </>
  );
};

export default MainView;
