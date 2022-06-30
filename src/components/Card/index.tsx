import { useEffect, useState } from 'react';
import { Flip } from '../Flip';
import { Spinner } from '../Spinner';
import { Text } from '../Text';
import { CardImage, Container, EmptyCard, EmptyMessageContainer } from './styles';
import { Card as ICard } from "../../interfaces";

interface Props {
  card?: number | 'back' | 'infinite' | null;
  hidden?: boolean;
  flipped?: boolean;
  noBorder?: boolean;
  shadow?: boolean;
  size?: 'xl' | 'l' | 'm' | 's' | 'xs';
}

export const cards: ICard[] = [
  { 
    card: 1,
    title: 'Low-hanging fruit',
    description: 'When a task is so easy, it’s practically done for you.',
  },
  { 
    card: 2,
    title: 'Piece of cake',
    description: 'The task is still pretty easy.',
  },
  { 
    card: 3,
    title: 'It ain’t rocket science',
    description: 'Not as easy as eating cake, but it’s still not any kind of science. ',
  },
  { 
    card: 5,
    title: 'Ornitorrinco',
    description: 'Ornitorrinco means “platypus” in Spanish and rhymes with cinco.',
  },
  { 
    card: 8,
    title: 'An arm and a leg',
    description: 'This is when a task starts to get too big for one person to handle.',
  },
  { 
    card: 13,
    title: 'Just squeaking by',
    description: 'Almost needs to be broken down into smaller tasks.',
  },
  { 
    card: 20,
    title: 'Don’t put all your eggs in one basket',
    description: 'Seriously, start breaking this task down.',
  },
  { 
    card: 40,
    title: 'To step into an eggplant field',
    description: 'This is a Spanish idiom used when you find yourself in a pickle.',
  },
  { 
    card: 100,
    title: 'Monster task',
    description: 'See how scared that unicorn is? (It’s too big for him to handle)',
  },
];

export const Card = (props: Props) => {
  const [selectedCard, selectCard] = useState<number | 'back' | 'infinite'>(1);
  const cardPath = selectedCard ? require(`./cards/${selectedCard}.svg`).default : require(`./cards/back.svg`).default;

  useEffect(() => {
    if (props.card) {
      selectCard(props.card);
    }
  }, [props.card]);

  const isHidden = !props.hidden;

  return (
    <Container>
      <EmptyCard hide={isHidden} noBorder={props.noBorder}>

        <Flip
          side={props.flipped ? 'front' : 'back'}
          front={
            <CardImage 
              hide={!isHidden}
              src={cardPath} 
              alt='card'
              shadow={props.shadow}
              size={props.size || 'l'}
            />
          }
          back={
            <CardImage 
              hide={!isHidden}
              src={require(`./cards/back.svg`).default} 
              alt='card'
              shadow={props.shadow}
              size={props.size || 'l'}
            />
          }
        />

        <EmptyMessageContainer hide={isHidden}>
          <Spinner>
            <img alt="card" src={require('../../assets/icons/picking.svg').default} width="25" />
          </Spinner>
          <Text size="s" color="secondary" fontWeight={600}>
            Picking
          </Text>
        </EmptyMessageContainer>


      </EmptyCard>
    </Container>
  );
}
