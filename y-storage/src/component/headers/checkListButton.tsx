import React from 'react'
import styled from 'styled-components'
import { MusicNoteList } from '@styled-icons/bootstrap/MusicNoteList'
import color from '../../assets/colors'

const ListButton = styled.button`
  background-color: inherit;
  border: none;
`

const ListIcon = styled(MusicNoteList)`
  width: 30px;
  color: ${color.white.lv1};
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`

const CheckListButton: React.FC = () => {
  return (
    <ListButton>
      <ListIcon></ListIcon>
    </ListButton>
  )
}

export default CheckListButton