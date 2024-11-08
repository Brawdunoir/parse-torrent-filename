import assert from "assert";
import { parse } from "../index.js";

describe("Parsing episode", () => {
  it("should detect regular episode correctly", () => {
    const releaseName = "The Simpsons S28E21 720p HDTV x264-AVS";
    assert.deepStrictEqual(parse(releaseName).episode, 21);
  });

  it("should detect regular episode with lowercase correctly", () => {
    const releaseName = "breaking.bad.s01e01.720p.bluray.x264-reward";
    assert.deepStrictEqual(parse(releaseName).episode, 1);
  });

  it("should detect regular episode with a space between", () => {
    const releaseName =
      "Dragon Ball Super S01 E23 French 1080p HDTV H264-Kesni";
    assert.deepStrictEqual(parse(releaseName).episode, 23);
  });

  it("should detect regular episode above 1000", () => {
    const releaseName =
      "One.Piece.S01E1116.Lets.Go.Get.It!.Buggys.Big.Declaration.2160p.B-Global.WEB-DL.JPN.AAC2.0.H.264.MSubs-ToonsHub.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 1116);
  });

  it("should detect regular episode without e symbol after season", () => {
    const releaseName = "The.Witcher.S01.07.2019.Dub.AVC.ExKinoRay.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 7);
  });

  it("should detect regular episode with season symbol but wihout episode symbol", () => {
    const releaseName = "Vikings.s02.09.AVC.tahiy.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 9);
  });

  it("should detect regular episode with a letter a suffix", () => {
    const releaseName = "The Twilight Zone 1985 S01E23a Shadow Play.mp4";
    assert.deepStrictEqual(parse(releaseName).episode, 23);
  });

  it("should detect regular episode without break at the end", () => {
    const releaseName =
      "Desperate_housewives_S03E02Le malheur aime la compagnie.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 2);
  });

  it("should detect regular episode with a letter b suffix", () => {
    const releaseName =
      "Mash S10E01b Thats Show Biz Part 2 1080p H.264 (moviesbyrizzo upload).mp4";
    assert.deepStrictEqual(parse(releaseName).episode, 1);
  });

  it("should detect regular episode with a letter c suffix", () => {
    const releaseName = "The Twilight Zone 1985 S01E22c The Library.mp4";
    assert.deepStrictEqual(parse(releaseName).episode, 22);
  });

  it("should detect regular episode without e separator", () => {
    const releaseName = "Desperate.Housewives.S0615.400p.WEB-DL.Rus.Eng.avi";
    assert.deepStrictEqual(parse(releaseName).episode, 15);
  });

  it("should detect episode with SxEE format correctly", () => {
    const releaseName = "Doctor.Who.2005.8x11.Dark.Water.720p.HDTV.x264-FoV";
    assert.deepStrictEqual(parse(releaseName).episode, 11);
  });

  it("should detect episode when written as such", () => {
    const releaseName = "Anubis saison 01 episode 38 tvrip FR";
    assert.deepStrictEqual(parse(releaseName).episode, 38);
  });

  it("should detect episode when written as such shortened", () => {
    const releaseName =
      "Le Monde Incroyable de Gumball - Saison 5 Ep 14 - L'extérieur";
    assert.deepStrictEqual(parse(releaseName).episode, 14);
  });

  it("should detect episode with parenthesis prefix and x separator", () => {
    const releaseName = "Smallville (1x02 Metamorphosis).avi";
    assert.deepStrictEqual(parse(releaseName).episode, 2);
  });

  it("should detect episode with x separator and letter on left", () => {
    const releaseName =
      "The.Man.In.The.High.Castle1x01.HDTV.XviD[www.DivxTotaL.com].avi";
    assert.deepStrictEqual(parse(releaseName).episode, 1);
  });

  it("should detect episode with x separator and letter on right", () => {
    const releaseName = "clny.3x11m720p.es[www.planetatorrent.com].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 11);
  });

  it("should detect episode when similar digits included", () => {
    const releaseName =
      "Friends.S07E20.The.One.With.Rachel's.Big.Kiss.720p.BluRay.2CH.x265.HEVC-PSA.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 20);
    assert.deepStrictEqual(parse(releaseName).season, 7);
  });

  it("should detect episode when separated with x and inside brackets", () => {
    const releaseName = "Friends - [8x18] - The One In Massapequa.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 18);
    assert.deepStrictEqual(parse(releaseName).season, 8);
  });

  it("should detect episode when separated with X", () => {
    const releaseName = "Archivo 81 1X7 HDTV XviD Castellano.avi";
    assert.deepStrictEqual(parse(releaseName).episode, 7);
    assert.deepStrictEqual(parse(releaseName).season, 1);
  });

  it("should detect multiple episodes with x prefix and hyphen separator", () => {
    const releaseName =
    "Friends - [7x23-24] - The One with Monica and Chandler's Wedding + Audio Commentary.mkv";
    assert.deepStrictEqual(parse(releaseName).episodes, [23, 24]);
    assert.deepStrictEqual(parse(releaseName).season, 7);
  });

  it("should detect episode when separated with x and has three digit episode", () => {
    const releaseName = "Yu-Gi-Oh 3x089 - Awakening of Evil (Part 4).avi";
    assert.deepStrictEqual(parse(releaseName).episode, 89);
  });

  it("should detect multiple episodes with hyphen no spaces separator", () => {
    const releaseName = "611-612 - Desperate Measures, Means & Ends.mp4";
    assert.deepStrictEqual(parse(releaseName).episodes, [611, 612]);
  });

  it("should detect multiple single episode with 10-bit notation in it", () => {
    const releaseName =
      "[Final8]Suisei no Gargantia - 05 (BD 10-bit 1920x1080 x264 FLAC)[E0B15ACF].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 5);
  });

  it("should detect multiple episodes with episodes prefix and hyphen separator", () => {
    const releaseName =
      "Orange Is The New Black Season 5 Episodes 1-10 INCOMPLETE (LEAKED)";
    assert.deepStrictEqual(parse(releaseName).episodes, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("should detect multiple episodes with ep prefix and hyphen separator inside parentheses", () => {
    const releaseName = "Vikings.Season.05.Ep(01-10).720p.WebRip.2Ch.x265.PSA";
    assert.deepStrictEqual(parse(releaseName).episodes, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("should detect multiple episodes with hyphen separator and follower by open parenthesis", () => {
    const releaseName = "[TBox] Dragon Ball Z Full 1-291(Subbed Jap Vers)";
    assert.deepStrictEqual(parse(releaseName).episodes, Array.from({ length: 291 }, (_, i) => i + 1));
  });

  it("should detect multiple episodes with e prefix and hyphen separator", () => {
    const releaseName =
      "Marvel's.Agents.of.S.H.I.E.L.D.S02E01-03.Shadows.1080p.WEB-DL.DD5.1";
    assert.deepStrictEqual(parse(releaseName).episodes, [1, 2, 3]);
  });

  it("should detect absolute episode with ep prefix", () => {
    const releaseName = "Naruto Shippuden Ep 107 - Strange Bedfellows.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 107);
  });

  it("should detect absolute episode in middle with hyphen dividers", () => {
    const releaseName = "Naruto Shippuden - 107 - Strange Bedfellows.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 107);
  });

  it("should detect absolute episode in middle with similar resolution value", () => {
    const releaseName =
      "[AnimeRG] Naruto Shippuden - 107 [720p] [x265] [pseudo].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 107);
  });

  it("should detect multiple absolute episodes separated by hyphen", () => {
    const releaseName = "Naruto Shippuuden - 006-007.mkv";
    assert.deepStrictEqual(parse(releaseName).episodes, [6, 7]);
  });

  it("should detect absolute episode correctly not hindered by title digits with hashtag", () => {
    const releaseName = "321 - Family Guy Viewer Mail #1.avi";
    assert.deepStrictEqual(parse(releaseName).episode, 321);
  });

  it("should detect absolute episode correctly not hindered by title digits with apostrophe", () => {
    const releaseName = "512 - Airport '07.avi";
    assert.deepStrictEqual(parse(releaseName).episode, 512);
  });

  it("should detect absolute episode at the begining even though its mixed with season", () => {
    const releaseName = "102 - The Invitation.avi";
    assert.deepStrictEqual(parse(releaseName).episode, 102);
  });

  it("should detect absolute episode double digit at the beginning", () => {
    const releaseName = "02 The Invitation.mp4";
    assert.deepStrictEqual(parse(releaseName).episode, 2);
  });

  it("should detect absolute episode triple digit at the beginning with zero padded", () => {
    const releaseName = "004 - Male Unbonding - [DVD].avi";
    assert.deepStrictEqual(parse(releaseName).episode, 4);
  });

  it("should detect multiple absolute episodes separated by comma", () => {
    const releaseName =
      "The Amazing World of Gumball - 103, 104 - The Third - The Debt.mkv";
    assert.deepStrictEqual(parse(releaseName).episodes, [103, 104]);
  });

  it("should detect absolute episode with a possible match at the end", () => {
    const releaseName =
      "The Amazing World of Gumball - 103 - The End - The Dress (720p.x264.ac3-5.1) [449].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 103);
  });

  it("should detect absolute episode with a divided episode into a part", () => {
    const releaseName =
      "The Amazing World of Gumball - 107a - The Mystery (720p.x264.ac3-5.1) [449].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 107);
  });

  it("should detect absolute episode with a divided episode into b part", () => {
    const releaseName =
      "The Amazing World of Gumball - 107b - The Mystery (720p.x264.ac3-5.1) [449].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 107);
  });

  it("should detect episode withing brackets with dot separator", () => {
    const releaseName = "[5.01] Weight Loss.avi";
    assert.deepStrictEqual(parse(releaseName).episode, 1);
  });

  it("should detect episode in hundreds withing brackets with dot separator", () => {
    const releaseName = "Dragon Ball [5.134] Preliminary Peril.mp4";
    assert.deepStrictEqual(parse(releaseName).episode, 134);
  });

  it("should detect episode with spaces and hyphen separator", () => {
    const releaseName = "S01 - E03 - Fifty-Fifty.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 3);
  });

  it("should detect multiple episodes separated with plus", () => {
    const releaseName = "The Office S07E25+E26 Search Committee.mp4";
    assert.deepStrictEqual(parse(releaseName).episodes, [25, 26]);
  });

  it("[animeawake] Naruto Shippuden - 124 - Art_2.mkv", () => {
    const releaseName = "[animeawake] Naruto Shippuden - 124 - Art_2.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 124);
  });

  it("[animeawake] Naruto Shippuden - 072 - The Quietly Approaching Threat_2.mkv", () => {
    const releaseName =
      "[animeawake] Naruto Shippuden - 072 - The Quietly Approaching Threat_2.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 72);
  });

  it("[animeawake] Naruto Shippuden - 120 - Kakashi Chronicles. Boys' Life on the Battlefield. Part 2.mkv", () => {
    const releaseName =
      "[animeawake] Naruto Shippuden - 120 - Kakashi Chronicles. Boys' Life on the Battlefield. Part 2.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 120);
  });

  it("should detect single episode even when a possible range identifier hyphen is present", () => {
    const releaseName =
      "Supernatural - S03E01 - 720p BluRay x264-Belex - Dual Audio + Legenda.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 1);
  });

  it("should not detect episodes when the range is for season", () => {
    const releaseName =
      "[F-D] Fairy Tail Season 1 -6 + Extras [480P][Dual-Audio]";
    assert.deepStrictEqual(parse(releaseName).episode, undefined);
    assert.deepStrictEqual(parse(releaseName).episodes, undefined);
  });

  it("should not detect episodes when the range is for seasons", () => {
    const releaseName = "House MD All Seasons (1-8) 720p Ultra-Compressed";
    assert.deepStrictEqual(parse(releaseName).episode, undefined);
    assert.deepStrictEqual(parse(releaseName).episodes, undefined);
  });

  it("should not detect episode when it indicates sequence of the movie in between hyhen separators", () => {
    const releaseName = "Dragon Ball Z Movie - 09 - Bojack Unbound - 1080p";
    assert.deepStrictEqual(parse(releaseName).episode, undefined);
    assert.deepStrictEqual(parse(releaseName).episodes, undefined);
  });

  it("should not detect episode when it indicates sequence of the movie at the start", () => {
    const releaseName = "09 Movie - Dragon Ball Z - Bojack Unbound";
    assert.deepStrictEqual(parse(releaseName).episode, undefined);
    assert.deepStrictEqual(parse(releaseName).episodes, undefined);
  });

  it("should detect detect episode with x separator and e prefix", () => {
    const releaseName = "24 - S01xE03.mp4";
    assert.deepStrictEqual(parse(releaseName).episode, 3);
    assert.deepStrictEqual(parse(releaseName).season, 1);
  });

  it("should detect detect episode correctly and not episode range ", () => {
    const releaseName = "24 - S01E04 - x264 - dilpill.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 4);
  });

  it("should detect detect episode correctly and not episode range with two codecs", () => {
    const releaseName = "24.Legacy.S01E05.720p.HEVC.x265-MeGusta";
    assert.deepStrictEqual(parse(releaseName).episode, 5);
  });

  it("should detect detect absolute episode with a version", () => {
    const releaseName = "[F-D] Fairy.Tail.-.004v2.-. [480P][Dual-Audio].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 4);
  });

  it("should detect detect anime episode when title contains number range", () => {
    const releaseName =
      "[Erai-raws] 2-5 Jigen no Ririsa - 08 [480p][Multiple Subtitle][972D0669].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 8);
  });

  it("should detect detect absolute episode with a version and ep suffix", () => {
    const releaseName =
      "[Exiled-Destiny]_Tokyo_Underground_Ep02v2_(41858470).mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 2);
  });

  it("should detect detect absolute episode and not detect any season modifier", () => {
    const releaseName =
      "[a-s]_fairy_tail_-_003_-_infiltrate_the_everlue_mansion__rs2_[1080p_bd-rip][4CB16872].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 3);
    assert.deepStrictEqual(parse(releaseName).seasons, undefined);
  });

  it("should detect episode after season with separator", () => {
    const releaseName =
      "Food Wars! Shokugeki No Souma S4 - 11 (1080p)(HEVC x265 10bit)";
    assert.deepStrictEqual(parse(releaseName).episode, 11);
  });

  it("should not detect episode range for mismatch episode marker e vs ep", () => {
    const releaseName = "Dragon Ball Super S05E53 - Ep.129.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 53);
  });

  it("should not detect episode range with other parameter ending", () => {
    const releaseName =
      "DShaun.Micallefs.MAD.AS.HELL.S10E03.576p.x642-YADNUM.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 3);
  });

  it("should not detect episode range with spaced hyphen separator", () => {
    const releaseName =
      "The Avengers (EMH) - S01 E15 - 459 (1080p - BluRay).mp4";
    assert.deepStrictEqual(parse(releaseName).episode, 15);
  });

  it("should detect episode with a dot and hyphen separator", () => {
    const releaseName = "My Little Pony FiM - 6.01 - No Second Prances.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 1);
  });

  it("should detect season with a dot and episode prefix", () => {
    const releaseName =
      "Desperate Housewives - Episode 1.22 - Goodbye for now.avi";
    assert.deepStrictEqual(parse(releaseName).episode, 22);
  });

  it("should detect season with a dot and episode prefix v2", () => {
    const releaseName = "All of Us Are Dead . 2022 . S01 EP #1.2.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 2);
  });

  it("should detect episode with number in a title", () => {
    const releaseName = "Mob Psycho 100 - 09 [1080p].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 9);
  });

  it("should detect episode with number and a hyphen after it in a title", () => {
    const releaseName = "3-Nen D-Gumi Glass no Kamen - 13 [480p]";
    assert.deepStrictEqual(parse(releaseName).episode, 13);
  });

  it("should detect episode with of separator", () => {
    const releaseName =
      "BBC Indian Ocean with Simon Reeve 5of6 Sri Lanka to Bangladesh.avi";
    assert.deepStrictEqual(parse(releaseName).episode, 5);
  });

  it("should detect episode with of separator v1", () => {
    const releaseName = "Witches Of Salem - 2Of4 - Road To Hell - Gr.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 2);
  });

  it("should detect episode with of separator v2", () => {
    const releaseName =
      "Das Boot Miniseries Original Uncut-Reevel Cd2 Of 3.avi";
    assert.deepStrictEqual(parse(releaseName).episode, 2);
  });

  it("should detect multiple episodes with multiple E sign and no separator", () => {
    const releaseName = "Stargate Universe S01E01E02E03.mp4";
    assert.deepStrictEqual(parse(releaseName).episodes, [1, 2, 3]);
  });

  it("should detect multiple episodes with multiple E sign and hyphen separator", () => {
    const releaseName = "Stargate Universe S01E01-E02-E03.mp4";
    assert.deepStrictEqual(parse(releaseName).episodes, [1, 2, 3]);
  });

  it("should detect multiple episodes with eps prefix and hyphen separator", () => {
    const releaseName = "MARATHON EPISODES/Orphan Black S3 Eps.05-08.mp4";
    assert.deepStrictEqual(parse(releaseName).episodes, [5, 6, 7, 8]);
  });

  it("should detect multiple episodes with E sign and hyphen spaced separator", () => {
    const releaseName = "Pokemon Black & White E10 - E17 [CW] AVI";
    assert.deepStrictEqual(parse(releaseName).episodes, Array.from({ length: 8 }, (_, i) => i + 10));
  });

  it("should detect multiple episodes with E sign and hyphen separator", () => {
    const releaseName = "Pokémon.S01E01-E04.SWEDISH.VHSRip.XviD-aka";
    assert.deepStrictEqual(parse(releaseName).episodes, [1, 2, 3, 4]);
  });

  it("should detect episode with single episode and not range", () => {
    const releaseName = "[HorribleSubs] White Album 2 - 06 [1080p].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 6);
  });

  it("should detect episode with E symbols without season", () => {
    const releaseName = "Mob.Psycho.100.II.E10.720p.WEB.x264-URANiME.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 10);
  });

  it("should detect episode with E symbols without season v2", () => {
    const releaseName = "E5.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 5);
  });

  it("should detect episode without season", () => {
    const releaseName = "[OMDA] Bleach - 002 (480p x264 AAC) [rich_jc].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 2);
  });

  it("should detect episode with a episode code including multiple numbers", () => {
    const releaseName =
      "[ACX]El_Cazador_de_la_Bruja_-_19_-_A_Man_Who_Protects_[SSJ_Saiyan_Elite]_[9E199846].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 19);
  });

  it("should detect multiple episodes with x episode marker and hyphen separator", () => {
    const releaseName =
      "BoJack Horseman [06x01-08 of 16] (2019-2020) WEB-DLRip 720p";
    assert.deepStrictEqual(parse(releaseName).episodes, Array.from({ length: 8 }, (_, i) => i + 1));
  });

  it("should detect multiple episodes with russian episode marker and hyphen separator", () => {
    const releaseName =
      "Мистер Робот / Mr. Robot / Сезон: 2 / Серии: 1-5 (12) [2016, США, WEBRip 1080p] MVO";
    assert.deepStrictEqual(parse(releaseName).episodes, [1, 2, 3, 4, 5]);
  });

  it("should detect episode with russian episode marker and single episode", () => {
    const releaseName =
      "Викинги / Vikings / Сезон: 5 / Серии: 1 [2017, WEB-DL 1080p] MVO";
    assert.deepStrictEqual(parse(releaseName).episode, 1);
  });

  it("should detect episode with russian episode marker and single episode and with total episodes value", () => {
    const releaseName =
      "Викинги / Vikings / Сезон: 5 / Серии: 1 из 20 [2017, WEB-DL 1080p] MVO";
    assert.deepStrictEqual(parse(releaseName).episode, 1);
  });

  it("should detect episode with russian arabic total episodes value separator", () => {
    const releaseName = "Prehistoric park.3iz6.Supercroc.DVDRip.Xvid.avi";
    assert.deepStrictEqual(parse(releaseName).episode, 3);
  });

  it("should detect episode with shortened russian episode name", () => {
    const releaseName = "Меч (05 сер.) - webrip1080p.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 5);
  });

  it("should detect episode with full russian episode name", () => {
    const releaseName = "Серия 11.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 11);
  });

  it("should detect episode with full different russian episode name", () => {
    const releaseName =
      "Разрушители легенд. MythBusters. Сезон 15. Эпизод 09. Скрытая угроза (2015).avi";
    assert.deepStrictEqual(parse(releaseName).episode, 9);
  });

  it("should detect episode with full different russian episode name v2", () => {
    const releaseName =
      "Леди Баг и Супер-Кот – Сезон 3, Эпизод 21 – Кукловод 2 [1080p].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 21);
  });

  it("should detect episode with full russian episode name with case suffix", () => {
    const releaseName =
      "Проклятие острова ОУК_ 5-й сезон 09-я серия_ Прорыв Дэна.avi";
    assert.deepStrictEqual(parse(releaseName).episode, 9);
  });

  it("should detect episode with full russian episode name and no prefix", () => {
    const releaseName = "Интерны. Сезон №9. Серия №180.avi";
    assert.deepStrictEqual(parse(releaseName).episode, 180);
  });

  it("should detect episode with russian episode name in non kirilica", () => {
    const releaseName =
      "Tajny.sledstviya-20.01.serya.WEB-DL.(1080p).by.lunkin.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 1);
  });

  it("should detect episode with russian episode name in non kirilica alternative 2", () => {
    const releaseName =
      "Zvezdnie.Voiny.Voina.Klonov.3.sezon.22.seria.iz.22.XviD.HDRip.avi";
    assert.deepStrictEqual(parse(releaseName).episode, 22);
  });

  it("should detect season with russian episode shortened word", () => {
    const releaseName =
      "Otchayannie.domochozyaiki.(8.sez.21.ser.iz.23).2012.XviD.HDTVRip.avi";
    assert.deepStrictEqual(parse(releaseName).episode, 21);
  });

  it("should detect episode with russian episode name in non kirilica alternative 3", () => {
    const releaseName = "MosGaz.(08.seriya).2012.WEB-DLRip(AVC).ExKinoRay.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 8);
  });

  it("should detect episode with russian episode name in non kirilica alternative 5", () => {
    const releaseName =
      "Tajny.sledstvija.(2.sezon.12.serija.iz.12).2002.XviD.DVDRip.avi";
    assert.deepStrictEqual(parse(releaseName).episode, 12);
  });

  it("should detect episodes with russian x separator", () => {
    const releaseName =
      "Discovery. Парни с Юкона / Yokon Men [06х01-08] (2017) HDTVRip от GeneralFilm | P1";
    assert.deepStrictEqual(parse(releaseName).episodes, Array.from({ length: 8 }, (_, i) => i + 1));
  });

  it("should detect episodes with hyphen separator between episode", () => {
    const releaseName = "2-06. Девичья сила.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 6);
  });

  it("should detect episodes with hyphen separator between episode v2", () => {
    const releaseName = "4-13 Cursed (HD).m4v";
    assert.deepStrictEqual(parse(releaseName).episode, 13);
  });

  it("should detect not episodes with hyphen separator between episode when it's date", () => {
    const releaseName = "The Ed Show 10-19-12.mp4";
    assert.deepStrictEqual(parse(releaseName).episodes, undefined);
    assert.deepStrictEqual(parse(releaseName).date, "2012-10-19");
  });

  it("should detect not episodes with hyphen separator between episode when it's not supported date", () => {
    const releaseName =
      "Hogan's Heroes - 516 - Get Fit or Go Flight - 1-09-70.divx";
    assert.deepStrictEqual(parse(releaseName).episode, 516);
  });

  it("should detect episodes with hyphen separator between episode v3", () => {
    const releaseName = "Доктор Хаус 03-20.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 20);
  });

  it("should detect episodes with hyphen separator between episode v4", () => {
    const releaseName = "Комиссар Рекс 11-13.avi";
    assert.deepStrictEqual(parse(releaseName).episode, 13);
  });

  it("should detect episode after ordinal season and hyphen separator", () => {
    const releaseName = "Kyoukai no Rinne (TV) 3rd Season - 23 [1080p]";
    assert.deepStrictEqual(parse(releaseName).episode, 23);
  });

  it("should detect episode after ordinal season and hyphen separator and multiple spaces", () => {
    const releaseName =
      "[224] Shingeki no Kyojin - S03 - Part 1 -  13 [BDRip.1080p.x265.FLAC].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 13);
  });

  it("should detect spanish full episode identifier", () => {
    const releaseName = "El Chema Temporada 1 Capitulo 25";
    assert.deepStrictEqual(parse(releaseName).episode, 25);
  });

  it("should detect spanish partial episode identifier", () => {
    const releaseName =
      "Juego de Tronos - Temp.2 [ALTA DEFINICION 720p][Cap.209][Spanish].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 209);
  });

  it("should detect spanish partial long episode identifier", () => {
    const releaseName =
      "Blue Bloods - Temporada 11 [HDTV 720p][Cap.1103][AC3 5.1 Castellano][www.PCTmix.com].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 1103);
  });

  it("should detect spanish partial episode identifier with common typo", () => {
    const releaseName =
      "Para toda la humanidad [4k 2160p][Caap.406](wolfmax4k.com).mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 406);
  });

  it("should detect spanish partial episode identifier v2", () => {
    const releaseName = "Mazinger-Z-Cap-52.avi";
    assert.deepStrictEqual(parse(releaseName).episode, 52);
  });

  it("should detect latino full episode identifier", () => {
    const releaseName =
      "Yu-Gi-Oh! ZEXAL Temporada 1 Episodio 009 Dual Latino e Inglés [B3B4970E].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 9);
  });

  it("should detect spanish multiple episode identifier", () => {
    const releaseName = "Bleach 10º Temporada - 215 ao 220 - [DB-BR]";
    assert.deepStrictEqual(parse(releaseName).episodes, [215, 216, 217, 218, 219, 220]);
  });

  it("should detect spanish short season identifier", () => {
    const releaseName = "My Little Pony - A Amizade é Mágica - T02E22.mp4";
    assert.deepStrictEqual(parse(releaseName).episode, 22);
  });

  it("should detect spanish short season identifier with xe separator", () => {
    const releaseName = "30 M0N3D4S ESP T01XE08.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 8);
  });

  it("should not detect episode in episode checksum code", () => {
    const releaseName =
      "[CBM]_Medaka_Box_-_11_-_This_Is_the_End!!_[720p]_[436E0E90].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 11);
  });

  it("should not detect episode in episode checksum code without container", () => {
    const releaseName =
      "[CBM]_Medaka_Box_-_11_-_This_Is_the_End!!_[720p]_[436E0E90]";
    assert.deepStrictEqual(parse(releaseName).episode, 11);
  });

  it("should not detect episode in episode checksum code with paranthesis", () => {
    const releaseName =
      "(Hi10)_Re_Zero_Shin_Henshuu-ban_-_02v2_(720p)_(DDY)_(72006E34).mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 2);
  });

  it("should not detect episode before season", () => {
    const releaseName =
      "22-7 (Season 1) (1080p)(HEVC x265 10bit)(Eng-Subs)-Judas[TGx] ⭐";
    assert.deepStrictEqual(parse(releaseName).episode, undefined);
  });

  it("should detect multiple episode with tilde separator", () => {
    const releaseName =
      "[Erai-raws] Carole and Tuesday - 01 ~ 12 [1080p][Multiple Subtitle]";
    assert.deepStrictEqual(parse(releaseName).episodes, Array.from({ length: 12 }, (_, i) => i + 1));
  });

  it("should detect multiple episode with tilde separator and season prefix", () => {
    const releaseName =
      "[Erai-raws] 3D Kanojo - Real Girl 2nd Season - 01 ~ 12 [720p]";
    assert.deepStrictEqual(parse(releaseName).episodes, Array.from({ length: 12 }, (_, i) => i + 1));
  });

  it("should detect multiple episode with hyphen separator", () => {
    const releaseName =
      "[FFA] Koi to Producer: EVOL×LOVE - 01 - 12 [1080p][HEVC][AAC]";
    assert.deepStrictEqual(parse(releaseName).episodes, Array.from({ length: 12 }, (_, i) => i + 1));
  });

  it("should detect multiple episode with hyphen separator between parenthesis", () => {
    const releaseName =
      "[BenjiD] Quan Zhi Gao Shou (The King’s Avatar) / Full-Time Master S01 (01 - 12) [1080p x265] [Soft sub] V2";
    assert.deepStrictEqual(parse(releaseName).episodes, Array.from({ length: 12 }, (_, i) => i + 1));
  });

  it("[HR] Boku no Hero Academia 87 (S4-24) [1080p HEVC Multi-Subs] HR-GZ", () => {
    const releaseName =
      "[HR] Boku no Hero Academia 87 (S4-24) [1080p HEVC Multi-Subs] HR-GZ";
    assert.deepStrictEqual(parse(releaseName).episode, 24);
  });

  it("Tokyo Ghoul Root A - 07 [S2-07] [Eng Sub] 480p [email protected]", () => {
    const releaseName =
      "Tokyo Ghoul Root A - 07 [S2-07] [Eng Sub] 480p [email protected]";
    assert.deepStrictEqual(parse(releaseName).episode, 7);
  });

  it("black-ish.S05E02.1080p..x265.10bit.EAC3.6.0-Qman[UTR].mkv", () => {
    const releaseName =
      "black-ish.S05E02.1080p..x265.10bit.EAC3.6.0-Qman[UTR].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 2);
  });

  it("[Eng Sub] Rebirth Ep #36 [8CF3ADFA].mkv", () => {
    const releaseName = "[Eng Sub] Rebirth Ep #36 [8CF3ADFA].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 36);
  });

  it("[92 Impatient Eilas & Miyafuji] Strike Witches - Road to Berlin - 01 [1080p][BCDFF6A2].mkv", () => {
    const releaseName =
      "[92 Impatient Eilas & Miyafuji] Strike Witches - Road to Berlin - 01 [1080p][BCDFF6A2].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 1);
  });

  it("[224] Darling in the FranXX - 14 [BDRip.1080p.x265.FLAC].mkv", () => {
    const releaseName =
      "[224] Darling in the FranXX - 14 [BDRip.1080p.x265.FLAC].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 14);
  });

  it("[Erai-raws] Granblue Fantasy The Animation Season 2 - 10 [1080p][Multiple Subtitle].mkv", () => {
    const releaseName =
      "[Erai-raws] Granblue Fantasy The Animation Season 2 - 10 [1080p][Multiple Subtitle].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 10);
  });

  it("[Erai-raws] Shingeki no Kyojin Season 3 - 11 [1080p][Multiple Subtitle].mkv", () => {
    const releaseName =
      "[Erai-raws] Shingeki no Kyojin Season 3 - 11 [1080p][Multiple Subtitle].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 11);
  });

  it("should detect single zero episode", () => {
    const releaseName = "DARKER THAN BLACK - S00E00.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 0);
  });

  it("should detect anime episode when title contain similar pattern", () => {
    const releaseName = "[Erai-raws] 22-7 - 11 .mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 11);
  });

  it("should detect anime episode after year in title", () => {
    const releaseName =
      "[Golumpa] Star Blazers 2202 - 22 (Uchuu Senkan Yamato 2022) [FuniDub 1080p x264 AAC] [A24B89C8].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 22);
  });

  it("should detect anime episode after year property", () => {
    const releaseName =
      "[SubsPlease] Digimon Adventure (2020) - 35 (720p) [4E7BA28A].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 35);
  });

  it("should detect anime episode with hyphen number in title", () => {
    const releaseName =
      "[SubsPlease] Fairy Tail - 100 Years Quest - 05 (1080p) [1107F3A9].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 5);
  });

  it("should detect anime episode recap episode", () => {
    const releaseName = "[KH] Sword Art Online II - 14.5 - Debriefing.mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 14);
  });

  it("should detect four digit anime episode", () => {
    const releaseName = "[SSA] Detective Conan - 1001 [720p].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 1001);
  });

  it("should detect season_episode pattern", () => {
    const releaseName = "Pwer-04_05.avi";
    assert.deepStrictEqual(parse(releaseName).season, 4);
    assert.deepStrictEqual(parse(releaseName).episode, 5);
  });

  it("should detect season_episode pattern v2", () => {
    const releaseName = "SupNat-11_06.avi";
    assert.deepStrictEqual(parse(releaseName).season, 11);
    assert.deepStrictEqual(parse(releaseName).episode, 6);
  });

  it("should detect season_episode pattern v3", () => {
    const releaseName = "office_03_19.avi";
    assert.deepStrictEqual(parse(releaseName).season, 3);
    assert.deepStrictEqual(parse(releaseName).episode, 19);
  });

  it("should detect season_episode pattern with years in title", () => {
    const releaseName = "Spergrl-2016-02_04.avi";
    assert.deepStrictEqual(parse(releaseName).season, 2);
    assert.deepStrictEqual(parse(releaseName).episode, 4);
  });

  it("should detect final with dash season_episode pattern with years in title", () => {
    const releaseName = "Iron-Fist-2017-01_13-F.avi";
    assert.deepStrictEqual(parse(releaseName).season, 1);
    assert.deepStrictEqual(parse(releaseName).episode, 13);
  });

  it("should detect final with dot season_episode pattern with years in title", () => {
    const releaseName = "Lgds.of.Tmrow-02_17.F.avi";
    assert.deepStrictEqual(parse(releaseName).season, 2);
    assert.deepStrictEqual(parse(releaseName).episode, 17);
  });

  it("should detect season.episode pattern", () => {
    const releaseName = "Ozk.02.09.avi";
    assert.deepStrictEqual(parse(releaseName).season, 2);
    assert.deepStrictEqual(parse(releaseName).episode, 9);
  });

  it("should detect final season.episode pattern", () => {
    const releaseName = "Ozk.02.10.F.avi";
    assert.deepStrictEqual(parse(releaseName).season, 2);
    assert.deepStrictEqual(parse(releaseName).episode, 10);
  });

  it("should detect not detect season_episode pattern when other pattern present", () => {
    const releaseName = "Cestovatelé_S02E04_11_27.mkv";
    assert.deepStrictEqual(parse(releaseName).season, 2);
    assert.deepStrictEqual(parse(releaseName).episode, 4);
  });

  it("should detect not detect season_episode pattern when it's additional info", () => {
    const releaseName = "S03E13_91.avi";
    assert.deepStrictEqual(parse(releaseName).season, 3);
    assert.deepStrictEqual(parse(releaseName).episode, 13);
  });

  it("should detect not detect season.episode pattern (not working yet)", () => {
    const releaseName = "wwe.nxt.uk.11.26.mkv";
    assert.deepStrictEqual(parse(releaseName).season, 11);
    assert.deepStrictEqual(parse(releaseName).episode, 26);
  });

  it("should detect not detect season.episode pattern when other pattern present", () => {
    const releaseName = "Chernobyl.S01E01.1.23.45.mkv";
    assert.deepStrictEqual(parse(releaseName).season, 1);
    assert.deepStrictEqual(parse(releaseName).episode, 1);
  });

  it("should detect season.episode pattern with S identifier", () => {
    const releaseName = "The.Witcher.S01.07.mp4";
    assert.deepStrictEqual(parse(releaseName).season, 1);
    assert.deepStrictEqual(parse(releaseName).episode, 7);
  });

  it("should detect season episode pattern with S identifier", () => {
    const releaseName = "Breaking Bad S02 03.mkv";
    assert.deepStrictEqual(parse(releaseName).season, 2);
    assert.deepStrictEqual(parse(releaseName).episode, 3);
  });

  it("should detect season episode pattern with Season prefix", () => {
    const releaseName = "NCIS Season 11 01.mp4";

    assert.deepStrictEqual(parse(releaseName).season, 11);
    assert.deepStrictEqual(parse(releaseName).episode, 1);
  });

  it("should detect not detect season.episode pattern when it's a date", () => {
    const releaseName = "Top Gear - 3x05 - 2003.11.23.avi";
    assert.deepStrictEqual(parse(releaseName).episode, 5);
    assert.deepStrictEqual(parse(releaseName).season, 3);
  });

  it("should detect episode in brackets", () => {
    const releaseName = "[KTKJ]_[BLEACH]_[DVDRIP]_[116]_[x264_640x480_aac].mkv";
    assert.deepStrictEqual(parse(releaseName).episode, 116);
  });

  it("should detect episode in brackets but not years", () => {
    const releaseName =
      "[GM-Team][国漫][绝代双骄][Legendary Twins][2022][08][HEVC][GB][4K].mp4";
    assert.deepStrictEqual(parse(releaseName).episode, 8);
  });

  it("should not detect season-episode pattern when with dot split", () => {
    const releaseName = "SG-1. Season 4.16. (2010).avi";
    assert.deepStrictEqual(parse(releaseName).episode, 16);
    assert.deepStrictEqual(parse(releaseName).season, 4);
  });

  xit("should not detect season-episode pattern when it's a date", () => {
    const releaseName = "8-6 2006.07.16.avi";
    assert.deepStrictEqual(parse(releaseName).episode, 6);
    assert.deepStrictEqual(parse(releaseName).season, 8);
  });

  it("should not detect season episode pattern but absolute episode", () => {
    const releaseName = "523 23.mp4";
    assert.deepStrictEqual(parse(releaseName).episode, 523);
    assert.deepStrictEqual(parse(releaseName).season, undefined);
  });

  it("should detect only episode", () => {
    const releaseName = "Chernobyl E02 1 23 45.mp4";
    assert.deepStrictEqual(parse(releaseName).episode, 2);
    assert.deepStrictEqual(parse(releaseName).season, undefined);
  });

  it("should detect only episode v2", () => {
    const releaseName =
      "Watch Gary And His Demons Episode 10 - 0.00.07-0.11.02.mp4";
    assert.deepStrictEqual(parse(releaseName).episode, 10);
    assert.deepStrictEqual(parse(releaseName).season, undefined);
  });

  it("should not detect season.episode pattern when it's a date without other pattern", () => {
    const releaseName = "wwf.raw.is.war.18.09.00.avi";
    assert.deepStrictEqual(parse(releaseName).episode, undefined);
    assert.deepStrictEqual(parse(releaseName).episodes, undefined);
    assert.deepStrictEqual(parse(releaseName).season, undefined);
  });
});
