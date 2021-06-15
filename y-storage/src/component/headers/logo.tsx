import React from 'react'
import styled from 'styled-components'
import {Youtube2} from '@styled-icons/icomoon/Youtube2'
import color from '../../assets/colors'

const LogoIcon = styled(Youtube2)`
  width: 80px;
  color: ${color.white.lv1};
`

const Logo: React.FC = () => {
  return (
    <LogoIcon></LogoIcon>
  )
}

export default Logo