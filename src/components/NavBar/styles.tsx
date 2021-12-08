import styled from 'styled-components';
import { theme } from '../../theme';

export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 250px;
  box-sizing: border-box;
  padding-left: ${() => theme.spacing.l}px;
  padding-right: ${() => theme.spacing.l}px;
  z-index: 40;
  @media (max-width: ${theme.deviceMaxWidths.mobile}px) {
    height: 180px;
  }
`;

export const PushContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 180px;
  box-sizing: border-box;
  padding-left: ${() => theme.spacing.l}px;
  padding-right: ${() => theme.spacing.l}px;
  pointer-events: none;
  opacity: 0;
  @media (max-width: ${theme.deviceMaxWidths.mobile}px) {
    height: 140px;
  }
`;
