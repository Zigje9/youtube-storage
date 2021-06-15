import React from 'react'
import styled from 'styled-components'
import color from '../../assets/colors'

const SpanBox = styled.span`
  color: ${color.black.lv1}
`

const CheckSpan: React.FC = () => {
  return (
    <SpanBox>담기</SpanBox>
  )
}

export default CheckSpan