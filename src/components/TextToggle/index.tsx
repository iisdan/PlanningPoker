import { Text } from '../Text';
import { Container } from './styles';

interface Props {
  on: boolean;
  onChange: (newValue: boolean) => void;
  offText: string;
  onText: string;
}

export const TextToggle = (props: Props) => {
  return (
    <Container onClick={() => props.onChange(!props.on)}>
      {props.on && (
        <Text size='xs' color={'accent'}>{props.onText}</Text>
      )}
      {!props.on && (
        <Text size='xs' color={'accent'}>{props.offText}</Text>
      )}
    </Container>
  );
}

