import assert from "assert";
import { parse } from "../index.js";

describe("Parsing volume", () => {
  it("[MTBB] Sword Art Onlineː Alicization - Volume 2 (BD 1080p)", () => {
    const releaseName =
      "[MTBB] Sword Art Onlineː Alicization - Volume 2 (BD 1080p)";
    assert.deepStrictEqual(parse(releaseName).volumes, [2]);
  });

  it("[Neutrinome] Sword Art Online Alicization Vol.2 - VOSTFR [1080p BDRemux] + DDL", () => {
    const releaseName =
      "[Neutrinome] Sword Art Online Alicization Vol.2 - VOSTFR [1080p BDRemux] + DDL";
    assert.deepStrictEqual(parse(releaseName).volumes, [2]);
  });

  it("[Mr. Kimiko] Oh My Goddess! - Vol. 7 [Kobo][2048px][CBZ]", () => {
    const releaseName =
      "[Mr. Kimiko] Oh My Goddess! - Vol. 7 [Kobo][2048px][CBZ]";
    assert.deepStrictEqual(parse(releaseName).volumes, [7]);
  });

  it("[MTBB] Cross Game - Volume 1-3 (WEB 720p)", () => {
    const releaseName = "[MTBB] Cross Game - Volume 1-3 (WEB 720p)";
    assert.deepStrictEqual(parse(releaseName).volumes, [1, 2, 3]);
  });

  it("PIXAR SHORT FILMS COLLECTION - VOLS. 1 & 2 + - BDrip 1080p", () => {
    const releaseName =
      "PIXAR SHORT FILMS COLLECTION - VOLS. 1 & 2 + - BDrip 1080p";
    assert.deepStrictEqual(parse(releaseName).volumes, [1, 2]);
  });

  it("Altair - A Record of Battles Vol. 01-08 (Digital) (danke-Empire)", () => {
    const releaseName =
      "Altair - A Record of Battles Vol. 01-08 (Digital) (danke-Empire)";
    assert.deepStrictEqual(parse(releaseName).volumes, [1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("Guardians of the Galaxy Vol. 2 (2017) 720p HDTC x264 MKVTV", () => {
    const releaseName =
      "Guardians of the Galaxy Vol. 2 (2017) 720p HDTC x264 MKVTV";
    assert.deepStrictEqual(parse(releaseName).title, "Guardians of the Galaxy Vol. 2");
    assert.deepStrictEqual(parse(releaseName).volumes, undefined);
  });

  it("Kill Bill: Vol. 1 (2003) BluRay 1080p 5.1CH x264 Ganool", () => {
    const releaseName =
      "Kill Bill: Vol. 1 (2003) BluRay 1080p 5.1CH x264 Ganool";
    assert.deepStrictEqual(parse(releaseName).title, "Kill Bill: Vol. 1");
    assert.deepStrictEqual(parse(releaseName).volumes, undefined);
  });

  it("[Valenciano] Aquarion EVOL - 22 [1080p][AV1 10bit][FLAC][Eng sub].mkv", () => {
    const releaseName =
      "[Valenciano] Aquarion EVOL - 22 [1080p][AV1 10bit][FLAC][Eng sub].mkv";
    assert.deepStrictEqual(parse(releaseName).title, "Aquarion EVOL");
    assert.deepStrictEqual(parse(releaseName).volumes, undefined);
  });
});
