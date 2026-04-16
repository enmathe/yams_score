import { useRef, type Dispatch } from 'react';
import type { GameAction, Challenge } from '../types/game';

interface Props {
  playerId: string;
  challenge: Challenge;
  value: number | null;
  isActive: boolean;
  dispatch: Dispatch<GameAction>;
}

export function ScoreCell({ playerId, challenge, value, isActive, dispatch }: Props) {
  const cellRef = useRef<HTMLTableCellElement>(null);

  const handleClick = () => {
    dispatch({ type: 'OPEN_INPUT', playerId, challenge });
  };

  if (value !== null) {
    const isZero = value === 0;
    return (
      <td
        ref={cellRef}
        onClick={handleClick}
        className="px-2 py-2 text-center border-b cursor-pointer transition-colors"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        {isZero ? (
          <span
            className="scratch-appear inline-block text-lg leading-none"
            style={{ color: 'var(--deep-pink)', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300 }}
          >
            —
          </span>
        ) : (
          <span
            className="ink-appear inline-block text-base font-semibold leading-none"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-white)' }}
          >
            {value}
          </span>
        )}
      </td>
    );
  }

  return (
    <td
      ref={cellRef}
      onClick={handleClick}
      className="px-2 py-2 text-center border-b cursor-pointer transition-colors"
      style={{
        borderColor: 'rgba(255,255,255,0.08)',
        background: isActive ? 'rgba(168,230,163,0.10)' : 'transparent',
      }}
    >
      <span
        className="inline-block rounded border border-dashed w-8 h-6 leading-6 text-xs transition-colors"
        style={{
          borderColor: isActive ? 'var(--aquamarine)' : 'rgba(240,237,220,0.1)',
          color: isActive ? 'var(--aquamarine)' : 'transparent',
        }}
      >
        ·
      </span>
    </td>
  );
}
