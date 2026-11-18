import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState, type FormEvent } from "react";
import { Disc3, Search, Send, X } from "lucide-react";
import { SongCard } from "@/components/SongCard";
import { ARTISTS, LANGUAGES, MOODS, MOOD_LABEL, SONGS, type Language, type Mood, type Song } from "@/lib/music-data";
import { answer, filterSongs, personalised, similarSongs, type ChatAnswer } from "@/lib/recommend";
import { toggle, usePrefs } from "@/lib/use-prefs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Raaga — Telugu, Hindi & English Music Recommendations" },
      { name: "description", content: "Discover songs by mood, language, artist and energy. Personalised picks, similar songs and a music chat assistant." },
      { property: "og:title", content: "Raaga — Indian Music Recommendations" },
      { property: "og:description", content: "Mood and language based song discovery for Telugu, Hindi, English and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TABS = ["Discover", "For You", "Ask Raaga", "Playlists"] as const;
type Tab = (typeof TABS)[number];
const SUGGESTIONS = ["Recommend Telugu songs for a happy mood", "Suggest Hindi romantic songs", "Telugu songs for studying", "Recommend Arijit Singh songs", "Motivational Hindi songs", "Songs similar to Samajavaragamana"];

function Index() {
  const { store, update } = usePrefs();
  const [tab, setTab] = useState<Tab>("Discover");
  const [similarTo, setSimilarTo] = useState<Song | null>(null);
  const card = (s: Song) => <SongCard key={s.id} song={s} store={store} update={update} onSimilar={setSimilarTo} />;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-8">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-4xl font-extrabold tracking-tight md:text-5xl">
            <Disc3 className="h-9 w-9 text-primary" /> Raaga
          </h1>
          <p className="mt-1 text-muted-foreground">Telugu & Hindi first — plus English, Tamil, Kannada and Malayalam. {SONGS.length} songs.</p>
        </div>
        <nav className="flex flex-wrap gap-1 rounded-full border border-border bg-card p-1">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{t}</button>
          ))}
        </nav>
      </header>

      {similarTo && (
        <section className="mb-8 rounded-3xl border border-primary/50 bg-secondary/40 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Similar to “{similarTo.title}”</h2>
            <button aria-label="Close" onClick={() => setSimilarTo(null)} className="rounded-full p-1 hover:bg-muted"><X className="h-5 w-5" /></button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{similarSongs(similarTo).map(card)}</div>
        </section>
      )}

      {tab === "Discover" && <Discover card={card} />}
      {tab === "For You" && <ForYou store={store} update={update} card={card} />}
      {tab === "Ask Raaga" && <Chat card={card} />}
      {tab === "Playlists" && <Playlists store={store} update={update} card={card} />}
    </div>
  );
}

type CardFn = (s: Song) => React.ReactNode;

function Discover({ card }: { card: CardFn }) {
  const [query, setQuery] = useState("");
  const [languages, setLanguages] = useState<Language[]>([]);
  const [moods, setMoods] = useState<Mood[]>([]);
  const [artist, setArtist] = useState("");
  const [maxEnergy, setMaxEnergy] = useState(100);
  const [minEnergy, setMinEnergy] = useState(0);
  const results = useMemo(
    () => filterSongs({ query, languages, moods, artist: artist || undefined, energy: [minEnergy / 100, maxEnergy / 100] }),
    [query, languages, moods, artist, minEnergy, maxEnergy],
  );
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-5 rounded-3xl border border-border bg-card p-5 lg:sticky lg:top-6 lg:self-start">
        <label className="flex items-center gap-2 rounded-full border border-input bg-background px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Song, artist, album…" className="w-full bg-transparent text-sm outline-none" />
        </label>
        <Group title="Language">{LANGUAGES.map((l) => <button key={l} onClick={() => setLanguages(toggle(languages, l))} className={`chip ${languages.includes(l) ? "chip-on" : ""}`}>{l}</button>)}</Group>
        <Group title="Mood">{MOODS.map((m) => <button key={m} onClick={() => setMoods(toggle(moods, m))} className={`chip ${moods.includes(m) ? "chip-on" : ""}`}>{MOOD_LABEL[m]}</button>)}</Group>
        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">Artist / Composer</h4>
          <select value={artist} onChange={(e) => setArtist(e.target.value)} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm">
            <option value="">Any</option>{ARTISTS.map((a) => <option key={a}>{a}</option>)}
          </select>
        </div>
        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">Energy {minEnergy}–{maxEnergy}%</h4>
          <input type="range" min={0} max={100} value={minEnergy} onChange={(e) => setMinEnergy(Math.min(+e.target.value, maxEnergy))} className="w-full accent-primary" aria-label="Minimum energy" />
          <input type="range" min={0} max={100} value={maxEnergy} onChange={(e) => setMaxEnergy(Math.max(+e.target.value, minEnergy))} className="w-full accent-accent" aria-label="Maximum energy" />
        </div>
      </aside>
      <section>
        <p className="mb-3 text-sm text-muted-foreground">{results.length} songs</p>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{results.map(card)}</div>
      </section>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</h4><div className="flex flex-wrap gap-1.5">{children}</div></div>;
}

type StoreProps = ReturnType<typeof usePrefs> & { card: CardFn };

function ForYou({ store, update, card }: StoreProps) {
  const picks = personalised(store);
  const featured = ["Sid Sriram", "Anirudh Ravichander", "Devi Sri Prasad", "S. Thaman", "Armaan Malik", "Arijit Singh", "Shreya Ghoshal", "Sonu Nigam", "Pritam", "A. R. Rahman", "Taylor Swift", "Ed Sheeran", "The Weeknd", "Coldplay"];
  return (
    <div className="space-y-6">
      <section className="grid gap-5 rounded-3xl border border-border bg-card p-5 md:grid-cols-3">
        <Group title="Preferred languages">{LANGUAGES.map((l) => <button key={l} onClick={() => update((s) => ({ ...s, languages: toggle(s.languages, l) }))} className={`chip ${store.languages.includes(l) ? "chip-on" : ""}`}>{l}</button>)}</Group>
        <Group title="Favourite moods">{MOODS.map((m) => <button key={m} onClick={() => update((s) => ({ ...s, moods: toggle(s.moods, m) }))} className={`chip ${store.moods.includes(m) ? "chip-on" : ""}`}>{MOOD_LABEL[m]}</button>)}</Group>
        <Group title="Favourite artists">{featured.map((a) => <button key={a} onClick={() => update((s) => ({ ...s, artists: toggle(s.artists, a) }))} className={`chip ${store.artists.includes(a) ? "chip-on" : ""}`}>{a}</button>)}</Group>
      </section>
      <div>
        <h2 className="mb-1 text-2xl font-bold">Picked for you</h2>
        <p className="mb-4 text-sm text-muted-foreground">Based on your languages, moods, artists and the songs you like 👍 (dislikes are hidden).</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{picks.map(card)}</div>
      </div>
    </div>
  );
}

function Chat({ card }: { card: CardFn }) {
  const [log, setLog] = useState<{ q: string; a: ChatAnswer }[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const ask = (q: string) => { if (!q.trim()) return; setLog((l) => [...l, { q, a: answer(q) }]); setInput(""); inputRef.current?.focus(); };
  const submit = (e: FormEvent) => { e.preventDefault(); ask(input); };
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {log.length === 0 && (
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-2xl font-bold">Ask Raaga</h2>
          <p className="mt-1 text-sm text-muted-foreground">Ask in simple English. Answers come only from Raaga's song library — nothing made up.</p>
          <div className="mt-4 flex flex-wrap gap-2">{SUGGESTIONS.map((s) => <button key={s} onClick={() => ask(s)} className="chip">{s}</button>)}</div>
        </div>
      )}
      {log.map((m, i) => (
        <div key={i} className="space-y-3">
          <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2 text-primary-foreground">{m.q}</p>
          <p className="font-semibold">{m.a.text}</p>
          <div className="grid gap-3 sm:grid-cols-2">{m.a.songs.map(card)}</div>
        </div>
      ))}
      <form onSubmit={submit} className="sticky bottom-4 flex items-center gap-2 rounded-full border border-border bg-card p-2 shadow-lg">
        <input ref={inputRef} autoFocus value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. relaxing Telugu songs" className="flex-1 bg-transparent px-3 text-sm outline-none" />
        <button aria-label="Send" className="rounded-full bg-primary p-2.5 text-primary-foreground"><Send className="h-4 w-4" /></button>
      </form>
    </div>
  );
}

function Playlists({ store, update, card }: StoreProps) {
  const [name, setName] = useState("");
  const create = (e: FormEvent) => { e.preventDefault(); const n = name.trim(); if (n && !store.playlists[n]) update((s) => ({ ...s, playlists: { ...s.playlists, [n]: [] } })); setName(""); };
  return (
    <div className="space-y-8">
      <form onSubmit={create} className="flex max-w-md gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New playlist name" className="flex-1 rounded-full border border-input bg-card px-4 py-2 text-sm outline-none" />
        <button className="rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground">Create</button>
      </form>
      {Object.entries(store.playlists).map(([pl, ids]) => (
        <section key={pl}>
          <div className="mb-3 flex items-center gap-3">
            <h2 className="text-2xl font-bold">{pl}</h2>
            <span className="text-sm text-muted-foreground">{ids.length} songs</span>
            <button onClick={() => update((s) => { const p = { ...s.playlists }; delete p[pl]; return { ...s, playlists: p }; })} className="ml-auto text-xs text-muted-foreground hover:text-destructive">Delete playlist</button>
          </div>
          {ids.length === 0 ? <p className="text-sm text-muted-foreground">Empty — use “Add to…” on any song.</p> : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SONGS.filter((s) => ids.includes(s.id)).map((s) => (
                <div key={s.id} className="relative">
                  {card(s)}
                  <button aria-label="Remove from playlist" onClick={() => update((st) => ({ ...st, playlists: { ...st.playlists, [pl]: (st.playlists[pl] ?? []).filter((x) => x !== s.id) } }))} className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"><X className="h-3 w-3" /></button>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
