import React, { useEffect, useState } from 'react';
import { Box } from '../components/Box';
import { MaxWidth } from '../components/MaxWidth';
import { Overlay } from '../components/Overlay';
import { Text } from '../components/Text';
import { useGame } from '../hooks/useGame';
import { Button } from '../components/Button';
import styled from 'styled-components';
import { Input } from '../components/Input';
import { IconButton } from '../components/IconButton';

const ScrollView = styled.div`
  height: 350px;
  overflow-y: auto;
`

interface Props {
  onDone?: () => void;
}

export function TicketCreateButtonAndView(props: Props) {

  const { game, addTicket, removeTicket, updateTicket } = useGame();

  const [open, setOpen] = useState(false);

  const tickets = game?.tickets || []

  useEffect(() => {
    if (!tickets.length) {
      addTicket()
    }
  }, [open, tickets]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>

      <IconButton label="Tickets" onClick={() => setOpen(!open)}>
        <img alt="" src={require('../assets/icons/ticket.svg').default} width="30" />
      </IconButton>

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
              <Button onClick={() => {
                setOpen(false);
                window.requestAnimationFrame(() => props.onDone?.());
              }}>Done</Button>
            </Box>
            
          </Box>
        </MaxWidth>
      </Overlay>

    </>
  );
}
