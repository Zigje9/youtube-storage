import React, { useState } from 'react'
import styled from 'styled-components'
import color from '../../assets/colors'

interface Props{
  selectFunction:(videoId: string, isChecked: boolean) => void;
  vid: string;
}

const InputCheckBox = styled.input.attrs({
  type: 'checkbox'
})`
  transform : scale(1.5);
  :checked {
    box-shadow: 0 0 0 2px ${color.red.lv1};
  }
`

const CheckBox: React.FC<Props> = ({...props}: Props) => {
  const selectListHandler = props.selectFunction
  const [check, setCheck] = useState(false)
  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(!check)
    selectListHandler(props.vid, e.target.checked)
  }
  return (
    <InputCheckBox onChange={(e) => checkHandler(e)}></InputCheckBox>
  )
}

export default CheckBox