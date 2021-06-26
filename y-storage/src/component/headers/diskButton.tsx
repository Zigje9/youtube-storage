import React from 'react';
import styled from 'styled-components';
import { FloppyDisk } from '@styled-icons/icomoon/FloppyDisk';
import color from '../../assets/colors';
import { useHistory } from 'react-router-dom';

const DiskIcon = styled(FloppyDisk)`
  width: 40px;
  color: ${color.white.lv1};
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const Disk: React.FC = () => {
  const history = useHistory();

  return <DiskIcon onClick={() => history.push('/storage')}></DiskIcon>;
};

export default Disk;
