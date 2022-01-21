import React from 'react';
import { Container } from './styles';

export const Loading = () => {
  return (
    <Container>
      <img alt="card" src={require('../../assets/icons/loading.svg').default} width="30" style={{ opacity: 0.5 }} />
    </Container>
  );
}
