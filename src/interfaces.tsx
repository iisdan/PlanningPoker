export interface Player {
  id: string,
  name: string,
  role: string,
  profileImage: string,
  selectedCard: number | null,
}

export interface Game {
  code: string;
  date: string;
  players: { [id: string]: Player },
  phase: 'pre-game' | 'selecting' | 'reviewing',
  disabledCards?: { [cardId: string]: boolean; };
  tickets?: Ticket[];
}

export interface Card {
  card: number;
  title: string;
  description: string;
}

export interface Ticket {
  number: string;
  description: string;
}