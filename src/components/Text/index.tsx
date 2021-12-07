import { colors, sizingCode } from '../../theme';
import { Container } from './styles';

interface Props {
  children: any;
  size: sizingCode;
  color?: colors;
  bold?: boolean;
  fontWeight?: number;
  align?: 'left' | 'right' | 'center';
}

export const Text = (props: Props) => {
  return (
    <Container align={props.align} size={props.size} bold={props.bold} color={props.color || 'primary'} fontWeight={props.fontWeight}>
      {props.children}
    </Container>
  );
}
