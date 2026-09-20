import React from 'react';
import { Box } from '../Box';
import { Text } from '../Text';
import { InputElement, Container } from './styles';

interface Props {
  label?: string;
  placeholder?: string;
  value: string;
  setValue: (newValue: string) => void;
  autofocus?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
}

export const Input = (props: Props) => {
  return (
    <Container>
      <Box direction="horizontal" alignItems="center" justifyContent="center">
        {props.label && (
          <Box padding="s" justifyContent="center">
            <Text size="s" color="secondary">{props.label}</Text>
          </Box>
        )}
        <InputElement ref={props.inputRef} autoFocus={props.autofocus} placeholder={props.placeholder} value={props.value} onChange={(event) => props.setValue(event.target.value)} />
      </Box>
    </Container>
  );
}
