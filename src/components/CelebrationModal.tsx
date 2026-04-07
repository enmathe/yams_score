import { useEffect, type Dispatch } from 'react';
import confetti from 'canvas-confetti';
import type { GameAction, GameState } from '../types/game';
import { useRandomGif } from '../hooks/useRandomGif';
import type { CelebrationType } from '../logic/celebrationGifs';

interface Props {
  type: NonNullable<GameState['celebration']>;
  dispatch: Dispatch<GameAction>;
}

const COLORS = ['#fee440', '#f15bb5', '#9b5de5', '#00f5d4', '#00bbf9'];

const CONFIG: Record<NonNullable<GameState['celebration']>, { label: string; fire: () => void }> = {
  yams: {
    label: 'Yams !',
    fire: () => {
      confetti({ particleCount: 120, spread: 70, origin: { x: 0.2, y: 0.6 }, colors: COLORS });
      confetti({ particleCount: 120, spread: 70, origin: { x: 0.8, y: 0.6 }, colors: COLORS });
    },
  },
  superYams: {
    label: 'SUPER YAMS !!!',
    fire: () => {
      const end = Date.now() + 2000;
      const frame = () => {
        confetti({ particleCount: 15, angle: 60, spread: 80, origin: { x: 0 }, colors: COLORS });
        confetti({ particleCount: 15, angle: 120, spread: 80, origin: { x: 1 }, colors: COLORS });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    },
  },
  grandeSuite: {
    label: 'Grande Suite !',
    fire: () => {
      confetti({ particleCount: 80, spread: 90, origin: { x: 0.5, y: 0.5 }, colors: COLORS });
    },
  },
  carre: {
    label: 'Carré !',
    fire: () => {
      const end = Date.now() + 800;
      const frame = () => {
        confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 }, colors: COLORS });
        confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 }, colors: COLORS });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    },
  },
  bonus: {
    label: 'Bonus +35 !',
    fire: () => {
      confetti({ particleCount: 60, spread: 70, origin: { x: 0.5, y: 0.7 }, colors: COLORS });
    },
  },
  loose: {
    label: 'Grosse Loose 💀',
    fire: () => {
      // Silence — no confetti for a fail
    },
  },
};

export function CelebrationModal({ type, dispatch }: Props) {
  const cfg = CONFIG[type];
  const { gifUrl, isLoading, error } = useRandomGif(type as CelebrationType);

  useEffect(() => {
    cfg.fire();
  }, [cfg]);

  const dismiss = () => dispatch({ type: 'DISMISS_CELEBRATION' });
  const showGif = gifUrl && !isLoading && !error;
  const isLoose = type === 'loose';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={dismiss}
    >
      <div
        className="text-center cursor-pointer px-6"
        style={{ animation: 'pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both' }}
        onClick={dismiss}
      >
        {showGif && (
          <img
            src={gifUrl}
            alt={isLoose ? 'fail' : 'celebration'}
            className="mb-4 mx-auto"
            style={{
              width: '300px',
              height: '300px',
              objectFit: 'cover',
              borderRadius: '12px',
              filter: isLoose
                ? 'drop-shadow(0 4px 24px rgba(241,91,181,0.5))'
                : 'drop-shadow(0 4px 16px rgba(0,0,0,0.3))',
            }}
          />
        )}

        <p
          className="text-lg font-semibold mb-4"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            color: isLoose ? 'var(--deep-pink)' : 'var(--banana-cream)',
          }}
        >
          {cfg.label}
        </p>

        <p className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-white-muted)' }}>
          Appuyez pour continuer
        </p>
      </div>
    </div>
  );
}
