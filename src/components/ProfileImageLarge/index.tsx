import { Box } from '../Box';
import { Text } from '../Text';
import { ProfileImageElement } from './styles';

interface Props {
  image: string;
  name: string;
  role: string
}

export const ProfileImageLarge = (props: Props) => {
  return (
    <Box alignItems="center" justifyContent="center" direction="vertical" zIndex={10}>
    <ProfileImageElement
      src={props.image} 
    />
    <Box paddingTop="s" direction="vertical"  justifyContent="center" alignItems="center">
      <Text size="m" fontWeight={600}>{props.name}</Text>
      <Text size="xs" color="secondary">{props.role}</Text>
    </Box>
  </Box>
  );
}
