import { useState, type Dispatch } from 'react';
import type { GameAction } from '../types/game';

interface Props {
  playerId: string;
  name: string;
  dispatch: Dispatch<GameAction>;
}

const PLAYER_ACCENTS: string[] = [
  '#5FA3C0', '#D4A574', '#6BB386', '#C49A8A', '#7AAED4', '#D4B888',
];
const playerColorMap = new Map<string, number>();
let nextIndex = 0;
function getAccent(id: string): string {
  if (!playerColorMap.has(id)) { playerColorMap.set(id, nextIndex++ % PLAYER_ACCENTS.length); }
  return PLAYER_ACCENTS[playerColorMap.get(id)!];
}

export function PlayerHeader({ playerId, name, dispatch }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(name);
  const accent = getAccent(playerId);

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
        className="w-full min-w-0 rounded border-0 px-1 py-0.5 text-center text-xs font-semibold outline-none"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-white)', background: 'var(--color-navy-light)', boxShadow: `0 0 0 1px ${accent}` }}
      />
    );
  }

  const initials = name.slice(0, 2).toUpperCase();

  return (
    <div className="flex flex-col items-center gap-0.5 py-1">
      <div
        onClick={() => { setValue(name); setEditing(true); }}
        className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white cursor-pointer active:scale-95 transition-transform"
        style={{ background: accent, fontFamily: 'var(--font-mono)' }}
      >
        {initials}
      </div>
      <div className="flex items-center gap-0.5">
        <span
          onClick={() => { setValue(name); setEditing(true); }}
          className="cursor-pointer text-[10px] font-semibold truncate max-w-[60px]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-white-muted)' }}
        >
          {name}
        </span>
        <button
          onClick={() => { if (window.confirm(`Supprimer ${name} ?`)) dispatch({ type: 'REMOVE_PLAYER', playerId }); }}
          className="text-[8px] shrink-0"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
