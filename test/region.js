import assert from "assert";
import { parse } from "../index.js";

describe("Parsing region", () => {
  it("should detect the R5 region correctly", () => {
    const releaseName = "Welcome to New York 2014 R5 XviD AC3-SUPERFAST";
     assert.deepStrictEqual(parse(releaseName).region , "R5");
  });

  it("should not detect region in the title", () => {
    const releaseName =
      "[Coalgirls]_Code_Geass_R2_06_(1920x1080_Blu-ray_FLAC)_[F8C7FE25].mkv";
     assert.deepStrictEqual(parse(releaseName).proper, undefined);
  });
});
