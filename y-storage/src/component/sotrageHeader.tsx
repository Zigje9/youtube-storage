import React from 'react';
import styled from 'styled-components';
import Logo from './headers/logo';
import DiskButton from './headers/diskButton';
import getDate from '../utils/getDate';
import { FiberNew } from '@styled-icons/material-sharp/FiberNew';
import color from '../assets/colors';
interface Props {
  numOfFile: number;
  lastModified: any;
}

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 5% 10% 15% 25% 5% 25% 5% 5%;
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
  width: 30px;
  color: ${color.blue.lv3};
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const StorageHeader: React.FC<Props> = ({ ...props }: Props) => {
  const last = new Date(props.lastModified?.LastModified);

  return (
    <HeaderContainer>
      <DIV></DIV>
      <Logo reload={false}></Logo>
      <DiskButton reload={true}></DiskButton>
      <NewIcon></NewIcon>
      <DIV>{getDate(last)}</DIV>
      <DIV>{props.numOfFile}</DIV>
      <DIV></DIV>
      <DIV></DIV>
    </HeaderContainer>
  );
};

export default StorageHeader;
