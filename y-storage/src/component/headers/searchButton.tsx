import React from 'react'
import styled from 'styled-components'
import { SearchAlt } from '@styled-icons/boxicons-regular/SearchAlt'
import color from '../../assets/colors'
interface Props {
  onClick: () => void
}

const IconButton = styled.button`
  background-color: ${color.blue.lv5};
  border: none;
`

const Icon = styled(SearchAlt)`
  width: 30px;
  color: ${color.white.lv1};
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