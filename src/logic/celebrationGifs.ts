export type CelebrationType = 'yams' | 'bonus' | 'grandeSuite' | 'carre';

export const celebrationGifSearchTerms: Record<CelebrationType, string[]> = {
  yams: ['celebration victory', 'party confetti', 'winning celebration', 'jackpot', 'perfect roll'],
  bonus: ['bonus unlocked', 'achievement unlocked', 'reward celebration', 'bonus points', 'score boost'],
  grandeSuite: ['straight flush winning', 'five in a row', 'perfect sequence', 'winning streak', 'consecutive wins'],
  carre: ['four of a kind', 'lucky roll', 'lucky dice', 'four matching', 'jackpot dice'],
};

/**
 * Get random search term for a celebration type
 */
export const getRandomSearchTerm = (type: CelebrationType): string => {
  const terms = celebrationGifSearchTerms[type];
  return terms[Math.floor(Math.random() * terms.length)];
};
