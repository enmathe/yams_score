import { useReducer, useEffect } from 'react';
import type { GameState, GameAction, Challenge } from '../types/game';
import { CHALLENGES, UPPER_CHALLENGES, BONUS_THRESHOLD } from '../logic/constants';

const STORAGE_KEY = 'yams-game-state';

function createEmptyScores(): Record<Challenge, number | null> {
  const scores = {} as Record<Challenge, number | null>;
  for (const c of CHALLENGES) {
    scores[c.key] = null;
  }
  return scores;
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function getUpperTotal(scores: Record<Challenge, number | null>): number {
  return UPPER_CHALLENGES.reduce((sum, key) => sum + (scores[key] ?? 0), 0);
}

function hadBonusBefore(scores: Record<Challenge, number | null>): boolean {
  return getUpperTotal(scores) >= BONUS_THRESHOLD;
}

const DEFAULT_STATE: GameState = {
  players: [],
  scores: {},
  activeInput: null,
  celebration: null,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ADD_PLAYER': {
      const id = generateId();
      return {
        ...state,
        players: [...state.players, { id, name: action.name }],
        scores: { ...state.scores, [id]: createEmptyScores() },
      };
    }
    case 'REMOVE_PLAYER': {
      const newScores = { ...state.scores };
      delete newScores[action.playerId];
      return {
        ...state,
        players: state.players.filter((p) => p.id !== action.playerId),
        scores: newScores,
      };
    }
    case 'RENAME_PLAYER': {
      return {
        ...state,
        players: state.players.map((p) =>
          p.id === action.playerId ? { ...p, name: action.name } : p
        ),
      };
    }
    case 'SET_SCORE': {
      const playerScores = { ...state.scores[action.playerId] };
      const prevScores = state.scores[action.playerId];
      playerScores[action.challenge] = action.value;

      let celebration: GameState['celebration'] = null;

      // Check for Yams celebration
      if (action.challenge === 'yams' && action.value === 50) {
        celebration = 'yams';
      }

      // Check for Grande Suite
      if (!celebration && action.challenge === 'grandeSuite' && action.value === 40) {
        celebration = 'grandeSuite';
      }

      // Check for Carré de 5 (4×5=20) ou Carré de 6 (4×6=24)
      if (!celebration && action.challenge === 'carre' && (action.value === 20 || action.value === 24)) {
        celebration = 'carre';
      }

      // Check for bonus unlock (only trigger once, when crossing the threshold)
      if (!celebration && !hadBonusBefore(prevScores)) {
        const newUpperTotal = getUpperTotal(playerScores);
        if (newUpperTotal >= BONUS_THRESHOLD) {
          celebration = 'bonus';
        }
      }

      return {
        ...state,
        scores: { ...state.scores, [action.playerId]: playerScores },
        activeInput: null,
        celebration,
      };
    }
    case 'OPEN_INPUT': {
      return {
        ...state,
        activeInput: { playerId: action.playerId, challenge: action.challenge },
      };
    }
    case 'CLOSE_INPUT': {
      return { ...state, activeInput: null };
    }
    case 'DISMISS_CELEBRATION': {
      return { ...state, celebration: null };
    }
    case 'NEW_GAME': {
      const newScores = { ...state.scores };
      for (const playerId in newScores) {
        newScores[playerId] = createEmptyScores();
      }
      return { ...state, scores: newScores, activeInput: null, celebration: null };
    }
    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, DEFAULT_STATE, () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as GameState;
        // Restore without transient UI state
        return { ...parsed, activeInput: null, celebration: null };
      }
    } catch {
      // ignore
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return [state, dispatch] as const;
}
