import { useEffect, useState } from "react";
import type { Prefs } from "./recommend";

export interface Store extends Prefs { playlists: Record<string, string[]> }
const KEY = "raaga-prefs-v1";
const EMPTY: Store = { languages: ["Telugu", "Hindi"], artists: [], moods: [], liked: [], disliked: [], playlists: { "My Favourites": [] } };

// Saved in this browser (localStorage).
export function usePrefs() {
  const [store, setStore] = useState<Store>(EMPTY);
  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) setStore({ ...EMPTY, ...JSON.parse(raw) }); } catch { /* ignore */ }
  }, []);
  const update = (fn: (s: Store) => Store) =>
    setStore((prev) => { const next = fn(prev); localStorage.setItem(KEY, JSON.stringify(next)); return next; });
  return { store, update };
}

export const toggle = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
