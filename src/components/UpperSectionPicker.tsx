import type { Dispatch } from 'react';
import type { GameAction, Challenge } from '../types/game';
import { getMultiplesOptions } from '../logic/scoring';
import { DieFace } from './DieFace';

interface Props {
  playerId: string;
  challenge: Challenge;
  faceValue: number;
  dispatch: Dispatch<GameAction>;
}

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
        style={{ background: 'var(--color-navy-light)', borderTop: '1.5px solid var(--lavender-purple)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="mx-auto mb-5 h-[3px] w-10 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />

        {/* Title */}
        <div className="mb-6 flex items-center gap-4">
          <DieFace value={faceValue as 1|2|3|4|5|6} size={52} color="var(--banana-cream)" />
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
        <div className="grid grid-cols-3 gap-2.5">
          {options.map((val, i) => (
            <button
              key={val}
              onClick={() => dispatch({ type: 'SET_SCORE', playerId, challenge, value: val })}
              className="flex flex-col items-center justify-center rounded-2xl py-3 active:scale-95 transition-all"
              style={val === 0
                ? {
                    background: 'var(--color-navy)',
                    border: '1px solid rgba(241,91,181,0.4)',
                    color: 'var(--deep-pink)',
                  }
                : {
                    background: 'var(--color-navy)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }
              }
            >
              <span
                className="text-lg font-bold leading-none"
                style={{ fontFamily: 'var(--font-mono)', color: val === 0 ? 'var(--deep-pink)' : 'var(--color-white)' }}
              >
                {val}
              </span>
              {val > 0 && (
                <div className="flex gap-0.5 mt-1.5 flex-wrap justify-center" style={{ maxWidth: 48 }}>
                  {Array.from({ length: i }).map((_, j) => (
                    <DieFace key={j} value={faceValue as 1|2|3|4|5|6} size={12} color="var(--banana-cream)" />
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
