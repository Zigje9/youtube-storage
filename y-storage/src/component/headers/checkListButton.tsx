import React, { useState } from 'react'
import styled from 'styled-components'
import { MusicNoteList } from '@styled-icons/bootstrap/MusicNoteList'
import color from '../../assets/colors'

interface Props {
  cartList: Set<unknown> | any
}
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
  background-color: ${color.white.lv1};
  min-width: 180px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.7);
  z-index: 1;
  border-radius: 20px;
`

const DropDownContent = styled.div`
  color: ${color.blue.lv4};
  padding: 12px 16px;
  text-decoration: none;
  display: block;
`

const CheckListButton: React.FC<Props> = ({...props}: Props) => {
  const [isHover, setIsHover] = useState(false)
  const cartList = [...props.cartList]

  return (
    <ListButton>
      <ListIcon onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)}></ListIcon>
      <DropDownBox isHover={isHover}>
        {cartList && cartList.map((videoId) => {
          return <DropDownContent key={videoId}>{videoId}</DropDownContent>
          })
        }
      </DropDownBox>
    </ListButton>
  )
}

export default CheckListButton