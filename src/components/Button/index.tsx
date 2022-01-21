import React from 'react';
import { Text } from '../Text';
import { ButtonElement } from './styles';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  to?: string;
}

export const Button = (props: Props) => {
  return (
    <ButtonElement href={props.to} onClick={() => { if (!props.disabled && props.onClick) { props.onClick(); }}} disabled={props.disabled}>
      <Text size="s" color="primary" fontWeight={600}>
        {props.children}
      </Text>
    </ButtonElement>
  );
}
