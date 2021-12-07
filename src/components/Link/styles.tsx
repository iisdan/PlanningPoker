import styled from 'styled-components';
import { theme } from '../../theme';

export const LinkElement = styled.a`
  color: ${() => theme.colors.accent};
  text-decoration: none;
`;