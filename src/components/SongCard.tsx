import { ThumbsDown, ThumbsUp, ListPlus, Waves } from "lucide-react";
import { spotifyLink, ytMusicLink, type Song } from "@/lib/music-data";
import { toggle, type Store } from "@/lib/use-prefs";

interface Props { song: Song; store: Store; update: (fn: (s: Store) => Store) => void; onSimilar: (s: Song) => void }

export function SongCard({ song, store, update, onSimilar }: Props) {
  const liked = store.liked.includes(song.id);
  const disliked = store.disliked.includes(song.id);
  const lists = Object.keys(store.playlists);
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/60">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold leading-tight">{song.title}</h3>
          <p className="truncate text-sm text-muted-foreground">{song.artist}</p>
        </div>
        <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-primary">{song.language}</span>
      </div>
      <p className="text-xs text-muted-foreground">
        {song.album} · {song.year} · {song.genre} · Music: {song.composer}
      </p>
      <div className="flex flex-wrap items-center gap-1.5">
        {song.moods.map((m) => (
          <span key={m} className="rounded-full border border-border px-2 py-0.5 text-xs">{m === "Focus" ? "Focus & Study" : m}</span>
        ))}
        <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground" title="Energy">
          <span className="h-1.5 w-12 overflow-hidden rounded-full bg-muted"><span className="block h-full bg-accent" style={{ width: `${song.energy * 100}%` }} /></span>
        </span>
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-1 text-sm">
        <button aria-label="Like" onClick={() => update((s) => ({ ...s, liked: toggle(s.liked, song.id), disliked: s.disliked.filter((x) => x !== song.id) }))}
          className={`rounded-full p-2 ${liked ? "bg-primary text-primary-foreground" : "bg-secondary"}`}><ThumbsUp className="h-4 w-4" /></button>
        <button aria-label="Dislike" onClick={() => update((s) => ({ ...s, disliked: toggle(s.disliked, song.id), liked: s.liked.filter((x) => x !== song.id) }))}
          className={`rounded-full p-2 ${disliked ? "bg-destructive text-destructive-foreground" : "bg-secondary"}`}><ThumbsDown className="h-4 w-4" /></button>
        <label className="flex items-center gap-1 rounded-full bg-secondary px-2 py-1.5">
          <ListPlus className="h-4 w-4" />
          <select aria-label="Add to playlist" className="bg-transparent text-xs outline-none" value=""
            onChange={(e) => { const name = e.target.value; if (name) update((s) => ({ ...s, playlists: { ...s.playlists, [name]: Array.from(new Set([...(s.playlists[name] ?? []), song.id])) } })); }}>
            <option value="" className="bg-card">Add to…</option>
            {lists.map((l) => <option key={l} value={l} className="bg-card">{l}{store.playlists[l]?.includes(song.id) ? " ✓" : ""}</option>)}
          </select>
        </label>
        <button onClick={() => onSimilar(song)} className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-xs"><Waves className="h-4 w-4" /> Similar</button>
        <span className="ml-auto flex gap-2 text-xs font-semibold">
          <a className="text-primary hover:underline" href={spotifyLink(song)} target="_blank" rel="noreferrer">Spotify</a>
          <a className="text-accent hover:underline" href={ytMusicLink(song)} target="_blank" rel="noreferrer">YT Music</a>
        </span>
      </div>
    </article>
  );
}
