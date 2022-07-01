import React, { useEffect, useState } from 'react';
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
  height: 350px;
  overflow-y: auto;
`

export function TicketCreateButtonAndView() {

  const { game, addTicket, removeTicket, updateTicket } = useGame();
  const { me } = useMe();

  const myId = me?.id!;  
  const deviceType = useDeviceType();
  const [open, setOpen] = useState(false);

  const tickets = game?.tickets || []

  useEffect(() => {
    if (!tickets.length) {
      addTicket()
    }
  }, [open, tickets])

  return (
    <>

      <div style={{ cursor: 'pointer' }} onClick={() => setOpen(!open)}>
        <Box direction='vertical' alignItems='center' justifyContent='center' paddingRight='s'>
          <img alt="card" src={require('../assets/icons/ticket.svg').default} width="30" />
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

              {tickets.map((ticket, idx) => (
                <Box justifyContent="center" alignItems='center' direction="horizontal">
                    <div onClick={() => removeTicket(idx)} style={{ cursor: 'pointer', opacity: tickets.length > 1 ? 1 : 0.2 }}>
                      <Box paddingRight='s' paddingBottom='s'>
                        <img alt="x" src={require('../assets/icons/x.svg').default} width="20" />
                      </Box>
                    </div>

                  <Box paddingRight='xs'>
                    <Input label="Ticket" value={ticket.number || ''} setValue={(newValue) => updateTicket(idx, 'number', newValue)} />
                  </Box>
                  <Input label="Description" value={ticket.description || ''} setValue={(newValue) => updateTicket(idx, 'description', newValue)} />                  
                </Box>
              ))}

            </ScrollView>

            <Box paddingTop="l">
              <Box paddingRight='s'>
                <Button onClick={() => addTicket()}>Add Ticket</Button>
              </Box>
              <Button onClick={() => setOpen(false)}>Done</Button>
            </Box>
            
          </Box>
        </MaxWidth>
      </Overlay>

    </>
  );
}