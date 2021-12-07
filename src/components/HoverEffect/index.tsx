import React from 'react';
import { Container } from './styles';

interface Props {
  children: React.ReactNode;
}

export const HoverEffect = (props: Props) => {
  return (
    <Container>
      {props.children}
    </Container>
  );
}
