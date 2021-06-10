import React from 'react'
import styled from 'styled-components'
import SearchBar from './headers/searchBar'
import SearchButton from './headers/searchButton'

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #235b9f;
  height: 12vh;
`


const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <SearchBar></SearchBar>
      <SearchButton></SearchButton>
    </HeaderContainer>
  )
}

export default Header