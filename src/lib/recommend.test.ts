import { describe, expect, it } from "vitest";
import { answer, filterSongs, similarSongs } from "./recommend";
import { SONGS } from "./music-data";

describe("recommendations", () => {
  it("language + mood filter only returns matching songs", () => {
    const r = filterSongs({ languages: ["Telugu"], moods: ["Happy"] });
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((s) => s.language === "Telugu" && s.moods.includes("Happy"))).toBe(true);
  });
  it("energy range filter is respected", () => {
    expect(filterSongs({ energy: [0, 0.3] }).every((s) => s.energy <= 0.3)).toBe(true);
  });
  it("similar songs exclude the song itself", () => {
    const s = SONGS[0]!;
    expect(similarSongs(s).some((x) => x.id === s.id)).toBe(false);
  });
  it("chatbot maps 'studying' to Focus and only answers from the dataset", () => {
    const r = answer("Suggest Telugu songs for studying");
    expect(r.songs.length).toBeGreaterThan(0);
    expect(r.songs.every((s) => s.language === "Telugu" && s.moods.includes("Focus"))).toBe(true);
  });
  it("chatbot finds artist songs", () => {
    expect(answer("Recommend Arijit Singh songs").songs.every((s) => s.artist.includes("Arijit Singh"))).toBe(true);
  });
});
