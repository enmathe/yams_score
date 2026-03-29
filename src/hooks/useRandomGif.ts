import { useState, useEffect } from 'react';
import type { CelebrationType } from '../logic/celebrationGifs';
import { getRandomSearchTerm } from '../logic/celebrationGifs';

interface UseRandomGifResult {
  gifUrl: string | null;
  isLoading: boolean;
  error: boolean;
}

const GIPHY_API_KEY = 'mCy21VNHo1THOdgGhptu2YJB3IUPsLUX'; // Giphy API key
const API_TIMEOUT = 2000; // 2 seconds timeout

export const useRandomGif = (celebrationType: CelebrationType | null): UseRandomGifResult => {
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!celebrationType) {
      setGifUrl(null);
      return;
    }

    setIsLoading(true);
    setError(false);

    const fetchGif = async () => {
      try {
        const searchTerm = getRandomSearchTerm(celebrationType);
        const encodedSearch = encodeURIComponent(searchTerm);

        // Create timeout promise
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('API timeout')), API_TIMEOUT);
        });

        const fetchPromise = fetch(
          `https://api.giphy.com/v1/gifs/search?q=${encodedSearch}&api_key=${GIPHY_API_KEY}&limit=50`
        ).then((res) => res.json());

        const data = await Promise.race([fetchPromise, timeoutPromise]);

        if (data.data && data.data.length > 0) {
          // Get random GIF from results
          const randomGif = data.data[Math.floor(Math.random() * data.data.length)];
          const url = randomGif.images.original.url;
          setGifUrl(url);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch GIF:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGif();
  }, [celebrationType]);

  return { gifUrl, isLoading, error };
};
