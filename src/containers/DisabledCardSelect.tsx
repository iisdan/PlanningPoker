import React, { useState } from 'react';
import { Box } from '../components/Box';
import { Card, cards } from '../components/Card';
import { HoverEffect } from '../components/HoverEffect';
import { MaxWidth } from '../components/MaxWidth';
import { Overlay } from '../components/Overlay';
import { Text } from '../components/Text';
import { useGame } from '../hooks/useGame';
import { Card as ICard } from '../interfaces';
import { useDeviceType } from '../hooks/useDeviceType';
import { useMe } from '../hooks/useMe';
import { TextToggle } from '../components/TextToggle';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import styled from 'styled-components';

interface Props {
  disabledCards: { [card: string]: boolean; }; // returns a string for local storage
  setDisabledCards: (value: { [card: string]: boolean; }) => void;
}

export function DisabledCardSelect(props: Props) {

  const { game, selectCard } = useGame();
  const { me } = useMe();

  const myId = me?.id!;  
  const deviceType = useDeviceType();
  const [open, setOpen] = useState(false);

  return (
    <>

      <div style={{ cursor: 'pointer' }} onClick={() => setOpen(!open)}>
        <Box direction='vertical' alignItems='center' justifyContent='center'>
          <img alt="card" src={require('../assets/icons/cards.svg').default} width="30" />
          {/* <Box paddingTop='s'>
            <Text size='xs' >Deck</Text>
          </Box> */}
        </Box>
      </div>

      <Overlay open={open}>
        <MaxWidth>
          <Box direction="vertical" justifyContent="center" alignItems="center" overflowY="auto">

          <Box direction="vertical" alignItems="center" >
            
            <Box direction="vertical" paddingBottom='xl' alignItems="center" paddingTop='s'>
              <Text size="xl" fontWeight={600}>Deck</Text>

              <MaxWidth small>
                <Text size="s" color='secondary' fontWeight={300} align="center">
                  Select a card to enable or disable it
                </Text>
              </MaxWidth>
            </Box>

            <Box justifyContent='center' wrap>
              {cards.map(card => (
                <div 
                  style={{ cursor: 'pointer' }} 
                  onClick={() => {
                    const updatedValue = { ...props.disabledCards };
                    updatedValue[card.card] = !updatedValue[card.card];
                    props.setDisabledCards(updatedValue);
                  }}
                >
                  <Box paddingRight='xs' paddingBottom='xs'>
                    <Card card={card.card} flipped={!props.disabledCards[card.card]} size='m' />
                  </Box>
                </div>
              ))}
            </Box>

            <Box paddingTop="l">
              <Button onClick={() => setOpen(false)}>Done</Button>
            </Box>
          </Box>
            
          </Box>
        </MaxWidth>
      </Overlay>

    </>
  );
}