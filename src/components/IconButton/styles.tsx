import styled from 'styled-components';
import { theme } from '../../theme';

export const Tooltip = styled.span`
  position: absolute;
  left: 50%;
  bottom: calc(100% + ${theme.spacing.xs}px);
  z-index: 100;
  padding: 6px ${theme.spacing.xs}px;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 6px;
  background-color: #242424;
  color: ${theme.colors.primary};
  font-size: ${theme.textSizes.xs}px;
  line-height: 1;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translate(-50%, 4px);
  transition: opacity 0.15s, transform 0.15s, visibility 0.15s;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    border: 5px solid transparent;
    border-top-color: #242424;
    transform: translateX(-50%);
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: inherit;
  cursor: pointer;

  img {
    filter: brightness(1);
    transition: filter 0.2s;
  }

  &:hover img,
  &:focus-visible img {
    filter: brightness(1.8);
  }

  &:focus-visible {
    outline: none;
  }
`;

export const Container = styled.div`
  position: relative;
  display: inline-flex;

  &:hover ${Tooltip},
  &:focus-within ${Tooltip} {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, 0);
  }
`;
