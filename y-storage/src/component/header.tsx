import React, { useState } from 'react'
import styled from 'styled-components'
import SearchBar from './headers/searchBar'
import SearchButton from './headers/searchButton'
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
  background-color: #235b9f;
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
        maxResults: 5,
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
      <SearchBar onChange={keywordHandler}></SearchBar>
      <SearchButton onClick={buttonHandler}></SearchButton>
    </HeaderContainer>
  )
}

export default Header