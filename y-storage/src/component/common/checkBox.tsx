import React from 'react'
import styled from 'styled-components'

const InputCheckBox = styled.input.attrs({
  type: 'checkbox'
})`
  background-color: red;
`


const CheckBox: React.FC = () => {
  return (
    <InputCheckBox></InputCheckBox>
  )
}

export default CheckBox