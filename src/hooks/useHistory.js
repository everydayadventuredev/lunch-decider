import { useState, useEffect, useCallback, useRef } from "react";

const HISTORY_KEY = "lunch-tarot-history";
const ACHIEVEMENTS_KEY = "lunch-tarot-achievements";

export function useHistory() {
  const [history, setHistory] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const h = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
      setHistory(h);
    } catch { /* empty */ }
    try {
      const a = JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY) || "[]");
      setAchievements(a);
    } catch { /* empty */ }
    loaded.current = true;
  }, []);

  const persistHistory = useCallback((h) => {
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(h)); } catch { /* empty */ }
  }, []);

  const persistAchievements = useCallback((a) => {
    try { localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(a)); } catch { /* empty */ }
  }, []);

  const addEntry = useCallback((entry) => {
    setHistory(prev => {
      const newHistory = [...prev, entry];
      persistHistory(newHistory);
      return newHistory;
    });
  }, [persistHistory]);

  const updateAchievements = useCallback((newIds) => {
    setAchievements(prev => {
      const updated = [...prev, ...newIds];
      persistAchievements(updated);
      return updated;
    });
  }, [persistAchievements]);

  return { history, achievements, addEntry, updateAchievements };
}
