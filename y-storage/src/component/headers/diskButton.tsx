import React from 'react';
import styled from 'styled-components';
import { FloppyDisk } from '@styled-icons/icomoon/FloppyDisk';
import color from '../../assets/colors';

const DiskIcon = styled(FloppyDisk)`
  width: 40px;
  color: ${color.white.lv1};
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const Disk: React.FC = () => {
  return <DiskIcon></DiskIcon>;
};

export default Disk;
