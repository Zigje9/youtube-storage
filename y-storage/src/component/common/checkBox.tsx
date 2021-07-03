import React from 'react';
import styled from 'styled-components';
import color from '../../assets/colors';

interface Props {
  selectFunction: (videoId: string, videoTitle: string, videoThumbnail: string, isChecked: boolean) => void;
  videoId: string;
  videoTitle: string;
  videoThumbnail: string;
}

const InputCheckBox = styled.input.attrs({
  type: 'checkbox',
})`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  :checked ~ span {
    :after {
      display: block;
    }
  }
`;

const CheckBoxContainer = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 30px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const SpanCheckBox = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: ${color.white.lv1};
  border: 0.5px solid ${color.blue.lv5};
  border-radius: 5px;
  :after {
    content: '';
    position: absolute;
    display: none;
    left: 8px;
    top: 4px;
    width: 5px;
    height: 10px;
    border: solid red;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

const CheckBox: React.FC<Props> = ({ ...props }: Props) => {
  const selectListHandler = props.selectFunction;
  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    selectListHandler(props.videoId, props.videoTitle, props.videoThumbnail, e.target.checked);
  };
  return (
    <CheckBoxContainer>
      <InputCheckBox onChange={(e) => checkHandler(e)}></InputCheckBox>
      <SpanCheckBox></SpanCheckBox>
    </CheckBoxContainer>
  );
};

export default CheckBox;
