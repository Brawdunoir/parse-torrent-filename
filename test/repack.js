import assert from "assert";
import { parse } from "../index.js";

describe("Parsing repack", () => {
  it("should detect if the release is repack", () => {
    const releaseName = "Silicon Valley S04E03 REPACK HDTV x264-SVA";
    assert.deepStrictEqual(parse(releaseName).repack, true);
  });

  it("should detect if the release is rerip", () => {
    const releaseName =
      "Expedition Unknown S03E14 Corsicas Nazi Treasure RERIP 720p HDTV x264-W4F";
    assert.deepStrictEqual(parse(releaseName).repack, true);
  });

  it("should not detect repack when the release is not flagged as such", () => {
    const releaseName =
      "Have I Got News For You S53E02 EXTENDED 720p HDTV x264-QPEL";
    assert.deepStrictEqual(parse(releaseName).repack, undefined);
  });
});
