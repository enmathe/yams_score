import { useGameState } from './hooks/useGameState';
import { CHALLENGES } from './logic/constants';
import { Header } from './components/Header';
import { ScoreTable } from './components/ScoreTable';
import { UpperSectionPicker } from './components/UpperSectionPicker';
import { NumericKeypad } from './components/NumericKeypad';
import { ValidateOrZero } from './components/ValidateOrZero';
import { CelebrationModal } from './components/CelebrationModal';

export default function App() {
  const [state, dispatch] = useGameState();
  const { activeInput, celebration } = state;

  const activeDef = activeInput
    ? CHALLENGES.find((c) => c.key === activeInput.challenge)
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
          dispatch={dispatch}
        />
      )}
      {activeInput && activeDef?.inputMode === 'keypad' && (
        <NumericKeypad
          playerId={activeInput.playerId}
          challenge={activeInput.challenge}
          dispatch={dispatch}
        />
      )}
      {activeInput && activeDef?.inputMode === 'validate' && activeDef.fixedScore != null && (
        <ValidateOrZero
          playerId={activeInput.playerId}
          challenge={activeInput.challenge}
          fixedScore={activeDef.fixedScore}
          label={activeDef.label}
          dispatch={dispatch}
        />
      )}

      {celebration && (
        <CelebrationModal type={celebration} dispatch={dispatch} />
      )}
    </div>
  );
}
