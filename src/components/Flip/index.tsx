import React from 'react';
import { Container, Front, Back} from './styles';

interface Props {
  side: 'front' | 'back';
  front: React.ReactNode;
  back: React.ReactNode;
}

export const Flip = (props: Props) => {
  const flipped = props.side === 'front';
  return (
    <Container flipped={flipped}>
      <div style={{opacity: 0}}>
        {props.front}
      </div>
      <Front flipped={flipped} >
        {props.front}
      </Front>
      <Back flipped={flipped} >
        {props.back}
      </Back>
    </Container>
  );
}
