import React from 'react'
import styled from 'styled-components'
import { SearchAlt } from '@styled-icons/boxicons-regular/SearchAlt'

const IconButton = styled.button`
  background-color: #235b9f;
  border: none;
`

const Icon = styled(SearchAlt)`
  width: 30px;
  color: white;
  &:hover {
    transform: scale(1.2);
    cursor: pointer
  }
`

const SearchButton: React.FC = () => {
  return (
    <IconButton>
      <Icon></Icon>
    </IconButton>
  )
}

export default SearchButton