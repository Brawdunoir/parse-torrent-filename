import assert from "assert";
import { parse } from "../index.js";

describe("Parsing retail", () => {
  it("should detect if the release is retail", () => {
    const releaseName =
      "MONSTER HIGH: ELECTRIFIED (2017) Retail PAL DVD9 [EAGLE]";
    assert.deepStrictEqual(parse(releaseName).retail, true);
  });

  it("should not detect retail when the release is not flagged as such", () => {
    const releaseName =
      "Have I Got News For You S53E02 EXTENDED 720p HDTV x264-QPEL";
    assert.deepStrictEqual(parse(releaseName).retail, undefined);
  });
});
