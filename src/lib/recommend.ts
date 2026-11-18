import { ARTISTS, LANGUAGES, MOODS, SONGS, type Language, type Mood, type Song } from "./music-data";

const people = (s: Song) => [...s.artist.split(", "), s.composer];
const genreWords = (s: Song) => s.genre.toLowerCase().split(/[\s-]+/);

/** Content-based feature vector: language, moods, genre words, people, energy. */
function vector(s: Song): Map<string, number> {
  const v = new Map<string, number>();
  v.set(`lang:${s.language}`, 1.5);
  s.moods.forEach((m) => v.set(`mood:${m}`, 1));
  genreWords(s).forEach((g) => v.set(`genre:${g}`, 0.8));
  people(s).forEach((p) => v.set(`p:${p}`, 0.7));
  v.set("energy", s.energy * 1.5);
  v.set("calm", (1 - s.energy) * 1.5);
  return v;
}

export function cosine(a: Song, b: Song): number {
  const va = vector(a), vb = vector(b);
  let dot = 0, na = 0, nb = 0;
  va.forEach((x, k) => { na += x * x; dot += x * (vb.get(k) ?? 0); });
  vb.forEach((x) => { nb += x * x; });
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

export function similarSongs(song: Song, n = 6, pool: Song[] = SONGS): Song[] {
  return pool
    .filter((s) => s.id !== song.id)
    .map((s) => ({ s, score: cosine(song, s) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((x) => x.s);
}

export interface Filters {
  query?: string;
  languages?: Language[];
  moods?: Mood[];
  artist?: string | undefined;
  energy?: [number, number];
}

export function filterSongs(f: Filters, pool: Song[] = SONGS): Song[] {
  const q = f.query?.trim().toLowerCase();
  return pool.filter((s) => {
    if (f.languages?.length && !f.languages.includes(s.language)) return false;
    if (f.moods?.length && !f.moods.some((m) => s.moods.includes(m))) return false;
    if (f.artist && !people(s).includes(f.artist)) return false;
    if (f.energy && (s.energy < f.energy[0] || s.energy > f.energy[1])) return false;
    if (q) {
      const hay = `${s.title} ${s.artist} ${s.composer} ${s.album} ${s.language} ${s.genre}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export interface Prefs {
  languages: Language[];
  artists: string[];
  moods: Mood[];
  liked: string[];
  disliked: string[];
}

/** Score songs by preferences + similarity to liked songs. Telugu & Hindi get a small priority boost. */
export function personalised(prefs: Prefs, n = 12): Song[] {
  const liked = SONGS.filter((s) => prefs.liked.includes(s.id));
  return SONGS.filter((s) => !prefs.disliked.includes(s.id))
    .map((s) => {
      let score = s.language === "Telugu" ? 0.3 : s.language === "Hindi" ? 0.2 : 0;
      if (prefs.languages.includes(s.language)) score += 2;
      score += s.moods.filter((m) => prefs.moods.includes(m)).length;
      if (people(s).some((p) => prefs.artists.includes(p))) score += 2;
      if (liked.length) score += 2 * Math.max(...liked.map((l) => (l.id === s.id ? 0 : cosine(l, s))));
      return { s, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((x) => x.s);
}

/* ---------- Rule-based chatbot: understands plain English, only answers from the dataset ---------- */
const MOOD_WORDS: Record<Mood, string[]> = {
  Romantic: ["romantic", "romance", "love"],
  Happy: ["happy", "cheerful", "joy", "feel good", "feel-good"],
  Sad: ["sad", "heartbreak", "breakup", "emotional", "cry"],
  Motivational: ["motivat", "inspir", "workout", "gym"],
  Relaxing: ["relax", "calm", "chill", "peace", "sleep"],
  Energetic: ["energetic", "energy", "pump", "mass", "high"],
  Devotional: ["devotional", "god", "bhakti", "spiritual", "prayer"],
  Party: ["party", "dance", "club", "wedding"],
  Focus: ["study", "studying", "focus", "concentrat", "work"],
};

export interface ChatAnswer { text: string; songs: Song[] }

export function answer(input: string): ChatAnswer {
  const q = input.toLowerCase();
  const simMatch = q.match(/(?:similar to|like)\s+["']?(.+?)["']?\s*$/);
  const simName = simMatch?.[1]?.trim();
  if (simName && /similar|songs like/.test(q)) {
    const target = SONGS.find((s) => s.title.toLowerCase().includes(simName) || simName.includes(s.title.toLowerCase()));
    if (target) return { text: `Songs similar to "${target.title}" by ${target.artist}:`, songs: similarSongs(target, 6) };
    return { text: "I couldn't find that song in my library. Try a title like \"Samajavaragamana\" or \"Kesariya\".", songs: [] };
  }
  const languages = LANGUAGES.filter((l) => q.includes(l.toLowerCase()));
  const moods = MOODS.filter((m) => MOOD_WORDS[m].some((w) => q.includes(w)));
  const artist = ARTISTS.find((a) => q.includes(a.toLowerCase()) || q.includes(a.toLowerCase().replace(/\./g, "").replace(/\s+/g, " ")));
  if (!languages.length && !moods.length && !artist) {
    const byTitle = filterSongs({ query: q.replace(/^(play|find|search)\s+/, "") });
    if (byTitle.length) return { text: "Here's what I found:", songs: byTitle.slice(0, 8) };
    return { text: "Tell me a mood, language or artist — e.g. \"relaxing Telugu songs\" or \"Arijit Singh songs\".", songs: [] };
  }
  const songs = filterSongs({ languages, moods, artist }).sort((a, b) => {
    const p = (s: Song) => (s.language === "Telugu" ? 2 : s.language === "Hindi" ? 1 : 0);
    return p(b) - p(a);
  });
  const parts = [moods.map((m) => m.toLowerCase()).join(" & "), languages.join(" / "), artist ? `by ${artist}` : ""].filter(Boolean).join(" ");
  if (!songs.length) return { text: `I don't have ${parts} songs in my library yet.`, songs: [] };
  return { text: `Here are ${parts} songs:`, songs: songs.slice(0, 8) };
}
