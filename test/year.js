import assert from "assert";
import { parse } from "../index.js";

describe("Paring year", () => {
  it("should detect the year correctly", () => {
    const releaseName = "Dawn.of.the.Planet.of.the.Apes.2014.HDRip.XViD-EVO";
    assert.deepStrictEqual(parse(releaseName).year, 2014);
  });

  it("should detect the year within braces correctly", () => {
    const releaseName = "Hercules (2014) 1080p BrRip H264 - YIFY";
    assert.deepStrictEqual(parse(releaseName).year, 2014);
  });

  it("should detect the year within brackets correctly", () => {
    const releaseName = "One Shot [2014] DVDRip XViD-ViCKY";
    assert.deepStrictEqual(parse(releaseName).year, 2014);
  });

  it("should detect the year but not the title if the title is a year", () => {
    const releaseName = "2012 2009 1080p BluRay x264 REPACK-METiS";
    assert.deepStrictEqual(parse(releaseName).year, 2009);
  });

  it("should detect the year at the beginning if there is none", () => {
    const releaseName = "2008 The Incredible Hulk Feature Film.mp4'";
    assert.deepStrictEqual(parse(releaseName).year, 2008);
  });

  it("should detect the year range", () => {
    const releaseName =
      "Harry Potter All Movies Collection 2001-2011 720p Dual KartiKing'";
    assert.deepStrictEqual(parse(releaseName).year, "2001-2011");
  });

  it("should detect year range with simplified end year", () => {
    const releaseName = "Empty Nest Season 1 (1988 - 89) fiveofseven";
    assert.deepStrictEqual(parse(releaseName).year, "1988-1989");
  });

  it("should not detect year from bitrate", () => {
    const releaseName =
      "04. Practice Two (1324mb 1916x1080 50fps 1970kbps x265 deef).mkv";
    assert.deepStrictEqual(parse(releaseName).year, undefined);
  });

  it("should not detect year spanish episode", () => {
    const releaseName =
      "Anatomia De Grey - Temporada 19 [HDTV][Cap.1905][Castellano][www.AtomoHD.nu].avi";
    assert.deepStrictEqual(parse(releaseName).year, undefined);
  });
});
