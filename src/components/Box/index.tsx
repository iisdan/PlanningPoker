import React from 'react';
import { sizingCode } from '../../theme';
import { Container } from './styles';

interface Props {
  children: React.ReactNode;
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
  opacity?: number;
}

export const Box = (props: Props) => {
  return (
    <Container
      paddingLeft={props.paddingLeft}
      paddingRight={props.paddingRight}
      paddingTop={props.paddingTop}
      paddingBottom={props.paddingBottom}
      padding={props.padding}
      justifyContent={props.justifyContent}
      direction={props.direction}
      alignItems={props.alignItems}
      height={props.height}
      zIndex={props.zIndex}
      wrap={props.wrap}
      width={props.width}
      overflowY={props.overflowY}
      opacity={props.opacity}
    >
      {props.children}
    </Container>
  );
}
