import styled from 'styled-components';
import { theme } from '../../theme';

const duration = '0.4s';

export const Container = styled.div`
  perspective: 500px;
`

function getCardSide(size: 'xl' | 'l' | 's') {
  const sizes = {
    xl: 150,
    l: 120,
    s: 70,
  }
  return sizes[size];
}

export const CardImage = styled.img<{ hide?: boolean; shadow?: boolean; size: 'xl' | 'l' | 's' }>`
  width: ${(props) => getCardSide(props.size)}px;
  border-radius: 4%;
  user-select: none;
  position: relative;
  z-index: 3;
  overflow: hidden;
  opacity: ${(props) => props.hide ? '0' : '1'};
  transform: translate(${(props) => props.hide ? '-40px, 300px' : '0px, 0px'}) rotate(${(props) => props.hide ? '-100deg' : '0deg'}) rotate3d(${(props) => props.hide ? '1, 1, 0, -70deg' : '0, 0, 0, 0deg'});
  transition: all ${duration};
  box-shadow: ${(props) => props.shadow ? '0px 0px 100px black' : 'none'};
  margin-bottom: -5px; /*Card has extra spacing at the bottom*/
  @media (max-width: ${theme.deviceMaxWidths.mobile}px) {
    width: 100px;
  }
`;

export const EmptyCard = styled.div<{ hide?: boolean; noBorder?: boolean; }>`
  border-radius: 4%;
  user-select: none;
  position: relative;
  border: ${(props) => props.noBorder ? '0' : '1'}px solid ${(props) => props.hide ? 'rgba(0,0,0,0.0)' : 'rgba(255,255,255,0.05)'};
  background-color: ${(props) => props.hide ? 'rgba(255,255,255,0.0)' : 'rgba(255,255,255,0.03)'};
  box-sizing: border-box;
  transition: all ${duration};
`;

export const EmptyMessageContainer = styled.div<{ hide?: boolean; }>`
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0px;
  top: 0px;
  flex-direction: column;
  z-index: -1;
  opacity: ${(props) => props.hide ? '0' : '1'};
  transition: all ${duration};
`;

