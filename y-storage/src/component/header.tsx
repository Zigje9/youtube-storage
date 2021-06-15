import React, { useState } from 'react'
import styled from 'styled-components'
import SearchBar from './headers/searchBar'
import SearchButton from './headers/searchButton'
import Logo from './headers/logo'
import { getAxios } from '../api/axios'
interface Video {
  id: string;
  title: string;
}
interface Props {
  getVl: (vl: Video[]) => void
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: rgb(2,0,36);
  background: linear-gradient(96deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 18%, rgba(41,90,186,1) 41%, rgba(6,68,160,1) 76%, rgba(0,212,255,1) 95%);
  height: 12vh;
`

const Header: React.FC<Props> = ({...props}: Props) => {
  const [keyword, setKeyword] = useState("")
  const videoListHandler = props.getVl

  const buttonHandler = async () => {
    try {
      const res: any  = await getAxios("/search", {
        part: "snippet",
        q: keyword,
        maxResults: 10,
      })
      const vl = res.data.items.map((el: any) => {
        const infos: {id: string, title: string} = {
          id: el.id.videoId,
          title: el.snippet.title
        }
        return infos
      })
      videoListHandler(vl)
    } catch (error) {
      console.log(error)
    }
  }

  const keywordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }
 
  return (
    <HeaderContainer>
      <Logo></Logo>
      <SearchBar onClick={buttonHandler} onChange={keywordHandler}></SearchBar>
      <SearchButton onClick={buttonHandler}></SearchButton>
    </HeaderContainer>
  )
}

export default Header