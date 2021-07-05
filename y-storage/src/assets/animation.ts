import { keyframes } from 'styled-components';
import color from './colors';

export const fade = keyframes`
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 0;
  }
  75% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

export const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const fill = keyframes`
  0%  {
    color: ${color.blue.lv2};
  }
  25%  {
    color: ${color.blue.lv3};
    transform: scale(1.1);
  }
  50%  {
    color: ${color.blue.lv4};
    transform: scale(1.2);
  }
  75%  {
    color: ${color.blue.lv6};
    transform: scale(1.3);
  }
  100%  {
    color: ${color.blue.lv7};
    transform: scale(1.4);
  }
`;
