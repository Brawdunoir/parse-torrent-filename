import assert from "assert";
import { parse } from "../index.js";

describe("Parsing dubbed", () => {
  it("should detect the english dubbed language correctly", () => {
    const releaseName = "Yo-Kai Watch S01E71 DUBBED 720p HDTV x264-W4F";

     assert.deepStrictEqual(parse(releaseName).dubbed, true);
  });

  it("should detect dub correctly", () => {
    const releaseName =
      "[Golumpa] Kochoki - 11 (Kochoki - Wakaki Nobunaga) [English Dub] [FuniDub 720p x264 AAC] [MKV] [4FA0D898]";

     assert.deepStrictEqual(parse(releaseName).dubbed, true);
  });

  it("should detect dub correctly", () => {
    const releaseName =
      "[Golumpa] Kochoki - 11 (Kochoki - Wakaki Nobunaga) [English Dub] [FuniDub 720p x264 AAC] [MKV] [4FA0D898]";

     assert.deepStrictEqual(parse(releaseName).dubbed, true);
  });

  it("should detect dubs correctly", () => {
    const releaseName = "[Aomori-Raws] Juushinki Pandora (01-13) [Dubs & Subs]";

     assert.deepStrictEqual(parse(releaseName).dubbed, true);
  });

  it("should detect dual audio correctly", () => {
    const releaseName =
      "[LostYears] Tsuredure Children (WEB 720p Hi10 AAC) [Dual-Audio]";

     assert.deepStrictEqual(parse(releaseName).dubbed, true);
  });

  it("should detect dual-audio correctly", () => {
    const releaseName = "[DB] Gamers! [Dual Audio 10bit 720p][HEVC-x265]";

     assert.deepStrictEqual(parse(releaseName).dubbed, true);
  });

  it("should detect multi-audio correctly", () => {
    const releaseName =
      "[DragsterPS] Yu-Gi-Oh! S02 [480p] [Multi-Audio] [Multi-Subs]";

     assert.deepStrictEqual(parse(releaseName).dubbed, true);
  });

  it("should detect dublado correctly", () => {
    const releaseName = "A Freira (2018) Dublado HD-TS 720p";

     assert.deepStrictEqual(parse(releaseName).dubbed, true);
  });

  it("should detect dubbing correctly", () => {
    const releaseName = "Toy.Story.1080p.BluRay.x264-HD[Dubbing PL].mkv";

     assert.deepStrictEqual(parse(releaseName).dubbed, true);
  });

  it("should detect dual correctly", () => {
    const releaseName = "Fame (1980) [DVDRip][Dual][Ac3][Eng-Spa]";

     assert.deepStrictEqual(parse(releaseName).dubbed, true);
  });

  it("should not detect dual subs", () => {
    const releaseName =
      "[Hakata Ramen] Hoshiai No Sora (Stars Align) 01 [1080p][HEVC][x265][10bit][Dual-Subs] HR-DR";
     assert.deepStrictEqual(parse(releaseName).dubbed, undefined);
  });

  it("should not detect multi-dub", () => {
    const releaseName =
      "[IceBlue] Naruto (Season 01) - [Multi-Dub][Multi-Sub][HEVC 10Bits] 800p BD";

     assert.deepStrictEqual(parse(releaseName).dubbed, true);
  });
});
