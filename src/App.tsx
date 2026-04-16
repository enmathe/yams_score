import { useGameState } from './hooks/useGameState';
import { CHALLENGES } from './logic/constants';
import { ScoreTable } from './components/ScoreTable';
import { UpperSectionPicker } from './components/UpperSectionPicker';
import { NumericKeypad } from './components/NumericKeypad';
import { ValidateOrZero } from './components/ValidateOrZero';
import { CelebrationModal } from './components/CelebrationModal';

export default function App() {
  const [state, dispatch] = useGameState();
  const { activeInput, celebration, players, scores } = state;

  const activeDef = activeInput
    ? CHALLENGES.find((c) => c.key === activeInput.challenge)
    : null;
  const activePlayer = activeInput
    ? players.find((player) => player.id === activeInput.playerId) ?? null
    : null;
  const activeValue = activeInput
    ? scores[activeInput.playerId]?.[activeInput.challenge] ?? null
    : null;

  return (
    <div>
      <main className="mx-auto max-w-2xl overflow-x-auto">
        <ScoreTable state={state} dispatch={dispatch} />
      </main>

      {activeInput && activeDef?.inputMode === 'multiples' && activeDef.faceValue && (
        <UpperSectionPicker
          playerId={activeInput.playerId}
          challenge={activeInput.challenge}
          faceValue={activeDef.faceValue}
          challengeLabel={activeDef.label}
          playerName={activePlayer?.name ?? ''}
          currentValue={activeValue}
          dispatch={dispatch}
        />
      )}
      {activeInput && activeDef?.inputMode === 'keypad' && (
        <NumericKeypad
          playerId={activeInput.playerId}
          challenge={activeInput.challenge}
          challengeLabel={activeDef.label}
          playerName={activePlayer?.name ?? ''}
          currentValue={activeValue}
          dispatch={dispatch}
        />
      )}
      {activeInput && activeDef?.inputMode === 'validate' && activeDef.fixedScore != null && (
        <ValidateOrZero
          playerId={activeInput.playerId}
          challenge={activeInput.challenge}
          fixedScore={activeDef.fixedScore}
          label={activeDef.label}
          playerName={activePlayer?.name ?? ''}
          currentValue={activeValue}
          dispatch={dispatch}
        />
      )}

      {celebration && (
        <CelebrationModal type={celebration} dispatch={dispatch} />
      )}
    </div>
  );
}
