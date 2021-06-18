import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import SearchBar from './headers/searchBar'
import SearchButton from './headers/searchButton'
import DownloadButton from './headers/downloadButton'
import CheckListButton from './headers/checkListButton'
import Logo from './headers/logo'
import { getAxios } from '../api/axios'
interface Video {
  id: string;
  title: string;
}
interface Props {
  getVl: (vl: Video[]) => void
  refresh: () => void
}

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 5% 20% 25% 5% 25% 5% 5%;
  align-items: center;
  background: rgb(2,0,36);
  background: linear-gradient(96deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 18%, rgba(41,90,186,1) 41%, rgba(6,68,160,1) 76%, rgba(0,212,255,1) 95%);
  height: 12vh;
`
const DIV = styled.div`
  width:100%;
`

const Header: React.FC<Props> = ({...props}: Props) => {
  const [prevKeyword, setPrevKeyword] = useState("")
  const [keyword, setKeyword] = useState("")
  const [nextToken, setNextToken] = useState("")
  const [item, setItem] = useState<Video[]>([])
  const videoListHandler = props.getVl
  const resetHandler = props.refresh

  const buttonHandler = async () => {
    if (prevKeyword !== keyword) {
      resetHandler()
      setNextToken("")
      setItem([])
    }
    setPrevKeyword(keyword)
    try {
      const res: any = await getAxios("/search", {
        part: "snippet",
        q: keyword,
        maxResults: 10,
        pageToken: nextToken,
      })
      if(res.data.nextPageToken) {
        setNextToken(res.data.nextPageToken)
      }
      const vl = res.data.items.map((el: any) => {
        const infos: {id: string, title: string} = {
          id: el.id.videoId,
          title: el.snippet.title
        }
        return infos
      })
      setItem([...item, ...vl])
      videoListHandler(item)
    } catch (error) {
      console.log(error)
    }
  }

  const checkScroll = () => {
    const {
      documentElement: { scrollTop, clientHeight, scrollHeight },
    } = document;
    if (scrollTop + clientHeight === scrollHeight && keyword !== "") {
      buttonHandler()
    }
  }

  const keywordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  useEffect(() => {
    window.addEventListener('scroll', checkScroll, {passive: true});
    return () => {
      window.removeEventListener('scroll', checkScroll)
    }
  })
 
  return (
    <HeaderContainer>
      <DIV></DIV>
      <Logo></Logo>
      <SearchBar onClick={buttonHandler} onChange={keywordHandler}></SearchBar>
      <SearchButton onClick={buttonHandler}></SearchButton>
      <DIV></DIV>
      <CheckListButton></CheckListButton>
      <DownloadButton></DownloadButton>
    </HeaderContainer>
  )
}

export default Header