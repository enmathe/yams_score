export type CelebrationType = 'yams' | 'superYams' | 'bonus' | 'grandeSuite' | 'carre' | 'loose';

export const celebrationGifSearchTerms: Record<CelebrationType, string[]> = {
  yams: ['celebration victory', 'party confetti', 'winning celebration', 'jackpot', 'perfect roll'],
  superYams: ['epic win', 'legendary', 'goat greatest of all time', 'insane victory', 'unbelievable win'],
  bonus: ['bonus unlocked', 'achievement unlocked', 'reward celebration', 'bonus points', 'score boost'],
  grandeSuite: ['straight flush winning', 'five in a row', 'perfect sequence', 'winning streak', 'consecutive wins'],
  carre: ['four of a kind', 'lucky roll', 'lucky dice', 'four matching', 'jackpot dice'],
  loose: ['epic fail', 'big L loser', 'fail meme', 'take the L', 'disaster fail'],
};

export const getRandomSearchTerm = (type: CelebrationType): string => {
  const terms = celebrationGifSearchTerms[type];
  return terms[Math.floor(Math.random() * terms.length)];
};
