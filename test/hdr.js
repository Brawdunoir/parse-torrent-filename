import assert from "assert";
import { parse } from "../index.js";

describe("Parsing hdr", () => {
  it("should detect HDR source correctly", () => {
    const releaseName = "The.Mandalorian.S01E06.4K.HDR.2160p 4.42GB";
    assert.deepStrictEqual(parse(releaseName).hdr, ["HDR"]);
  });

  it("should detect HDR10 source correctly", () => {
    const releaseName =
      "Spider-Man - Complete Movie Collection (2002-2022) 1080p.HEVC.HDR10.1920x800.x265. DTS-HD";
    assert.deepStrictEqual(parse(releaseName).hdr, ["HDR"]);
    assert.deepStrictEqual(parse(releaseName).bitDepth, "10bit");
  });

  it("should detect HDR10Plus source correctly", () => {
    const releaseName =
      "Bullet.Train.2022.2160p.AMZN.WEB-DL.x265.10bit.HDR10Plus.DDP5.1-SMURF";
    assert.deepStrictEqual(parse(releaseName).hdr, ["HDR10+"]);
    assert.deepStrictEqual(parse(releaseName).bitDepth, "10bit");
  });

  it("should detect DV source correctly v1", () => {
    const releaseName =
      "Belle (2021) 2160p 10bit 4KLight DOLBY VISION BluRay DDP 7.1 x265-QTZ";
    assert.deepStrictEqual(parse(releaseName).hdr, ["DV"]);
  });

  it("should detect DV source correctly v2", () => {
    const releaseName =
      "Андор / Andor [01x01-03 из 12] (2022) WEB-DL-HEVC 2160p | 4K | Dolby Vision TV | NewComers, HDRezka Studio";
    assert.deepStrictEqual(parse(releaseName).hdr, ["DV"]);
  });

  it("should detect DV source correctly v3", () => {
    const releaseName =
      "Bullet.Train.2022.2160p.WEB-DL.DDP5.1.DV.MKV.x265-NOGRP";
    assert.deepStrictEqual(parse(releaseName).hdr, ["DV"]);
  });

  it("should detect DV source correctly v4", () => {
    const releaseName =
      "Bullet.Train.2022.2160p.WEB-DL.DoVi.DD5.1.HEVC-EVO[TGx]";
    assert.deepStrictEqual(parse(releaseName).hdr, ["DV"]);
  });

  it("should detect HDR/DV source correctly v1", () => {
    const releaseName =
      "Спайдерхед / Spiderhead (2022) WEB-DL-HEVC 2160p | 4K | HDR | Dolby Vision Profile 8 | P | NewComers, Jaskier";
    assert.deepStrictEqual(parse(releaseName).hdr, ["DV", "HDR"]);
  });

  it("should detect HDR/DV source correctly v2", () => {
    const releaseName =
      "House.of.the.Dragon.S01E07.2160p.10bit.HDR.DV.WEBRip.6CH.x265.HEVC-PSA";
    assert.deepStrictEqual(parse(releaseName).hdr, ["DV", "HDR"]);
  });

  it("should detect HDR/HDR10+/DV source correctly", () => {
    const releaseName =
      "Флешбэк / Memory (2022) WEB-DL-HEVC 2160p | 4K | HDR | HDR10+ | Dolby Vision Profile 8 | Pazl Voice";
    assert.deepStrictEqual(parse(releaseName).hdr, ["DV", "HDR10+", "HDR"]);
  });
});
