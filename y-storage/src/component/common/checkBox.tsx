import React from 'react'
import styled from 'styled-components'

const InputCheckBox = styled.input.attrs({
  type: 'checkbox'
})`
  transform : scale(1.5);
`


const CheckBox: React.FC = () => {
  return (
    <InputCheckBox></InputCheckBox>
  )
}

export default CheckBox