import React from 'react'
import styled from 'styled-components'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
}

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

const SearchBar: React.FC<Props> = ({...props}: Props) => {
  const keywordHandler = props.onChange
  const buttonHandler = props.onClick

  const EnterHandler = (e: React.KeyboardEvent) => {
    if(e.key === 'Enter'){
      buttonHandler()
    }
  }

  return (
    <>
      <SearchInput onKeyPress={(e) => EnterHandler(e)} onChange={(e) => keywordHandler(e)} placeholder="Search Keyword..."></SearchInput>
    </>
  )
}

export default SearchBar