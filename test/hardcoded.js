import assert from "assert";
import { parse } from "../index.js";

describe("Parsing hardcoded", () => {
  it("should detect if the release is hardcoded", () => {
    const releaseName = "Ghost In The Shell 2017 1080p HC HDRip X264 AC3-EVO";

    assert.deepStrictEqual(parse(releaseName).hardcoded, true);
  });

  it("should not detect hardcoded when the release is not flagged as such", () => {
    const releaseName =
      "Have I Got News For You S53E02 EXTENDED 720p HDTV x264-QPEL";
    assert.deepStrictEqual(parse(releaseName).hardcoded, undefined);
  });
});
