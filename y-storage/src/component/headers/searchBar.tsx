import React from 'react'
import styled from 'styled-components'

const SearchInput = styled.input`
  background-color: white;
  color: #092642;
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  border: none;
  border-radius: 15px;
  ::placeholder {
    color: #aed9ff
  }
  &:focus {
    outline: none
  }
`

const SearchBar: React.FC = () => {
  return (
    <>
      <SearchInput placeholder="Search Keyword..."></SearchInput>
    </>
  )
}

export default SearchBar