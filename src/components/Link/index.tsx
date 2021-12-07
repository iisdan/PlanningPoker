import React from 'react';
import { LinkElement } from './styles';

interface Props {
  children: React.ReactNode;
  to: string;
  newTab?: boolean;
}

export const Link = (props: Props) => {
  return (
    <LinkElement href={props.to} target={props.newTab ? '_blank' : '_self'}>
      {props.children}
    </LinkElement>
  );
}
