import React from 'react';
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

export function CardSelectView() {

  const { game, selectCard } = useGame();
  const { me } = useMe();

  const myId = me?.id!;  
  const disabledCards = game?.disabledCards || {};

  const [currentCard, setCurrentCard] = React.useState<ICard | null>(null); 
  const deviceType = useDeviceType();

  const tickets = game?.tickets || []
  const currentTicket = tickets ? tickets[0] : null

  const open = !game?.players[myId]?.selectedCard && game?.phase === 'selecting';
  return (
    <Overlay open={open}>
      <MaxWidth>
        <Box direction="vertical" justifyContent="center" alignItems="center" overflowY="auto">

          <Box paddingBottom="m" direction='vertical' alignItems="center">
            <Text size="l" color='primary' fontWeight={600}>
              {currentTicket?.number || currentCard?.title || 'How Complex?'}
            </Text>
            <Box paddingTop="xs" >
              <MaxWidth small>
                <Text size="s" color='secondary' fontWeight={300} align="center">
                  {currentTicket?.description || currentCard?.description || 'Select the card that best fits the task'}
                </Text>
              </MaxWidth>
            </Box>
          </Box>

          <Box height={deviceType === 'mobile' ? 'calc(100vh - 200px)' : undefined} direction="horizontal" justifyContent="center" alignItems="center" wrap>

              {cards.map(card => !disabledCards[card.card] && (
                <Box padding="xs" direction="vertical" alignItems="center">
                  <div 
                    onMouseOver={() => setCurrentCard(card)} 
                    onMouseOut={() => setCurrentCard(null)} 
                    onClick={() => {
                      selectCard(myId, card.card)
                    }} 
                  >
                    <HoverEffect>
                      <Card card={card.card} flipped={true} />
                    </HoverEffect>
                  </div>
                </Box>
              ))}
              
          </Box>

        </Box>
      </MaxWidth>
    </Overlay>
  );
}