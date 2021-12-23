import React from 'react';
import { Container, InnerContainer } from './styles';

interface Props {
  children: React.ReactNode;
  open: boolean;
}

export const Overlay = (props: Props) => {
  return (
    <Container open={props.open}>
      <InnerContainer open={props.open}>
        {props.children}
      </InnerContainer>
    </Container>
  );
}
