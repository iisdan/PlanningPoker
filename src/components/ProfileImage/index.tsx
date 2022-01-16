import { Box } from '../Box';
import { Text } from '../Text';
import { ProfileImageElement } from './styles';

interface Props {
  image: string;
  name: string;
  role: string
}

export const ProfileImage = (props: Props) => {
  return (
    <Box alignItems="center" justifyContent="center" direction="horizontal" zIndex={10}>
    <ProfileImageElement
      src={props.image} 
    />
    <Box paddingLeft="s" direction="vertical"  justifyContent="center">
      <Text size="s" bold>{props.name}</Text>
      <Text size="xs" color="secondary">{props.role}</Text>
    </Box>
  </Box>
  );
}
