import assert from "assert";
import { parse } from "../index.js";

describe("Parsing unrated", () => {
  it("should detect if the release is unrated", () => {
    const releaseName =
      "Identity.Thief.2013.Vostfr.UNRATED.BluRay.720p.DTS.x264-Nenuko";
    assert.deepStrictEqual(parse(releaseName).unrated, true);
  });

  it("should detect if the release is uncensored", () => {
    const releaseName =
    "Charlie.les.filles.lui.disent.merci.2007.UNCENSORED.TRUEFRENCH.DVDRiP.AC3.Libe";
    assert.deepStrictEqual(parse(releaseName).unrated, true);
  });

  it("should not detect unrated when the release is not flagged as such", () => {
    const releaseName =
    "Have I Got News For You S53E02 EXTENDED 720p HDTV x264-QPEL";
    assert.deepStrictEqual(parse(releaseName).unrated, undefined);
  });
});
