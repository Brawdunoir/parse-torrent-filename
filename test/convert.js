import assert from "assert";
import { parse } from "../index.js";

describe("Parsing convert", () => {
  it("should detect if the release is convert", () => {
    const releaseName = "Better.Call.Saul.S03E04.CONVERT.720p.WEB.h264-TBS";
    assert.deepStrictEqual(parse(releaseName).convert, true);
  });

  it("should not detect convert when the release is not flagged as such", () => {
    const releaseName =
      "Have I Got News For You S53E02 EXTENDED 720p HDTV x264-QPEL";
      assert.deepStrictEqual(parse(releaseName).convert, undefined);
  });
});
