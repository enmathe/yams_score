import type { Dispatch } from 'react';
import type { GameAction, Challenge } from '../types/game';
import { getMultiplesOptions } from '../logic/scoring';

interface Props {
  playerId: string;
  challenge: Challenge;
  faceValue: number;
  dispatch: Dispatch<GameAction>;
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

export function UpperSectionPicker({ playerId, challenge, faceValue, dispatch }: Props) {
  const options = getMultiplesOptions(faceValue);

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

        {/* Title */}
        <div className="mb-6 flex items-baseline gap-3">
          <span
            className="text-4xl leading-none"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--color-accent-gold)', fontWeight: 400 }}
          >
            {ROMAN[faceValue - 1]}
          </span>
          <div>
            <p className="text-base font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-white)' }}>
              Combien de {faceValue} ?
            </p>
            <p className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-white-muted)' }}>
              Sélectionner votre score
            </p>
          </div>
        </div>

        {/* Grid of options */}
        <div className="grid grid-cols-4 gap-2.5">
          {options.map((val, i) => (
            <button
              key={val}
              onClick={() => dispatch({ type: 'SET_SCORE', playerId, challenge, value: val })}
              className="flex flex-col items-center justify-center rounded-2xl py-3.5 active:scale-95 transition-all"
              style={val === 0
                ? {
                    background: 'var(--color-navy)',
                    border: '1px solid var(--color-cream-dark)',
                    color: 'var(--color-cream)',
                  }
                : {
                    background: 'var(--color-navy)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }
              }
            >
              <span
                className="text-lg font-bold leading-none"
                style={{ fontFamily: 'var(--font-mono)', color: val === 0 ? 'var(--color-cream)' : 'var(--color-white)' }}
              >
                {val}
              </span>
              {val > 0 && (
                <span
                  className="text-[9px] mt-1"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-white-muted)' }}
                >
                  {i}×{faceValue}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
