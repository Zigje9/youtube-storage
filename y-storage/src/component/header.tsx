import React from 'react'
import SearchBar from './headers/searchBar'
import styled from 'styled-components'

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
    </HeaderContainer>
  )
}

export default Header