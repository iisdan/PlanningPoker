import styled from 'styled-components';

export const Container = styled.div<{ full?: boolean; small?: boolean; }>`
  display: flex;
  flex-direction: column;
  max-width: ${(props) => props.full ? '100%' : props.small ? '500px' : '800px'};
  width: 100%;
`;