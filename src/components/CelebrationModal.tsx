import { useEffect, type Dispatch } from 'react';
import confetti from 'canvas-confetti';
import type { GameAction, GameState } from '../types/game';
import { useRandomGif } from '../hooks/useRandomGif';
import type { CelebrationType } from '../logic/celebrationGifs';

interface Props {
  type: NonNullable<GameState['celebration']>;
  dispatch: Dispatch<GameAction>;
}

const CONFIG = {
  yams: {
    label: 'Yams !',
    emoji: '⭐',
    color: '#D4A574',
    fire: () => {
      // Deux cannons latéraux de confettis dorés
      confetti({ particleCount: 120, spread: 70, origin: { x: 0.2, y: 0.6 }, colors: ['#D4A574', '#E8D5B7', '#F5DEB3', '#FFD700'] });
      confetti({ particleCount: 120, spread: 70, origin: { x: 0.8, y: 0.6 }, colors: ['#D4A574', '#E8D5B7', '#F5DEB3', '#FFD700'] });
    },
  },
  grandeSuite: {
    label: 'Grande Suite !',
    emoji: '🎊',
    color: '#5FA3C0',
    fire: () => {
      confetti({ particleCount: 80, spread: 90, origin: { x: 0.5, y: 0.5 }, colors: ['#5FA3C0', '#7AAED4', '#B3D9E8', '#ffffff'] });
    },
  },
  carre: {
    label: 'Carré !',
    emoji: '🎲',
    color: '#6BB386',
    fire: () => {
      // Rafale rapide style dés
      const end = Date.now() + 800;
      const frame = () => {
        confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#6BB386', '#8AC6A3', '#A8D9B8'] });
        confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#6BB386', '#8AC6A3', '#A8D9B8'] });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    },
  },
  bonus: {
    label: 'Bonus +35 !',
    emoji: '🏅',
    color: '#5FA3C0',
    fire: () => {
      confetti({ particleCount: 60, spread: 70, origin: { x: 0.5, y: 0.7 }, colors: ['#5FA3C0', '#7AAED4', '#B3D9E8', '#ffffff'] });
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

  // Show GIF if available, fallback to emoji if loading, error, or no GIF
  const showGif = gifUrl && !isLoading && !error;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={dismiss}
    >
      <div
        className="text-center cursor-pointer"
        style={{ animation: 'pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both' }}
        onClick={dismiss}
      >
        {/* GIF or Emoji fallback */}
        {showGif ? (
          <img
            src={gifUrl}
            alt="celebration"
            className="mb-4 mx-auto"
            style={{
              width: '350px',
              height: '350px',
              objectFit: 'cover',
              borderRadius: '12px',
              filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.3))',
            }}
          />
        ) : (
          <div
            className="text-8xl mb-4 leading-none"
            style={{
              filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.3))',
              animation: 'bounce-emoji 0.5s ease infinite alternate',
            }}
          >
            {cfg.emoji}
          </div>
        )}

        <p className="mt-3 text-xs text-white/40" style={{ fontFamily: 'var(--font-mono)' }}>
          Appuyez pour continuer
        </p>
      </div>
    </div>
  );
}
