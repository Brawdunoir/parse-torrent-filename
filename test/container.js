import assert from "assert";
import { parse } from "../index.js";

describe("Parsing container", () => {
  it("should detect if the mkv release has the correct container", () => {
    const releaseName =
      "Kevin Hart What Now (2016) 1080p BluRay x265 6ch -Dtech mkv";

    assert.deepStrictEqual(parse(releaseName).container, "mkv");
  });

  it("should detect if the mp4 release has the correct container", () => {
    const releaseName = "The Gorburger Show S01E05 AAC MP4-Mobile";

    assert.deepStrictEqual(parse(releaseName).container, "mp4");
  });

  it("should detect if the avi release has the correct container", () => {
    const releaseName = "[req]Night of the Lepus (1972) DVDRip XviD avi";

    assert.deepStrictEqual(parse(releaseName).container, "avi");
  });
});
