import assert from "assert";
import { parse } from "../index.js";

describe("Parsing complete collection", () => {
  it("should detect complete series with full seasons", () => {
    const releaseName =
      "[Furi] Avatar - The Last Airbender [720p] (Full 3 Seasons + Extr";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect complete collection", () => {
    const releaseName =
      "Harry.Potter.Complete.Collection.2001-2011.1080p.BluRay.DTS-ETRG";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect complete collection with all seasons", () => {
    const releaseName = "Game of Thrones All 7 Seasons 1080p ~∞~ .HakunaMaKoko";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect complete collection with full series", () => {
    const releaseName = "Avatar: The Last Airbender Full Series 720p";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect complete collection with ultimate collection", () => {
    const releaseName = "Dora the Explorer - Ultimate Collection";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect complete collection with complete pack", () => {
    const releaseName =
      "Mr Bean Complete Pack (Animated, Tv series, 2 Movies) DVDRIP (WA";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect complete collection with complete set", () => {
    const releaseName =
      "American Pie - Complete set (8 movies) 720p mkv - YIFY";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect complete collection with complete filmography", () => {
    const releaseName = "Charlie Chaplin - Complete Filmography (87 movies)";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect complete collection with movies complete", () => {
    const releaseName = "Monster High Movies Complete 2014";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect complete collection all movies", () => {
    const releaseName =
      "Harry Potter All Movies Collection 2001-2011 720p Dual KartiKing";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect complete movie collection", () => {
    const releaseName = "The Clint Eastwood Movie Collection";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect complete collection movies", () => {
    const releaseName = "Clint Eastwood Collection - 15 HD Movies";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect complete movies collection", () => {
    const releaseName =
      "Official  IMDb  Top  250  Movies  Collection  6/17/2011";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect collection", () => {
    const releaseName =
      "The Texas Chainsaw Massacre Collection (1974-2017) BDRip 1080p";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect duology", () => {
    const releaseName =
      "Snabba.Cash.I-II.Duology.2010-2012.1080p.BluRay.x264.anoXmous";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect trilogy", () => {
    const releaseName =
      "Star Wars Original Trilogy 1977-1983 Despecialized 720p";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect quadrology", () => {
    const releaseName =
      "The.Wong.Kar-Wai.Quadrology.1990-2004.1080p.BluRay.x264.AAC.5.1-";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect quadrilogy", () => {
    const releaseName =
      "Lethal.Weapon.Quadrilogy.1987-1992.1080p.BluRay.x264.anoXmous";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect tetralogy", () => {
    const releaseName = "X-Men.Tetralogy.BRRip.XviD.AC3.RoSubbed-playXD";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect pentalogy", () => {
    const releaseName =
      "Mission.Impossible.Pentalogy.1996-2015.1080p.BluRay.x264.AAC.5.1";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect hexalogy", () => {
    const releaseName =
      "Mission.Impossible.Hexalogy.1996-2018.SweSub.1080p.x264-Justiso";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect hexalogy", () => {
    const releaseName = "American.Pie.Heptalogy.SWESUB.DVDRip.XviD-BaZZe";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect anthalogy", () => {
    const releaseName =
      "The Exorcist 1, 2, 3, 4, 5 - Complete Horror Anthology 1973-2005";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect saga", () => {
    const releaseName =
      "Harry.Potter.Complete.Saga. I - VIII .1080p.Bluray.x264.anoXmous";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should detect italian complete", () => {
    const releaseName =
      "Inganno - Miniserie (2024) [COMPLETA] SD H264 ITA AAC-UBi";
    assert.deepStrictEqual(parse(releaseName).complete, true);
  });

  it("should not remove collection from title", () => {
    const releaseName =
    "[Erai-raws] Ninja Collection - 05 [720p][Multiple Subtitle].mkv";
    assert.deepStrictEqual(parse(releaseName).complete, true);
    assert.deepStrictEqual(parse(releaseName).title, "Ninja Collection");
  });
});
