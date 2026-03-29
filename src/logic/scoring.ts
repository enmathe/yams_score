import type { Challenge } from '../types/game';
import { UPPER_CHALLENGES, BONUS_THRESHOLD, BONUS_VALUE } from './constants';

export function getUpperTotal(scores: Record<Challenge, number | null>): number {
  return UPPER_CHALLENGES.reduce((sum, key) => sum + (scores[key] ?? 0), 0);
}

export function hasBonus(scores: Record<Challenge, number | null>): boolean {
  return getUpperTotal(scores) >= BONUS_THRESHOLD;
}

export function getBonus(scores: Record<Challenge, number | null>): number {
  return hasBonus(scores) ? BONUS_VALUE : 0;
}

export function isUpperComplete(scores: Record<Challenge, number | null>): boolean {
  return UPPER_CHALLENGES.every((key) => scores[key] !== null);
}

export function getLowerTotal(scores: Record<Challenge, number | null>): number {
  const lowerKeys: Challenge[] = ['brelan', 'carre', 'full', 'petiteSuite', 'grandeSuite', 'yams', 'chance'];
  return lowerKeys.reduce((sum, key) => sum + (scores[key] ?? 0), 0);
}

export function getGrandTotal(scores: Record<Challenge, number | null>): number {
  return getUpperTotal(scores) + getBonus(scores) + getLowerTotal(scores);
}

export function getMultiplesOptions(faceValue: number): number[] {
  return Array.from({ length: 7 }, (_, i) => faceValue * i);
}
