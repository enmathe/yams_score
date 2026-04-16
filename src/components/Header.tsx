import type { Dispatch } from 'react';
import type { GameAction } from '../types/game';

export function Header({ dispatch }: { dispatch: Dispatch<GameAction> }) {
  const handleNewGame = () => {
    if (window.confirm('Commencer une nouvelle partie ?')) {
      dispatch({ type: 'NEW_GAME' });
    }
  };

  return (
    <header className="px-6 pt-14 pb-6 flex items-end justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] mb-1" style={{ color: '#3D5538', fontFamily: 'var(--font-mono)' }}>
          BIVOUAC · jeux de voyage
        </p>
        <h1
          className="text-3xl leading-tight"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-white)', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase' }}
        >
          YAMS
        </h1>
      </div>
      <button
        onClick={handleNewGame}
        className="text-[10px] font-semibold uppercase tracking-widest px-4 py-2 rounded-full border transition-all active:scale-95"
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-navy-dark)',
          borderColor: 'var(--color-white)',
          background: 'var(--color-white)',
        }}
      >
        Nouveau
      </button>
    </header>
  );
}
