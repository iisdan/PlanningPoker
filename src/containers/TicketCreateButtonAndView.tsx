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
import { Button } from '../components/Button';
import styled from 'styled-components';
import { Input } from '../components/Input';

const ScrollView = styled.div`
  height: 150px;
  overflow-y: auto;
`

export function TicketCreateButtonAndView() {

  const { game, selectCard } = useGame();
  const { me } = useMe();

  const myId = me?.id!;  
  const deviceType = useDeviceType();
  const [open, setOpen] = useState(false);

  return (
    <>

      {/* <div onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
        <Text size='xs' color={'accent'}>Tickets</Text>
      </div> */}

      <div style={{ cursor: 'pointer' }} onClick={() => setOpen(!open)}>
        <Box direction='vertical' alignItems='center' justifyContent='center' paddingRight='s'>
          <img alt="card" src={require('../assets/icons/ticket.svg').default} width="30" />
            {/* <Text size='xs' >Tickets</Text> */}
        </Box>
      </div>

      <Overlay open={open}>
        <MaxWidth>
          <Box direction="vertical" justifyContent="center" alignItems="center" overflowY="auto">

            <Box direction="vertical" paddingBottom='xl' alignItems="center" paddingTop='s'>
              <Text size="xl" fontWeight={600}>Tickets</Text>

              <MaxWidth small>
                <Text size="s" color='secondary' fontWeight={300} align="center">
                  Optionally add ticket numbers and descriptions to rounds.
                </Text>
              </MaxWidth>
            </Box>

            <ScrollView>

              <Box justifyContent="center" direction="horizontal">
                <Box paddingRight='xs'>
                  <Input label="Ticket" value={''} setValue={(newValue) => {}} />
                </Box>
                <Input label="Description" value={''} setValue={(newValue) => {}} />
              </Box>

              <Box justifyContent="center" direction="horizontal">
                <Box paddingRight='xs'>
                  <Input label="Ticket" value={''} setValue={(newValue) => {}} />
                </Box>
                <Input label="Description" value={''} setValue={(newValue) => {}} />
              </Box>


            </ScrollView>

            <Box paddingTop="l">
              <Button onClick={() => setOpen(false)}>Done</Button>
            </Box>
            
          </Box>
        </MaxWidth>
      </Overlay>

    </>
  );
}