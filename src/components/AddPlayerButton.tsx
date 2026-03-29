import type { Dispatch } from 'react';
import type { GameAction } from '../types/game';

export function AddPlayerButton({ dispatch, playerCount }: { dispatch: Dispatch<GameAction>; playerCount: number }) {
  return (
    <button
      onClick={() => dispatch({ type: 'ADD_PLAYER', name: `Joueur ${playerCount + 1}` })}
      className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold active:scale-95 transition-transform"
      style={{
        fontFamily: 'var(--font-mono)',
        border: '1.5px dashed var(--color-stone)',
        color: 'var(--color-ink-light)',
        background: 'transparent',
      }}
      title="Ajouter un joueur"
    >
      +
    </button>
  );
}
