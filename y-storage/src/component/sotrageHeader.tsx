import React from 'react';
import styled from 'styled-components';
import Logo from './headers/logo';
import DiskButton from './headers/diskButton';
import getDate from '../utils/getDate';
import { FiberNew } from '@styled-icons/material-sharp/FiberNew';
import { TextNumberListLtr } from '@styled-icons/fluentui-system-filled/TextNumberListLtr';
import color from '../assets/colors';
import { newInfo, totalNumber } from '../utils/infoAlert';
interface Props {
  numOfFile: number;
  lastModified: any;
}

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 5% 10% 15% 20% 5% 25% 5% 10%;
  align-items: center;
  height: 12vh;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    96deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 18%,
    rgba(41, 90, 186, 1) 41%,
    rgba(6, 68, 160, 1) 76%,
    rgba(0, 212, 255, 1) 95%
  );
`;

const DIV = styled.div`
  width: 100%;
`;

const NewIcon = styled(FiberNew)`
  width: 40px;
  color: ${color.white.lv1};
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const NumIcon = styled(TextNumberListLtr)`
  width: 40px;
  color: ${color.white.lv1};
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const Text = styled.p`
  color: ${color.white.lv1};
  font-weight: bold;
  font-style: oblique;
`;

const StorageHeader: React.FC<Props> = ({ ...props }: Props) => {
  const last = new Date(props.lastModified?.LastModified);

  return (
    <HeaderContainer>
      <DIV></DIV>
      <Logo reload={false}></Logo>
      <DiskButton reload={true}></DiskButton>
      <DIV></DIV>
      <NewIcon onClick={() => newInfo()}></NewIcon>
      <Text>{getDate(last)}</Text>
      <NumIcon onClick={() => totalNumber()}></NumIcon>
      <Text>{props.numOfFile}개의 곡</Text>
    </HeaderContainer>
  );
};

export default StorageHeader;
