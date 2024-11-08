import assert from "assert";
import { parse } from "../index.js";

describe("Parsing proper", () => {
  it("should detect if the release is proper", () => {
    const releaseName = "Into the Badlands S02E07 PROPER 720p HDTV x264-W4F";
    assert.deepStrictEqual(parse(releaseName).proper, true);
  });

  it("should detect if the release is real proper", () => {
    const releaseName = "Bossi-Reality-REAL PROPER-CDM-FLAC-1999-MAHOU";
    assert.deepStrictEqual(parse(releaseName).proper, true);
  });

  it("should not detect proper when the release is not flagged as such", () => {
    const releaseName =
    "Have I Got News For You S53E02 EXTENDED 720p HDTV x264-QPEL";
    assert.deepStrictEqual(parse(releaseName).proper, undefined);
  });
});
