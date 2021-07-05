import React from 'react';
import styled from 'styled-components';
import { Youtube2 } from '@styled-icons/icomoon/Youtube2';
import color from '../../assets/colors';
import { useHistory } from 'react-router-dom';

interface Props {
  reload: boolean;
}
const LogoIcon = styled(Youtube2)`
  width: 80px;
  color: ${color.white.lv1};
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const Logo: React.FC<Props> = ({ ...props }: Props) => {
  const history = useHistory();
  const historyHandler = () => {
    props.reload ? history.go(0) : history.push('/');
  };

  return <LogoIcon onClick={() => historyHandler()}></LogoIcon>;
};

export default Logo;
