import styled from 'styled-components';
import { isValidUrl } from '../../utils/validation';

export const ProfileImageElement = styled.div<{ src: string; }>`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  user-select: none;
  background-image: url(${props => isValidUrl(props.src) ? props.src : ''});
  background-size: contain;
  background-position: center center;
`;