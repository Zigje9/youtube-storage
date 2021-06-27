import React from 'react';
import styled from 'styled-components';
import { Download } from '@styled-icons/boxicons-regular/Download';
import color from '../../assets/colors';

interface SelectVideo {
  [key: string]: string;
}
interface Props {
  cartList: SelectVideo;
}

const DownButton = styled.button`
  background-color: inherit;
  border: none;
`;

const DownIcon = styled(Download)`
  width: 40px;
  color: ${color.white.lv1};
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const DownloadButton: React.FC<Props> = ({ ...props }: Props) => {
  const cartList = props.cartList;
  const downloadHandler = () => {
    console.log('here', cartList);
    console.log('here');
  };

  return (
    <DownButton onClick={() => downloadHandler()}>
      <DownIcon></DownIcon>
    </DownButton>
  );
};

export default DownloadButton;
