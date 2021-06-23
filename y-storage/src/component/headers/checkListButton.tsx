import React, { useState } from 'react'
import styled from 'styled-components'
import { MusicNoteList } from '@styled-icons/bootstrap/MusicNoteList'
import color from '../../assets/colors'

interface HoverProps {
  isHover: boolean;
}

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

const DropDownBox = styled.div<HoverProps>`
  display: ${(props) => props.isHover ? "block" : "none"};
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
`

const DropDownContent = styled.div`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
`

const CheckListButton: React.FC = () => {
  const [isHover, setIsHover] = useState(false)

  return (
    <ListButton>
      <ListIcon onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)}></ListIcon>
      <DropDownBox isHover={isHover}>
        <DropDownContent>abc</DropDownContent>
      </DropDownBox>
    </ListButton>
  )
}

export default CheckListButton