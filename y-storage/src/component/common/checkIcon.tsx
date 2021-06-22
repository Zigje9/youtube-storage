import React from 'react'
import styled from 'styled-components'
import color from '../../assets/colors'
import {CartDownload} from '@styled-icons/boxicons-solid/CartDownload'

const CartIcon = styled(CartDownload)`
  width: 30px;
  color: ${color.blue.lv3};
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`

const CheckIcon: React.FC = () => {
  const alertHandler = () => {
    alert("담고 싶은 노래를 체크해 주세요!")
  }

  return (
    <CartIcon onClick={() => alertHandler()}></CartIcon>
  )
}

export default CheckIcon