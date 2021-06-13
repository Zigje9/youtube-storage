import React from 'react'
import styled from 'styled-components'
import color from '../../assets/colors'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
}

const SearchInput = styled.input`
  background-color: ${color.white.lv1};
  color: ${color.blue.lv7};
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  border: none;
  border-radius: 15px;
  ::placeholder {
    color: ${color.blue.lv1}
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