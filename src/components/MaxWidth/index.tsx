import React from 'react';
import { Container } from './styles';

interface Props {
  children: React.ReactElement;
  full?: boolean;
  small?: boolean;
}

export const MaxWidth = (props: Props) => {
  return (
    <Container small={props.small} full={props.full}>
      {props.children}
    </Container>
  );
}
