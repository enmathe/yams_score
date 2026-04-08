import { useState, type Dispatch } from 'react';
import type { GameAction } from '../types/game';

interface Props {
  playerId: string;
  name: string;
  accent: string;
  dispatch: Dispatch<GameAction>;
}

export function PlayerHeader({ playerId, name, accent, dispatch }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(name);

  const save = () => {
    const trimmed = value.trim();
    dispatch({ type: 'RENAME_PLAYER', playerId, name: trimmed || name });
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => e.key === 'Enter' && save()}
        className="w-full min-w-0 rounded border-0 px-1 py-0.5 text-center text-[9px] font-semibold outline-none"
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-white)',
          background: 'var(--color-navy-light)',
          boxShadow: `0 0 0 1px ${accent}`,
          letterSpacing: '0.08em',
        }}
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        style={{ width: 6, height: 6, borderRadius: '50%', background: accent, flexShrink: 0 }}
      />
      <div className="flex items-center gap-0.5">
        <span
          onClick={() => { setValue(name); setEditing(true); }}
          className="cursor-pointer truncate max-w-[60px]"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-white-muted)',
          }}
        >
          {name}
        </span>
        <button
          onClick={() => {
            if (window.confirm(`Supprimer ${name} ?`))
              dispatch({ type: 'REMOVE_PLAYER', playerId });
          }}
          style={{ fontSize: 7, color: 'rgba(255,255,255,0.2)', lineHeight: 1 }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
