import React from 'react';
import styled from 'styled-components';
import { FloppyDisk } from '@styled-icons/icomoon/FloppyDisk';
import color from '../../assets/colors';
import { useHistory } from 'react-router-dom';

interface Props {
  reload: boolean;
}

const DiskIcon = styled(FloppyDisk)`
  width: 40px;
  color: ${color.white.lv1};
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const Disk: React.FC<Props> = ({ ...props }: Props) => {
  const history = useHistory();
  const historyHandler = () => {
    props.reload ? history.push('/storage') : history.push('/storage');
  };

  return <DiskIcon onClick={() => historyHandler()}></DiskIcon>;
};

export default Disk;
