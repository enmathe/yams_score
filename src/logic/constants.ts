import type { ChallengeDefinition, Challenge } from '../types/game';

export const UPPER_CHALLENGES: Challenge[] = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];

export const CHALLENGES: ChallengeDefinition[] = [
  { key: 'ones', label: 'As (1)', inputMode: 'multiples', faceValue: 1, section: 'upper' },
  { key: 'twos', label: '2', inputMode: 'multiples', faceValue: 2, section: 'upper' },
  { key: 'threes', label: '3', inputMode: 'multiples', faceValue: 3, section: 'upper' },
  { key: 'fours', label: '4', inputMode: 'multiples', faceValue: 4, section: 'upper' },
  { key: 'fives', label: '5', inputMode: 'multiples', faceValue: 5, section: 'upper' },
  { key: 'sixes', label: '6', inputMode: 'multiples', faceValue: 6, section: 'upper' },
  { key: 'brelan', label: 'Brelan', inputMode: 'keypad', section: 'lower' },
  { key: 'carre', label: 'Carré', inputMode: 'keypad', section: 'lower' },
  { key: 'full', label: 'Full', inputMode: 'validate', fixedScore: 25, section: 'lower' },
  { key: 'petiteSuite', label: 'Petite Suite', inputMode: 'validate', fixedScore: 30, section: 'lower' },
  { key: 'grandeSuite', label: 'Grande Suite', inputMode: 'validate', fixedScore: 40, section: 'lower' },
  { key: 'yams', label: 'Yams', inputMode: 'validate', fixedScore: 50, section: 'lower' },
  { key: 'chance', label: 'Chance', inputMode: 'keypad', section: 'lower' },
];

export const BONUS_THRESHOLD = 63;
export const BONUS_VALUE = 35;
