import styled from 'styled-components';
import { theme } from '../../theme';

const duration = '0.4s';

export const Container = styled.div<{ open: boolean; }>`
  display: flex;
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  z-index: 50;
  transition: all ${duration};
  background-color: ${(props) => props.open ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.0)'};
  pointer-events: ${(props) => props.open ? 'all' : 'none'};
`;

export const InnerContainer = styled.div<{ open: boolean; }>`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: ${() => theme.spacing.l}px;
  z-index: 50;
  transition: all ${duration};
  transform: ${(props) => props.open ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(000px)'};
  opacity: ${(props) => props.open ? '1' : '0'};
  pointer-events: ${(props) => props.open ? 'all' : 'none'};
`;
