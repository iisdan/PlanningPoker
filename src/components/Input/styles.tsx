import styled from 'styled-components';
import { theme } from '../../theme';

export const InputElement = styled.input<{  }>`
  background-color: transparent;
  color: white;
  font-size: ${theme.textSizes.m}px;
  text-align: left;
  outline: none;
  flex-grow: 1;
  display: flex;
  padding: ${theme.spacing.s}px;
  padding-left: 0px;
  appearance: caret;
`;

export const Container = styled.div<{  }>`
  background-color: rgba(255,255,255,0.1);
  border-radius: 10px;
  color: white;
  font-size: ${theme.textSizes.m}px;
  text-align: center;
  margin-bottom:  ${theme.spacing.s}px;
  align-items: center;
  justify-content: center;
`;
