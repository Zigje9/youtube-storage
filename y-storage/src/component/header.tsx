import React from 'react'
import styled from 'styled-components'
import SearchBar from './headers/searchBar'
import SearchButton from './headers/searchButton'
import { getAxios } from '../api/axios'

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #235b9f;
  height: 12vh;
`


const Header: React.FC = () => {

  const buttonHandler = async () => {
    console.log("here")
    const data = await getAxios("/search", {
      part: "snippet",
      q: "song",
      maxResults: 5,
    })
    console.log(data)
  }
 
  return (
    <HeaderContainer>
      <SearchBar></SearchBar>
      <SearchButton onClick={buttonHandler}></SearchButton>
    </HeaderContainer>
  )
}

export default Header