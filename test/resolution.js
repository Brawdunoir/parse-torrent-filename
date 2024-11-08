import assert from "assert";
import { parse } from "../index.js";

describe("Parsing resolution", () => {
  it("should detect the 1080p resolution correctly", () => {
    const releaseName =
      "Annabelle.2014.1080p.PROPER.HC.WEBRip.x264.AAC.2.0-RARBG";
     assert.deepStrictEqual(parse(releaseName).resolution, "1080p");
  });

  it("should detect the 720p resolution correctly", () => {
    const releaseName =
      "doctor_who_2005.8x12.death_in_heaven.720p_hdtv_x264-fov";
     assert.deepStrictEqual(parse(releaseName).resolution, "720p");
  });

  it("should detect the 720p resolution with uppercase correctly", () => {
    const releaseName = "UFC 187 PPV 720P HDTV X264-KYR";
     assert.deepStrictEqual(parse(releaseName).resolution, "720p");
  });

  it("should detect the 4k resolution correctly", () => {
    const releaseName =
      "The Smurfs 2 2013 COMPLETE FULL BLURAY UHD (4K) - IPT EXCLUSIVE";
     assert.deepStrictEqual(parse(releaseName).resolution, "4k");
  });

  it("should detect the 2160p as 4k", () => {
    const releaseName = "Joker.2019.2160p.4K.BluRay.x265.10bit.HDR.AAC5.1";
     assert.deepStrictEqual(parse(releaseName).resolution, "4k");
  });

  it("should detect custom aspect ratio for 4k resolution correctly", () => {
    const releaseName =
      "[Beatrice-Raws] Evangelion 3.333 You Can (Not) Redo [BDRip 3840x1632 HEVC TrueHD]";
     assert.deepStrictEqual(parse(releaseName).resolution, "4k");
  });

  it("should detect custom aspect ratio for 1080p resolution correctly", () => {
    const releaseName =
      "[Erai-raws] Evangelion 3.0 You Can (Not) Redo - Movie [1920x960][Multiple Subtitle].mkv";
     assert.deepStrictEqual(parse(releaseName).resolution, "1080p");
  });

  it("should detect custom aspect ratio for 720p resolution correctly", () => {
    const releaseName =
      "[JacobSwaggedUp] Kizumonogatari I: Tekketsu-hen (BD 1280x544) [MP4 Movie]";
     assert.deepStrictEqual(parse(releaseName).resolution, "720p");
  });

  it("should detect 720i resolution and format as 720p", () => {
    const releaseName = "UFC 187 PPV 720i HDTV X264-KYR";
     assert.deepStrictEqual(parse(releaseName).resolution, "720p");
  });

  it("should detect typo in 720p", () => {
    const releaseName =
      "IT Chapter Two.2019.7200p.AMZN WEB-DL.H264.[Eng Hin Tam Tel]DDP 5.1.MSubs.D0T.Telly";
     assert.deepStrictEqual(parse(releaseName).resolution, "720p");
  });

  it("should detect typo in 1080p", () => {
    const releaseName = "Dumbo (1941) BRRip XvidHD 10800p-NPW";
     assert.deepStrictEqual(parse(releaseName).resolution, "1080p");
  });

  it("should detect 1080 without spaces and M prefix", () => {
    const releaseName = "BluesBrothers2M1080.www.newpct.com.mkv";
    assert.deepStrictEqual(parse(releaseName).resolution, "1080p");
    assert.deepStrictEqual(parse(releaseName).title, "BluesBrothers2");
  });

  it("should detect 1080 without spaces and BD prefix", () => {
    const releaseName = "BenHurParte2BD1080.www.newpct.com.mkv";
    assert.deepStrictEqual(parse(releaseName).resolution, "1080p");
    assert.deepStrictEqual(parse(releaseName).title, "BenHurParte2");
  });

  it("should detect 720 without spaces title prefix", () => {
    const releaseName = "1993720p_101_WWW.NEWPCT1.COM.mkvv";
     assert.deepStrictEqual(parse(releaseName).resolution, "720p");
  });
});
