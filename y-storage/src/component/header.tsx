import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from './headers/searchBar';
import SearchButton from './headers/searchButton';
import DownloadButton from './headers/downloadButton';
import CheckListButton from './headers/checkListButton';
import DiskButton from './headers/diskButton';
import Logo from './headers/logo';
import { getAxios } from '../api/axios';
import throttle from '../utils/throttle';
import * as animation from '../assets/animation';
import color from '../assets/colors';
interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

interface SelectVideo {
  [key: string]: string;
}

interface Props {
  getVl: (vl: Video[]) => void;
  cartList: SelectVideo;
}

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 5% 10% 15% 25% 5% 25% 5% 5%;
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
  height: 12vh;
`;
const DIV = styled.div`
  width: 100%;
`;

const SpinnerContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  margin: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.2);
`;

const Spinner = styled.div`
  animation: ${animation.spin} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid ${color.white.lv1};
  border-right: 3px solid ${color.white.lv1};
  border-bottom: 5px solid ${color.blue.lv4};
  border-left: 5px solid ${color.blue.lv5};
  background: transparent;
  border-radius: 70%;
  position: fixed;
  width: 70px;
  height: 70px;
  left: 0;
  right: 0;
  margin: 20% auto;
`;

const Header: React.FC<Props> = ({ ...props }: Props) => {
  const [prevKeyword, setPrevKeyword] = useState('');
  const [keyword, setKeyword] = useState('');
  const [nextToken, setNextToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState<Video[]>([]);
  const videoListHandler = props.getVl;

  const buttonHandler = async () => {
    setLoading(true);
    let newItem = item;
    if (prevKeyword !== keyword) {
      setNextToken('');
      newItem = [];
    }
    setPrevKeyword(keyword);
    try {
      const res: any = await getAxios('/search', {
        part: 'snippet',
        q: keyword,
        maxResults: 10,
        pageToken: nextToken,
      });
      if (res.data.nextPageToken) {
        setNextToken(res.data.nextPageToken);
      }
      const vl = res.data.items.map((el: any) => {
        const infos: { id: string; title: string; thumbnail: string } = {
          id: el.id.videoId,
          title: el.snippet.title,
          thumbnail: el.snippet.thumbnails.medium.url,
        };
        return infos;
      });
      setItem([...newItem, ...vl]);
      videoListHandler([...newItem, ...vl]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const checkScroll = () => {
    const {
      documentElement: { scrollTop, clientHeight, scrollHeight },
    } = document;
    if (scrollTop + clientHeight > scrollHeight - 200 && keyword !== '') {
      buttonHandler();
    }
  };

  const throttling = throttle(checkScroll, 500);

  const keywordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    window.addEventListener('scroll', throttling._clojureThrottle, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttling._clojureThrottle);
    };
  });

  return (
    <HeaderContainer>
      <DIV></DIV>
      <Logo></Logo>
      <DiskButton></DiskButton>
      <SearchBar onClick={buttonHandler} onChange={keywordHandler}></SearchBar>
      <SearchButton onClick={buttonHandler}></SearchButton>
      <DIV></DIV>
      <CheckListButton cartList={props.cartList}></CheckListButton>
      <DownloadButton cartList={props.cartList}></DownloadButton>
      {loading && (
        <SpinnerContainer>
          <Spinner></Spinner>
        </SpinnerContainer>
      )}
    </HeaderContainer>
  );
};

export default Header;
