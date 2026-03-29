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
        <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-1" style={{ color: 'var(--color-ink-light)', fontFamily: 'var(--font-mono)' }}>
          Summer · 2025
        </p>
        <h1
          className="text-3xl leading-tight"
          style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--color-ink)', fontWeight: 600 }}
        >
          Yams Score
        </h1>
      </div>
      <button
        onClick={handleNewGame}
        className="text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full border transition-all active:scale-95"
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-ink-mid)',
          borderColor: 'var(--color-stone)',
          background: 'rgba(255,255,255,0.6)',
        }}
      >
        Nouveau
      </button>
    </header>
  );
}
