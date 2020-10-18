const { expect } = require("chai");
const parse = require("../index").parse;

describe("Parsing episode code", () => {
    it("[Golumpa] Fairy Tail - 214 [FuniDub 720p x264 AAC] [5E46AC39].mkv", () => {
        const releaseName = "[Golumpa] Fairy Tail - 214 [FuniDub 720p x264 AAC] [5E46AC39].mkv";

        expect(parse(releaseName)).to.deep.include({ episodeCode: "5E46AC39" });
    });

    it("[Exiled-Destiny]_Tokyo_Underground_Ep02v2_(41858470).mkv", () => {
        const releaseName = "[Exiled-Destiny]_Tokyo_Underground_Ep02v2_(41858470).mkv";

        expect(parse(releaseName)).to.deep.include({ episodeCode: "41858470" });
    });

    it("[ACX]El_Cazador_de_la_Bruja_-_19_-_A_Man_Who_Protects_[SSJ_Saiyan_Elite]_[9E199846].mkv", () => {
        const releaseName = "[ACX]El_Cazador_de_la_Bruja_-_19_-_A_Man_Who_Protects_[SSJ_Saiyan_Elite]_[9E199846].mkv";

        expect(parse(releaseName)).to.deep.include({ episodeCode: "9E199846" });
    });

    it("[CBM]_Medaka_Box_-_11_-_This_Is_the_End!!_[720p]_[436E0E90]", () => {
        const releaseName = "[CBM]_Medaka_Box_-_11_-_This_Is_the_End!!_[720p]_[436E0E90]";

        expect(parse(releaseName)).to.deep.include({ episodeCode: "436E0E90" });
    });
});
