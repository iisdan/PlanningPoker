import styled from 'styled-components';
import { theme } from '../../theme';

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
