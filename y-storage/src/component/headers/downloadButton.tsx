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
    const selectListLength = Object.keys(cartList).length;
    if (selectListLength >= 1 && selectListLength < 4) {
      if (confirm('다운로드를 시작하겠습니까?')) {
        console.log('hh');
      } else {
        console.log('취소');
      }
    } else {
      alert('한번에 1개 ~ 3개의 음악을 다운받도록 선택해 주세요!');
    }
  };

  return (
    <DownButton onClick={() => downloadHandler()}>
      <DownIcon></DownIcon>
    </DownButton>
  );
};

export default DownloadButton;
