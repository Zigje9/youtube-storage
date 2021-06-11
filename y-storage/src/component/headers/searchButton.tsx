import React from 'react'
import styled from 'styled-components'
import { SearchAlt } from '@styled-icons/boxicons-regular/SearchAlt'

interface Props {
  onClick: () => void
}

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

const SearchButton: React.FC<Props> = ({...props}: Props) => {
  const buttonHandler = props.onClick
  return (
    <IconButton onClick={() => buttonHandler()}>
      <Icon></Icon>
    </IconButton>
  )
}

export default SearchButton