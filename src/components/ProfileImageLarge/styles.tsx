import styled from 'styled-components';
import { theme } from '../../theme';
import { isValidUrl } from '../../utils/validation';

export const ProfileImageElement = styled.div<{ src: string; }>`
  width: 120px;
  height: 120px;
  border-radius: 100%;
  user-select: none;
  background-image: url(${props => isValidUrl(props.src) ? props.src : ''});
  background-size: contain;
  background-position: center center;
  @media (max-width: ${theme.deviceMaxWidths.mobile}px) {
    width: 90px;
    height: 90px;
  }
`;