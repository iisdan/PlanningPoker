import styled from 'styled-components';
import { sizingCode, theme, colors } from '../../theme';

function getSize(size: sizingCode) {
  const sizes = theme.textSizes;
  return sizes[size];
}

function getColor(color: colors) {
  const colors = theme.colors;
  return colors[color];
}

export const Container = styled.span<{ align?: 'left' | 'right' | 'center'; size: sizingCode; bold?: boolean; color: colors; fontWeight?: number; }>`
  font-size: ${(props) => getSize(props.size)}px;
  font-weight: ${(props) => props.fontWeight || (props.bold ? 'bold' : 'normal')};
  color: ${props => getColor(props.color)};
  text-align: ${props => props.align || 'left'};
  line-height: 150%;
`;