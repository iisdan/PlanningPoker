import styled from 'styled-components';
import { theme } from '../../theme';

// position: fixed;
//   left: 0px;
//   bottom: 0px;
// height: 80px;

export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: ${() => theme.spacing.m}px;
  background-color: black;
  z-index: 40;
`;

export const PushContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 80px;
  box-sizing: border-box;
  padding-left: ${() => theme.spacing.m}px;
  padding-right: ${() => theme.spacing.m}px;
  pointer-events: none;
  opacity: 0;
`;
