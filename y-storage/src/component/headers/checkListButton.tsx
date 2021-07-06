import React, { useState } from 'react';
import styled from 'styled-components';
import { MusicNoteList } from '@styled-icons/bootstrap/MusicNoteList';
import color from '../../assets/colors';
interface SelectVideo {
  [key: string]: [string, string];
}
interface Props {
  cartList: SelectVideo;
}
interface HoverProps {
  isHover: boolean;
}

const ListButton = styled.button`
  background-color: inherit;
  border: none;
`;

const ListIcon = styled(MusicNoteList)`
  width: 30px;
  color: ${color.white.lv1};
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const DropDownBox = styled.div<HoverProps>`
  display: ${(props) => (props.isHover ? 'block' : 'none')};
  position: absolute;
  background-color: ${color.white.lv1};
  min-width: 180px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.7);
  z-index: 1;
  border-radius: 20px;
`;

const DropDownContent = styled.div`
  color: ${color.blue.lv6};
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  height: 80px;
  overflow: hidden;
  font-size: 1px;
`;

const BottomLine = styled.p`
  width: 50%;
  margin: 0 auto;
  margin-bottom: 20%;
  border: 0.5px dashed ${color.blue.lv2};
`;

const Container = styled.div``;

const CheckListButton: React.FC<Props> = ({ ...props }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const cartList = props.cartList;

  return (
    <ListButton>
      <ListIcon onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)}></ListIcon>
      <DropDownBox isHover={isHover}>
        {cartList &&
          Object.keys(cartList).map((vid, idx) => {
            return (
              <Container key={`${vid}*${idx}`}>
                <DropDownContent>{cartList[vid][0]}</DropDownContent>
                <BottomLine></BottomLine>
              </Container>
            );
          })}
      </DropDownBox>
    </ListButton>
  );
};

export default CheckListButton;
