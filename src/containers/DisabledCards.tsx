import React from 'react';
import { Box } from '../components/Box';
import { Text } from '../components/Text';
import { Card, cards } from '../components/Card';

interface Props {
  disabledCards: { [card: string]: boolean; }; // returns a string for local storage
  setDisabledCards: (value: { [card: string]: boolean; }) => void;
}

export function DisabledCards(props: Props) {
  return (
    <Box direction="vertical" alignItems="center" paddingBottom='l'>
      <Box paddingBottom='s' paddingTop='s'>
        <Text size="m" fontWeight={600}>Cards</Text>
      </Box>

      <Box justifyContent='center'>
        {cards.map(card => (
          <div 
            style={{ cursor: 'pointer' }} 
            onClick={() => {
              const updatedValue = { ...props.disabledCards };
              updatedValue[card.card] = !updatedValue[card.card];
              props.setDisabledCards(updatedValue);
            }}
          >
            <Box paddingRight='xs'>
              <Card card={card.card} flipped={!props.disabledCards[card.card]} size='s' />
            </Box>
          </div>
        ))}
      </Box>
    </Box>
  );
}