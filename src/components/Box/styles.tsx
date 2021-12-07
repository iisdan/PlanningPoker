import styled from 'styled-components';
import { sizingCode, theme } from '../../theme';

interface Props {
  paddingLeft?: sizingCode;
  paddingRight?: sizingCode;
  paddingTop?: sizingCode;
  paddingBottom?: sizingCode;
  padding?: sizingCode;
  justifyContent?: 'space-between' | 'center' | 'space-evenly' | 'space-around';
  direction?: 'horizontal' | 'vertical';
  alignItems?: 'flex-end' | 'center';
  height?: string;
  zIndex?: number;
  wrap?: boolean;
  width?: string;
  overflowY?: 'none' | 'auto' | 'scroll';
}

function getSpacingSize(size: sizingCode) {
  return theme.spacing[size];
}

export const Container = styled.div<Props>`
  display: flex;
  position: relative;
  felx-shrink: 0;
  flex-direction: ${(props) => props.direction === 'vertical' ? 'column' : 'row'};
  ${(props) => props.justifyContent ? `justify-content:${props.justifyContent};` : ''};
  ${(props) => props.alignItems ? `align-items:${props.alignItems};` : ''};
  ${(props) => props.width ? `width:${props.width};` : ''};

  ${(props) => props.height ? `height: ${props.height};` : ''};
  ${(props) => props.zIndex ? `z-index: ${props.zIndex};` : ''};

  ${(props) => props.padding ? `padding:${getSpacingSize(props.padding)}px;` : ''};
  ${(props) => props.paddingLeft ? `padding-left:${getSpacingSize(props.paddingLeft)}px;` : ''};
  ${(props) => props.paddingRight ? `padding-right:${getSpacingSize(props.paddingRight)}px;` : ''};
  ${(props) => props.paddingTop ? `padding-top:${getSpacingSize(props.paddingTop)}px;` : ''};
  ${(props) => props.paddingBottom ? `padding-bottom:${getSpacingSize(props.paddingBottom)}px;` : ''};

  flex-wrap: ${(props) => props.wrap ? 'wrap' : 'no-wrap'};
  ${(props) => props.overflowY ? `overflow-y: ${props.overflowY}` : ''}
`;