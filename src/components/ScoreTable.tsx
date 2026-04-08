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

// Matches PlayerHeader accent order
const PLAYER_ACCENTS = [
  '#FF9B9B', '#FFB347', '#FFE566', '#A8E6A3', '#93C5FD', '#C4B5FD', '#F9A8D4',
];

function getAccentByIndex(index: number) {
  return PLAYER_ACCENTS[index % PLAYER_ACCENTS.length];
}

export function ScoreTable({ state, dispatch }: Props) {
  const { players, scores, activeInput } = state;
  const upperChallenges = CHALLENGES.filter((c) => c.section === 'upper');
  const lowerChallenges = CHALLENGES.filter((c) => c.section === 'lower');

  if (players.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 px-8">
        <p
          className="text-lg font-bold uppercase tracking-[4px]"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-white)' }}
        >
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

  const sectionLabelStyle: React.CSSProperties = {
    padding: '12px 20px 4px',
    fontSize: 8,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#3D5538',
    fontFamily: 'var(--font-mono)',
    borderBottom: '0.5px solid rgba(255,255,255,0.05)',
  };

  const rowBorder = '0.5px solid rgba(255,255,255,0.04)';

  return (
    <div style={{ background: 'var(--color-navy-dark)' }}>
      {/* ── App header ── */}
      <div
        className="flex justify-between items-end px-5 pt-12 pb-5"
        style={{ borderBottom: '0.5px solid rgba(168,230,163,0.1)' }}
      >
        <div>
          <p
            className="mb-1"
            style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#3D5538', fontFamily: 'var(--font-mono)' }}
          >
            BIVOUAC · jeux de voyage
          </p>
          <h1
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--color-white)', lineHeight: 1 }}
          >
            YAMS
          </h1>
        </div>
        <button
          onClick={handleNewGame}
          className="active:scale-95 transition-transform"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9, fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            padding: '8px 14px', borderRadius: 2,
            border: '1px solid rgba(240,237,220,0.2)',
            background: 'transparent', color: 'var(--color-white-muted)',
            cursor: 'pointer',
          }}
        >
          Nouveau
        </button>
      </div>

      {/* ── Score table ── */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th
                className="sticky left-0 z-10 text-left"
                style={{ background: 'var(--color-navy-dark)', minWidth: 110, padding: '14px 20px 12px' }}
              >
                <span style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#3D5538', fontFamily: 'var(--font-mono)' }}>
                  Défi
                </span>
              </th>
              {players.map((p, i) => (
                <th key={p.id} style={{ background: 'var(--color-navy-dark)', padding: '14px 8px 12px', minWidth: 72 }}>
                  <PlayerHeader playerId={p.id} name={p.name} accent={getAccentByIndex(i)} dispatch={dispatch} />
                </th>
              ))}
              <th style={{ background: 'var(--color-navy-dark)', padding: '14px 12px 12px' }}>
                <AddPlayerButton dispatch={dispatch} playerCount={players.length} />
              </th>
            </tr>
          </thead>

          <tbody>
            {/* ── Section haute label ── */}
            <tr>
              <td colSpan={players.length + 2} style={sectionLabelStyle}>
                Section haute
              </td>
            </tr>

            {upperChallenges.map((c) => (
              <tr key={c.key}>
                <td
                  className="sticky left-0 z-10"
                  style={{ background: 'var(--color-navy-dark)', padding: '10px 20px', borderBottom: rowBorder, minWidth: 110 }}
                >
                  <DieFace value={c.faceValue as 1|2|3|4|5|6} size={20} color="rgba(255,229,102,0.5)" />
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
                <td style={{ borderBottom: rowBorder }} />
              </tr>
            ))}

            {/* ── Sous-total haut ── */}
            <tr>
              <td
                className="sticky left-0 z-10"
                style={{ background: 'var(--color-navy-dark)', padding: '8px 20px', borderTop: '0.5px solid rgba(255,255,255,0.08)', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}
              >
                <span style={{ fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#5A7055', fontFamily: 'var(--font-mono)' }}>
                  Sous-total
                </span>
              </td>
              {players.map((p) => (
                <td key={p.id} className="text-center" style={{ padding: '8px', borderTop: '0.5px solid rgba(255,255,255,0.08)', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--color-white-muted)' }}>
                    {getUpperTotal(scores[p.id])}
                  </span>
                </td>
              ))}
              <td style={{ borderTop: '0.5px solid rgba(255,255,255,0.08)', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }} />
            </tr>

            {/* ── Bonus ── */}
            <tr>
              <td
                className="sticky left-0 z-10"
                style={{ background: 'var(--color-navy-dark)', padding: '8px 20px', borderBottom: rowBorder }}
              >
                <span style={{ fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(147,197,253,0.6)', fontFamily: 'var(--font-mono)' }}>
                  Bonus ≥ 63
                </span>
              </td>
              {players.map((p) => {
                const bonus = getBonus(scores[p.id]);
                const complete = isUpperComplete(scores[p.id]);
                const remaining = Math.max(0, 63 - getUpperTotal(scores[p.id]));
                return (
                  <td key={p.id} className="text-center" style={{ padding: '8px', borderBottom: rowBorder }}>
                    {bonus > 0 ? (
                      <span
                        className="bonus-glow inline-flex items-center rounded-sm px-2 py-0.5 text-[10px] font-black"
                        style={{ background: 'var(--aquamarine)', color: 'var(--color-navy-dark)', fontFamily: 'var(--font-mono)' }}
                      >
                        +35
                      </span>
                    ) : complete ? (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-white-muted)' }}>0</span>
                    ) : (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(147,197,253,0.4)' }}>−{remaining}</span>
                    )}
                  </td>
                );
              })}
              <td style={{ borderBottom: rowBorder }} />
            </tr>

            {/* ── Section basse label ── */}
            <tr>
              <td colSpan={players.length + 2} style={sectionLabelStyle}>
                Section basse
              </td>
            </tr>

            {lowerChallenges.map((c) => {
              const meta = LOWER_META[c.key] ?? {};
              return (
                <tr key={c.key}>
                  <td
                    className="sticky left-0 z-10"
                    style={{ background: 'var(--color-navy-dark)', padding: '10px 20px', borderBottom: rowBorder, minWidth: 110 }}
                  >
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 400, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--color-white-muted)' }}>
                      {c.label}
                    </span>
                    {meta.pts && (
                      <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, color: '#3D5538', marginTop: 1 }}>
                        {meta.pts} pts
                      </span>
                    )}
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
                  <td style={{ borderBottom: rowBorder }} />
                </tr>
              );
            })}

            {/* ── Total ── */}
            <tr>
              <td
                className="sticky left-0 z-10"
                style={{ background: 'var(--color-navy-dark)', padding: '14px 20px', borderTop: '1px solid rgba(255,229,102,0.35)' }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--banana-cream)', fontWeight: 700 }}>
                  Total
                </span>
              </td>
              {players.map((p) => (
                <td
                  key={p.id}
                  className="text-center"
                  style={{ padding: '14px 8px', borderTop: '1px solid rgba(255,229,102,0.35)' }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: 'var(--color-white)' }}>
                    {getGrandTotal(scores[p.id])}
                  </span>
                </td>
              ))}
              <td style={{ borderTop: '1px solid rgba(255,229,102,0.35)' }} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
