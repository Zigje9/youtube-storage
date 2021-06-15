import React from 'react'
import styled from 'styled-components'
import color from '../../assets/colors'
import {CartDownload} from '@styled-icons/boxicons-solid/CartDownload'

const CartIcon = styled(CartDownload)`
  width: 30px;
  color: ${color.blue.lv3};
`

const CheckIcon: React.FC = () => {
  return (
    <CartIcon></CartIcon>
  )
}

export default CheckIcon