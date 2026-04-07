import type { Dispatch } from 'react';
import type { GameState, GameAction } from '../types/game';
import { CHALLENGES } from '../logic/constants';
import { getUpperTotal, getBonus, getLowerTotal, getGrandTotal, isUpperComplete } from '../logic/scoring';
import { ScoreCell } from './ScoreCell';
import { PlayerHeader } from './PlayerHeader';
import { AddPlayerButton } from './AddPlayerButton';
import { DieFace } from './DieFace';

interface Props {
  state: GameState;
  dispatch: Dispatch<GameAction>;
}

const LOWER_META: Record<string, { pts?: number }> = {
  brelan: {},
  carre: {},
  full: { pts: 25 },
  petiteSuite: { pts: 30 },
  grandeSuite: { pts: 40 },
  yams: { pts: 50 },
  superYams: { pts: 100 },
  chance: {},
};

export function ScoreTable({ state, dispatch }: Props) {
  const { players, scores, activeInput } = state;
  const upperChallenges = CHALLENGES.filter((c) => c.section === 'upper');
  const lowerChallenges = CHALLENGES.filter((c) => c.section === 'lower');

  if (players.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 px-8">
        <p className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--color-white)' }}>
          Prêt à jouer ?
        </p>
        <p className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-white-muted)' }}>
          Ajoutez des joueurs pour commencer
        </p>
        <AddPlayerButton dispatch={dispatch} playerCount={0} />
      </div>
    );
  }

  const handleNewGame = () => {
    if (window.confirm('Commencer une nouvelle partie ?')) {
      dispatch({ type: 'NEW_GAME' });
    }
  };

  return (
    <div
      style={{
        background: 'rgba(20, 17, 43, 0.95)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
      }}
    >
      <table className="w-full border-collapse">
        <thead>
          {/* Top bar: title + nouveau */}
          <tr style={{ background: 'var(--color-navy-light)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <th
              className="sticky left-0 z-10 px-3 py-2 text-left"
              style={{ background: 'var(--color-navy-light)' }}
            >
              <span
                className="text-base"
                style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--color-white)', fontWeight: 600 }}
              >
                Yams
              </span>
            </th>
            <th colSpan={players.length} style={{ background: 'var(--color-navy-light)' }} />
            <th className="px-3 py-2 text-right" style={{ background: 'var(--color-navy-light)' }}>
              <button
                onClick={handleNewGame}
                className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border active:scale-95 transition-transform"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-navy-dark)', borderColor: 'var(--banana-cream)', background: 'var(--banana-cream)' }}
              >
                Nouveau
              </button>
            </th>
          </tr>

          {/* Player headers */}
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <th
              className="sticky left-0 z-10 px-3 py-1.5 text-left"
              style={{ background: 'var(--color-navy-light)', minWidth: 100 }}
            >
              <span className="text-[9px] uppercase tracking-[0.15em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-white-muted)' }}>
                Défi
              </span>
            </th>
            {players.map((p) => (
              <th key={p.id} className="px-2 py-1 min-w-[72px]" style={{ background: 'var(--color-navy-light)' }}>
                <PlayerHeader playerId={p.id} name={p.name} dispatch={dispatch} />
              </th>
            ))}
            <th className="px-2 py-1.5" style={{ background: 'var(--color-navy-light)' }}>
              <AddPlayerButton dispatch={dispatch} playerCount={players.length} />
            </th>
          </tr>
        </thead>

        <tbody>
          {upperChallenges.map((c, i) => (
            <tr key={c.key} style={{ background: i % 2 === 0 ? 'var(--color-navy)' : 'var(--color-navy-light)' }}>
              <td
                className="sticky left-0 z-10 px-3 py-1.5"
                style={{ background: 'inherit', minWidth: 100, borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="flex items-center gap-2">
                  <DieFace value={c.faceValue as 1|2|3|4|5|6} size={22} color="var(--banana-cream)" />
                </div>
              </td>
              {players.map((p) => (
                <ScoreCell
                  key={p.id}
                  playerId={p.id}
                  challenge={c.key}
                  value={scores[p.id]?.[c.key] ?? null}
                  isActive={activeInput?.playerId === p.id && activeInput?.challenge === c.key}
                  dispatch={dispatch}
                />
              ))}
              <td style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }} />
            </tr>
          ))}

          {/* Sous-total haut */}
          <tr style={{ background: 'var(--color-blue-gray)' }}>
            <td className="sticky left-0 z-10 px-3 py-1.5" style={{ background: 'var(--color-blue-gray)', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
              <span className="text-[9px] uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-white)' }}>
                Sous-total
              </span>
            </td>
            {players.map((p) => (
              <td key={p.id} className="px-2 py-1.5 text-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                <span className="text-xs font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-white)' }}>
                  {getUpperTotal(scores[p.id])}
                </span>
              </td>
            ))}
            <td style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }} />
          </tr>

          {/* Bonus */}
          <tr style={{ background: 'var(--color-navy)' }}>
            <td
              className="sticky left-0 z-10 px-3 py-1.5"
              style={{ background: 'var(--color-navy)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
              <span className="text-[9px] uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)', color: 'var(--deep-sky-blue)' }}>
                Bonus <span style={{ color: 'var(--color-white-muted)' }}>≥63</span>
              </span>
            </td>
            {players.map((p) => {
              const bonus = getBonus(scores[p.id]);
              const complete = isUpperComplete(scores[p.id]);
              const remaining = Math.max(0, 63 - getUpperTotal(scores[p.id]));
              return (
                <td key={p.id} className="px-2 py-1.5 text-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  {bonus > 0 ? (
                    <span className="bonus-glow inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-black" style={{ background: 'var(--aquamarine)', color: 'var(--color-navy-dark)', fontFamily: 'var(--font-mono)' }}>
                      +35
                    </span>
                  ) : complete ? (
                    <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-white-muted)' }}>0</span>
                  ) : (
                    <span className="text-[10px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--deep-sky-blue)' }}>−{remaining}</span>
                  )}
                </td>
              );
            })}
            <td style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }} />
          </tr>

          {lowerChallenges.map((c, i) => {
            const meta = LOWER_META[c.key] ?? {};
            return (
              <tr key={c.key} style={{ background: i % 2 === 0 ? 'var(--color-navy)' : 'var(--color-navy-light)' }}>
                <td
                  className="sticky left-0 z-10 px-3 py-1.5"
                  style={{ background: 'inherit', minWidth: 100, borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-white)' }}>
                      {c.label}
                    </span>
                    {meta.pts && (
                      <span className="text-[9px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-white-muted)' }}>
                        {meta.pts}
                      </span>
                    )}
                  </div>
                </td>
                {players.map((p) => (
                  <ScoreCell
                    key={p.id}
                    playerId={p.id}
                    challenge={c.key}
                    value={scores[p.id]?.[c.key] ?? null}
                    isActive={activeInput?.playerId === p.id && activeInput?.challenge === c.key}
                    dispatch={dispatch}
                  />
                ))}
                <td style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }} />
              </tr>
            );
          })}

          {/* Sous-total bas */}
          <tr style={{ background: 'var(--color-blue-gray)' }}>
            <td className="sticky left-0 z-10 px-3 py-1.5" style={{ background: 'var(--color-blue-gray)', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
              <span className="text-[9px] uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-white)' }}>
                Sous-total
              </span>
            </td>
            {players.map((p) => (
              <td key={p.id} className="px-2 py-1.5 text-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                <span className="text-xs font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-white)' }}>
                  {getLowerTotal(scores[p.id])}
                </span>
              </td>
            ))}
            <td style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }} />
          </tr>

          {/* Grand Total */}
          <tr style={{ background: 'var(--color-blue-gray)' }}>
            <td
              className="sticky left-0 z-10 px-3 py-3"
              style={{ background: 'var(--color-blue-gray)', borderTop: '1.5px solid var(--banana-cream)' }}
            >
              <span className="text-xs font-black uppercase tracking-[0.18em] text-white" style={{ fontFamily: 'var(--font-mono)' }}>
                Total
              </span>
            </td>
            {players.map((p) => (
              <td
                key={p.id}
                className="px-2 py-3 text-center"
                style={{ background: 'var(--color-blue-gray)', borderTop: '1.5px solid var(--banana-cream)' }}
              >
                <span className="text-lg font-black text-white" style={{ fontFamily: 'var(--font-mono)' }}>
                  {getGrandTotal(scores[p.id])}
                </span>
              </td>
            ))}
            <td style={{ background: 'var(--color-blue-gray)', borderTop: '1.5px solid var(--banana-cream)' }} />
          </tr>
        </tbody>
      </table>
    </div>
  );
}
