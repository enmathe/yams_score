export type UpperChallenge = 'ones' | 'twos' | 'threes' | 'fours' | 'fives' | 'sixes';
export type LowerChallenge = 'brelan' | 'carre' | 'full' | 'petiteSuite' | 'grandeSuite' | 'yams' | 'superYams' | 'chance';
export type Challenge = UpperChallenge | LowerChallenge;

export type InputMode = 'multiples' | 'keypad' | 'validate';

export interface ChallengeDefinition {
  key: Challenge;
  label: string;
  inputMode: InputMode;
  faceValue?: number;
  fixedScore?: number;
  section: 'upper' | 'lower';
}

export interface Player {
  id: string;
  name: string;
}

export type ScoreMap = Record<string, Record<Challenge, number | null>>;

export interface ActiveInput {
  playerId: string;
  challenge: Challenge;
}

export interface GameState {
  players: Player[];
  scores: ScoreMap;
  activeInput: ActiveInput | null;
  celebration: 'yams' | 'superYams' | 'bonus' | 'grandeSuite' | 'carre' | 'loose' | null;
}

export type GameAction =
  | { type: 'ADD_PLAYER'; name: string }
  | { type: 'REMOVE_PLAYER'; playerId: string }
  | { type: 'RENAME_PLAYER'; playerId: string; name: string }
  | { type: 'SET_SCORE'; playerId: string; challenge: Challenge; value: number }
  | { type: 'OPEN_INPUT'; playerId: string; challenge: Challenge }
  | { type: 'CLOSE_INPUT' }
  | { type: 'DISMISS_CELEBRATION' }
  | { type: 'NEW_GAME' };
