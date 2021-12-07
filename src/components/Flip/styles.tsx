import styled from 'styled-components';

const duration = '0.5s';

export const Container = styled.div<{ flipped: boolean; }>`
  position: relative;
  perspective: 1200px;
  transform-style: preserve-3d;
`;

export const Front = styled.div<{ flipped: boolean; }>`
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  transition: transform ${duration} ease;
  transform: rotateY(180deg);
  transform: ${(props) => props.flipped ? 'rotateY(0deg)' : 'rotateY(-180deg)'};
  
`;

export const Back = styled.div<{ flipped: boolean; }>`
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  transition: transform ${duration} ease;
  transform: ${(props) => props.flipped ? 'rotateY(-180deg)' : 'rotateY(0deg)'};
`;
