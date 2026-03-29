import type { Dispatch } from 'react';
import type { GameAction, Challenge } from '../types/game';

interface Props {
  playerId: string;
  challenge: Challenge;
  fixedScore: number;
  label: string;
  dispatch: Dispatch<GameAction>;
}

const META: Record<string, { symbol: string; sub: string }> = {
  Full: { symbol: '⊟', sub: 'Brelan + paire' },
  'Petite Suite': { symbol: '▲', sub: '4 dés consécutifs' },
  'Grande Suite': { symbol: '▲▲', sub: '5 dés consécutifs' },
  Yams: { symbol: '★', sub: '5 dés identiques' },
};

export function ValidateOrZero({ playerId, challenge, fixedScore, label, dispatch }: Props) {
  const meta = META[label] ?? { symbol: '·', sub: '' };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }}
      onClick={() => dispatch({ type: 'CLOSE_INPUT' })}
    >
      <div
        className="w-full max-w-md rounded-t-3xl px-6 pb-10 pt-5 shadow-2xl"
        style={{ background: 'var(--color-navy-light)', borderTop: '1.5px solid var(--color-accent-gold)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="mx-auto mb-6 h-[3px] w-10 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />

        {/* Title */}
        <div className="mb-6 flex items-baseline gap-4">
          <span
            className="text-3xl leading-none w-10 text-center"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-gold)' }}
          >
            {meta.symbol}
          </span>
          <div>
            <p className="text-xl font-semibold leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-white)' }}>
              {label}
            </p>
            <p className="text-xs mt-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-white-muted)' }}>
              {meta.sub} · {fixedScore} pts
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => dispatch({ type: 'SET_SCORE', playerId, challenge, value: 0 })}
            className="flex-1 rounded-2xl py-4 text-sm font-semibold uppercase tracking-widest active:scale-95 transition-all"
            style={{
              fontFamily: 'var(--font-mono)',
              background: 'transparent',
              border: '1.5px solid rgba(255,255,255,0.2)',
              color: 'var(--color-white-muted)',
            }}
          >
            Raté
          </button>
          <button
            onClick={() => dispatch({ type: 'SET_SCORE', playerId, challenge, value: fixedScore })}
            className="flex-[2] rounded-2xl py-4 text-sm font-black uppercase tracking-widest active:scale-95 transition-all"
            style={{
              fontFamily: 'var(--font-mono)',
              background: 'var(--color-cream)',
              color: 'var(--color-navy-dark)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
            }}
          >
            Réussi · {fixedScore} pts
          </button>
        </div>
      </div>
    </div>
  );
}
