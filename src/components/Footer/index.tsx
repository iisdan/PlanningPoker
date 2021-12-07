import React from 'react';
import { Container, PushContent } from './styles';

interface Props {
  children: React.ReactNode;
}

export const Footer = (props: Props) => {
  return (
    <>
      <Container>
        {props.children}
      </Container>
      {/* <PushContent>
        {props.children}
      </PushContent> */}
    </>
  );
}
