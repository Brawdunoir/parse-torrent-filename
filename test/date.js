import assert from "assert";
import { parse } from "../index.js";

describe("Parsing date", () => {
  it("Stephen Colbert 2019 10 25 Eddie Murphy 480p x264-mSD [eztv]", () => {
    const releaseName =
      "Stephen Colbert 2019 10 25 Eddie Murphy 480p x264-mSD [eztv]";
    assert.deepStrictEqual(parse(releaseName).date, "2019-10-25");
  });

  it("Stephen Colbert 25/10/2019 Eddie Murphy 480p x264-mSD [eztv]", () => {
    const releaseName =
      "Stephen Colbert 2019 10 25 Eddie Murphy 480p x264-mSD [eztv]";

    assert.deepStrictEqual(parse(releaseName).date, "2019-10-25");
  });

  it("Jimmy.Fallon.2020.02.14.Steve.Buscemi.WEB.x264-XLF[TGx]", () => {
    const releaseName =
      "Jimmy.Fallon.2020.02.14.Steve.Buscemi.WEB.x264-XLF[TGx]";

    assert.deepStrictEqual(parse(releaseName).date, "2020-02-14");
  });

  it("The Young And The Restless - S43 E10986 - 2016-08-12", () => {
    const releaseName = "The Young And The Restless - S43 E10986 - 2016-08-12";

    assert.deepStrictEqual(parse(releaseName).date, "2016-08-12");
  });

  xit("Indias Best Dramebaaz 2 Ep 19 (13 Feb 2016) HDTV x264-AquoTube", () => {
    const releaseName =
      "Indias Best Dramebaaz 2 Ep 19 (13 Feb 2016) HDTV x264-AquoTube";

    assert.deepStrictEqual(parse(releaseName).date, "2016-02-13");
  });

  it("07 2015 YR/YR 07-06-15.mp4", () => {
    const releaseName = "07 2015 YR/YR 07-06-15.mp4";

    assert.deepStrictEqual(parse(releaseName).date, "2015-07-06");
  });

  xit("SIX.S01E05.400p.229mb.hdtv.x264-][ Collateral ][ 16-Feb-2017 mp4", () => {
    const releaseName =
      "SIX.S01E05.400p.229mb.hdtv.x264-][ Collateral ][ 16-Feb-2017 mp4";

    assert.deepStrictEqual(parse(releaseName).date, "2017-02-16");
  });

  xit("SIX.S01E05.400p.229mb.hdtv.x264-][ Collateral ][ 16-Feb-17 mp4", () => {
    const releaseName =
      "SIX.S01E05.400p.229mb.hdtv.x264-][ Collateral ][ 16-Feb-17 mp4";

    assert.deepStrictEqual(parse(releaseName).date, "2017-02-16");
  });

  it("WWE Smackdown - 11/21/17 - 21st November 2017 - Full Show", () => {
    const releaseName =
      "WWE Smackdown - 11/21/17 - 21st November 2017 - Full Show";

    assert.deepStrictEqual(parse(releaseName).date, "2017-11-21");
  });

  it("WWE Smackdown - 11/21/17 - 21st November 2017 - Full Show", () => {
    const releaseName =
      "WWE Smackdown - 11/21/17 - 21st November 2017 - Full Show";

    assert.deepStrictEqual(parse(releaseName).date, "2017-11-21");
  });

  it("WWE RAW 9th Dec 2019 WEBRip h264-TJ [TJET]", () => {
    const releaseName = "WWE RAW 9th Dec 2019 WEBRip h264-TJ [TJET]";

    assert.deepStrictEqual(parse(releaseName).date, "2019-12-09");
  });

  it("WWE RAW 1st Dec 2019 WEBRip h264-TJ [TJET]", () => {
    const releaseName = "WWE RAW 1st Dec 2019 WEBRip h264-TJ [TJET]";

    assert.deepStrictEqual(parse(releaseName).date, "2019-12-01");
  });

  it("WWE RAW 2nd Dec 2019 WEBRip h264-TJ [TJET]", () => {
    const releaseName = "WWE RAW 2nd Dec 2019 WEBRip h264-TJ [TJET]";

    assert.deepStrictEqual(parse(releaseName).date, "2019-12-02");
  });

  it("WWE RAW 3rd Dec 2019 WEBRip h264-TJ [TJET]", () => {
    const releaseName = "WWE RAW 3rd Dec 2019 WEBRip h264-TJ [TJET]";

    assert.deepStrictEqual(parse(releaseName).date, "2019-12-03");
  });

  it("EastEnders_20200116_19302000.mp4", () => {
    const releaseName = "EastEnders_20200116_19302000.mp4";

    assert.deepStrictEqual(parse(releaseName).date, "2020-01-16");
  });

  it("AEW DARK 4th December 2020 WEBRip h264-TJ", () => {
    const releaseName = "AEW DARK 4th December 2020 WEBRip h264-TJ";

    assert.deepStrictEqual(parse(releaseName).date, "2020-12-04");
  });

  it("AEW DARK 4th November 2020 WEBRip h264-TJ", () => {
    const releaseName = "AEW DARK 4th November 2020 WEBRip h264-TJ";

    assert.deepStrictEqual(parse(releaseName).date, "2020-11-04");
  });

  it("AEW DARK 4th October 2020 WEBRip h264-TJ", () => {
    const releaseName = "AEW DARK 4th October 2020 WEBRip h264-TJ";

    assert.deepStrictEqual(parse(releaseName).date, "2020-10-04");
  });

  xit("WWE NXT 30th Sept 2020 WEBRip h264-TJ", () => {
    const releaseName = "WWE NXT 30th Sept 2020 WEBRip h264-TJ";

    assert.deepStrictEqual(parse(releaseName).date, "2020-09-30");
  });

  it("AEW DARK 4th September 2020 WEBRip h264-TJ", () => {
    const releaseName = "AEW DARK 4th September 2020 WEBRip h264-TJ";

    assert.deepStrictEqual(parse(releaseName).date, "2020-09-04");
  });

  it("WWE Main Event 6th August 2020 WEBRip h264-TJ", () => {
    const releaseName = "WWE Main Event 6th August 2020 WEBRip h264-TJ";

    assert.deepStrictEqual(parse(releaseName).date, "2020-08-06");
  });

  it("WWE Main Event 4th July 2020 WEBRip h264-TJ", () => {
    const releaseName = "WWE Main Event 4th July 2020 WEBRip h264-TJ";

    assert.deepStrictEqual(parse(releaseName).date, "2020-07-04");
  });

  it("WWE Main Event 4th June 2020 WEBRip h264-TJ", () => {
    const releaseName = "WWE Main Event 4th June 2020 WEBRip h264-TJ";

    assert.deepStrictEqual(parse(releaseName).date, "2020-06-04");
  });

  it("WWE Main Event 4th May 2020 WEBRip h264-TJ", () => {
    const releaseName = "WWE Main Event 4th May 2020 WEBRip h264-TJ";

    assert.deepStrictEqual(parse(releaseName).date, "2020-05-04");
  });

  it("WWE Main Event 4th April 2020 WEBRip h264-TJ", () => {
    const releaseName = "WWE Main Event 4th April 2020 WEBRip h264-TJ";

    assert.deepStrictEqual(parse(releaseName).date, "2020-04-04");
  });

  it("WWE Main Event 3rd March 2020 WEBRip h264-TJ", () => {
    const releaseName = "WWE Main Event 3rd March 2020 WEBRip h264-TJ";

    assert.deepStrictEqual(parse(releaseName).date, "2020-03-03");
  });

  it("WWE Main Event 2nd February 2020 WEBRip h264-TJ", () => {
    const releaseName = "WWE Main Event 2nd February 2020 WEBRip h264-TJ";

    assert.deepStrictEqual(parse(releaseName).date, "2020-02-02");
  });

  it("WWE Main Event 1st January 2020 WEBRip h264-TJ", () => {
    const releaseName = "WWE Main Event 1st January 2020 WEBRip h264-TJ";

    assert.deepStrictEqual(parse(releaseName).date, "2020-01-01");
  });

  it("wwf.raw.is.war.18.09.00.avi", () => {
    const releaseName = "wwf.raw.is.war.18.09.00.avi";

    assert.deepStrictEqual(parse(releaseName).date, "2000-09-18");
  });

  it("The Colbert Report - 10-30-2010 - Rally to Restore Sanity and or Fear.avi", () => {
    const releaseName =
      "The Colbert Report - 10-30-2010 - Rally to Restore Sanity and or Fear.avi";

    assert.deepStrictEqual(parse(releaseName).date, "2010-10-30");
  });

  it("should not detect date from series title", () => {
    const releaseName =
      "11 22 63 - Temporada 1 [HDTV][Cap.103][Español Castellano]";
    assert.deepStrictEqual(parse(releaseName).date, undefined);
  });

  it("should not detect date from movie title", () => {
    const releaseName = "September 30 1955 1977 1080p BluRay";
    assert.deepStrictEqual(parse(releaseName).date, undefined);
  });

  it("should not detect date from movie title v2", () => {
    const releaseName = "11-11-11.2011.1080p.BluRay.x264.DTS-FGT";
    assert.deepStrictEqual(parse(releaseName).date, undefined);
  });
});
