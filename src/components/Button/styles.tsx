import styled from 'styled-components';
import { theme } from '../../theme';

export const ButtonElement = styled.a<{ disabled?: boolean; }>`
  padding: ${theme.spacing.s}px;
  background-color: rgba(255,255,255,0.12);
  border-radius: 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  min-width: 70px;
  text-align: center;
  transition: 0.25s;
  &:hover {
    ${props => !props.disabled ? 'background-color: rgba(255,255,255,0.2);' : ''}
  }
  &:active {
    ${props => !props.disabled ? 'background-color: rgba(255,255,255,0.12);' : ''}
  }
  ${props => props.disabled ? 'opacity: 0.5;' : ''}
  ${props => props.disabled ? 'cursor: default;' : ''}
`;