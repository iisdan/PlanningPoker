import React from 'react';
import { Button, Container, Tooltip } from './styles';

interface Props {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}

export const IconButton = (props: Props) => {
  return (
    <Container>
      <Button type="button" aria-label={props.label} onClick={props.onClick}>
        {props.children}
      </Button>
      <Tooltip aria-hidden="true">{props.label}</Tooltip>
    </Container>
  );
}
