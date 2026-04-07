import { useState, type Dispatch } from 'react';
import type { GameAction, Challenge } from '../types/game';

interface Props {
  playerId: string;
  challenge: Challenge;
  dispatch: Dispatch<GameAction>;
}

export function NumericKeypad({ playerId, challenge, dispatch }: Props) {
  const [input, setInput] = useState('');

  const handleDigit = (d: number) => {
    const next = input + d;
    if (Number(next) <= 30) setInput(next);
  };

  const handleConfirm = () => {
    dispatch({ type: 'SET_SCORE', playerId, challenge, value: input === '' ? 0 : Number(input) });
  };

  const displayVal = input || '—';

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
        <div className="mx-auto mb-5 h-[3px] w-10 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />

        {/* Display */}
        <div
          className="mb-5 rounded-2xl py-4 px-6 flex items-end justify-between"
          style={{ background: 'var(--color-navy)', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <span
            className="text-5xl font-bold leading-none"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: displayVal === '—' ? 'var(--color-white-muted)' : 'var(--color-white)' }}
          >
            {displayVal}
          </span>
          <span className="text-xs pb-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-white-muted)' }}>
            pts
          </span>
        </div>

        {/* Keys */}
        <div className="grid grid-cols-3 gap-2.5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
            <button
              key={d}
              onClick={() => handleDigit(d)}
              className="rounded-2xl py-3.5 text-xl font-semibold active:scale-95 transition-all"
              style={{ background: 'var(--color-navy)', border: '1px solid rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)', color: 'var(--color-white)', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }}
            >
              {d}
            </button>
          ))}
          <button
            onClick={() => setInput(input.slice(0, -1))}
            className="rounded-2xl py-3.5 text-base active:scale-95 transition-all"
            style={{ background: 'var(--color-navy)', border: '1px solid rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)', color: 'var(--color-white-muted)' }}
          >
            ⌫
          </button>
          <button
            onClick={() => handleDigit(0)}
            className="rounded-2xl py-3.5 text-xl font-semibold active:scale-95 transition-all"
            style={{ background: 'var(--color-navy)', border: '1px solid rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)', color: 'var(--color-white)', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }}
          >
            0
          </button>
          <button
            onClick={handleConfirm}
            className="rounded-2xl py-3.5 text-sm font-black uppercase tracking-widest active:scale-95 transition-all"
            style={{ background: 'var(--banana-cream)', color: 'var(--color-navy-dark)', fontFamily: 'var(--font-mono)' }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
