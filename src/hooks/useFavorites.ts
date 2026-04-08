// ============================================================
// useFavorites Hook - Gerencia favoritos com localStorage
// ============================================================
import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'neoncast_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  const toggleFavorite = useCallback((seriesId: string) => {
    setFavorites(prev => {
      const newFavs = prev.includes(seriesId)
        ? prev.filter(id => id !== seriesId)
        : [...prev, seriesId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavs));
      return newFavs;
    });
  }, []);

  const isFavorite = useCallback((seriesId: string) => {
    return favorites.includes(seriesId);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite };
}
