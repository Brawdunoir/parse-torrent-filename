import assert from "assert";
import { parse } from "../index.js";

describe("Parsing season", () => {
  it("should detect regular season correctly", () => {
    const releaseName = "The Simpsons S28E21 720p HDTV x264-AVS";
    assert.deepStrictEqual(parse(releaseName).season, 28);
  });

  it("should detect regular season with lowercase correctly", () => {
    const releaseName = "breaking.bad.s01e01.720p.bluray.x264-reward";
    assert.deepStrictEqual(parse(releaseName).season, 1);
  });

  it("should detect regular season with 3 digits", () => {
    const releaseName = "S011E16.mkv";
    assert.deepStrictEqual(parse(releaseName).season, 11);
  });

  it("should detect regular season with a space between", () => {
    const releaseName =
      "Dragon Ball Super S01 E23 French 1080p HDTV H264-Kesni";
    assert.deepStrictEqual(parse(releaseName).season, 1);
  });

  it("should detect regular season with a letter a suffix", () => {
    const releaseName = "The Twilight Zone 1985 S01E23a Shadow Play.mp4";
    assert.deepStrictEqual(parse(releaseName).season, 1);
  });

  it("should detect regular season with a letter b suffix", () => {
    const releaseName =
      "Mash S10E01b Thats Show Biz Part 2 1080p H.264 (moviesbyrizzo upload).mp4";
    assert.deepStrictEqual(parse(releaseName).season, 10);
  });

  it("should detect regular season with a letter c suffix", () => {
    const releaseName = "The Twilight Zone 1985 S01E22c The Library.mp4";
    assert.deepStrictEqual(parse(releaseName).season, 1);
  });

  it("should detect regular episode without e separator", () => {
    const releaseName = "Desperate.Housewives.S0615.400p.WEB-DL.Rus.Eng.avi";
    assert.deepStrictEqual(parse(releaseName).season, 6);
  });

  it("should detect season with SxEE format correctly", () => {
    const releaseName = "Doctor.Who.2005.8x11.Dark.Water.720p.HDTV.x264-FoV";
    assert.deepStrictEqual(parse(releaseName).season, 8);
  });

  it("should detect season when written as such", () => {
    const releaseName =
      "Orange Is The New Black Season 5 Episodes 1-10 INCOMPLETE (LEAKED)";
    assert.deepStrictEqual(parse(releaseName).season, 5);
  });

  it("should detect season with parenthesis prefix and x separator", () => {
    const releaseName = "Smallville (1x02 Metamorphosis).avi";
    assert.deepStrictEqual(parse(releaseName).season, 1);
  });

  it("should detect season with x separator and letter on left", () => {
    const releaseName =
      "The.Man.In.The.High.Castle1x01.HDTV.XviD[www.DivxTotaL.com].avi";
    assert.deepStrictEqual(parse(releaseName).season, 1);
  });

  it("should detect season with x separator and letter on right", () => {
    const releaseName = "clny.3x11m720p.es[www.planetatorrent.com].mkv";
    assert.deepStrictEqual(parse(releaseName).season, 3);
  });

  it("should detect multiple seasons separated with comma", () => {
    const releaseName =
      "Game Of Thrones Complete Season 1,2,3,4,5,6,7 406p mkv + Subs";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3, 4, 5, 6, 7]);
  });

  it("should detect multiple seasons separated with space with redundant digit suffix", () => {
    const releaseName =
      "Futurama Season 1 2 3 4 5 6 7 + 4 Movies - threesixtyp";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3, 4, 5, 6, 7]);
  });

  it("should detect multiple season separated with spaces and comma", () => {
    const releaseName =
    "Breaking Bad Complete Season 1 , 2 , 3, 4 ,5 ,1080p HEVC";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3, 4, 5]);
  });

  it("should detect multiple season separated with comma, space and symbol at the end", () => {
    const releaseName =
    "True Blood Season 1, 2, 3, 4, 5 & 6 + Extras BDRip TSV";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3, 4, 5, 6]);
  });

  it("How I Met Your Mother Season 1, 2, 3, 4, 5, & 6 + Extras DVDRip", () => {
    const releaseName =
      "How I Met Your Mother Season 1, 2, 3, 4, 5, & 6 + Extras DVDRip";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3, 4, 5, 6]);
  });

  it("should detect multiple seasons separated with space", () => {
    const releaseName =
      "The Simpsons Season 20 21 22 23 24 25 26 27 - threesixtyp";
    assert.deepStrictEqual(parse(releaseName).seasons, [20, 21, 22, 23, 24, 25, 26, 27]);
  });

  it("should detect multiple seasons separated with space an spanish season name", () => {
    const releaseName =
      "Perdidos: Lost: Castellano: Temporadas 1 2 3 4 5 6 (Serie Com";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3, 4, 5, 6]);
  });

  it("should detect multiple seasons with with unequal separators", () => {
    const releaseName = "The Boondocks Season 1, 2 & 3";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3]);
  });

  it("should detect multiple seasons with with space and plus symbol", () => {
    const releaseName = "Boondocks, The - Seasons 1 + 2";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2]);
  });

  it("should detect multiple seasons with implied range without s prefix", () => {
    const releaseName = "The Boondocks Seasons 1-4 MKV";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3, 4]);
  });

  it("should detect multiple seasons separated with space plus and symbol", () => {
    const releaseName = "The Expanse Complete Seasons 01 & 02 1080p";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2]);
  });

  it("should detect multiple seasons with s prefix and implied range", () => {
    const releaseName =
      "Friends.Complete.Series.S01-S10.720p.BluRay.2CH.x265.HEVC-PSA";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("should detect multiple seasons with s prefix separated with slash", () => {
    const releaseName =
      "Stargate Atlantis ALL Seasons - S01 / S02 / S03 / S04 / S05";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3, 4, 5]);
  });

  it("should detect multiple seasons with season and parenthesis prefix", () => {
    const releaseName =
      "Stargate Atlantis Complete (Season 1 2 3 4 5) 720p HEVC x265";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3, 4, 5]);
  });

  it("should detect multiple seasons with s prefix separated with hyphen", () => {
    const releaseName = "Skam.S01-S02-S03.SweSub.720p.WEB-DL.H264";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3]);
  });

  it("should detect detect correct title with multiple season definitions", () => {
    const releaseName = "Seinfeld S02 Season 2 720p WebRip ReEnc-DeeJayAhmed";
    assert.deepStrictEqual(parse(releaseName).season, 2);
    assert.deepStrictEqual(parse(releaseName).title, "Seinfeld");
  });

  it("should detect correct title with multiple season definitions", () => {
    const releaseName =
      "Seinfeld Season 2 S02 720p AMZN WEBRip x265 HEVC Complete";
    assert.deepStrictEqual(parse(releaseName).season, 2);
    assert.deepStrictEqual(parse(releaseName).title, "Seinfeld");
  });

  it("should detect multiple season when given implied range inside parenthesis without s prefix", () => {
    const releaseName = "House MD All Seasons (1-8) 720p Ultra-Compressed";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("should detect multiple season when given implied range with season prefix", () => {
    const releaseName = "Teen Titans Season 1-5";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3, 4, 5]);
  });

  it("should detect multiple season when given implied range y words with season prefix", () => {
    const releaseName = "Game Of Thrones - Season 1 to 6 (Eng Subs)";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3, 4, 5, 6]);
  });

  it("should detect multiple season with and separator", () => {
    const releaseName = "Travelers - Seasons 1 and 2 - Mp4 x264 AC3 1080p";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2]);
  });

  it("should detect multiple season when given implied range separated with colon", () => {
    const releaseName = "Naruto Shippuden Season 1:11";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  });

  it("should detect multiple season when given implied range separated with colon and space", () => {
    const releaseName = "South Park Complete Seasons 1: 11";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  });

  it("should detect multiple season when title is with numbers", () => {
    const releaseName = "24 Season 1-8 Complete with Subtitles";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("should detect single season when contains non related number range", () => {
    const releaseName =
      "One Punch Man 01 - 12 Season 1 Complete [720p] [Eng Subs] [Xerxe:16";
    assert.deepStrictEqual(parse(releaseName).season, 1);
  });

  it("should detect season withing brackets with dot separator", () => {
    const releaseName = "[5.01] Weight Loss.avi";
    assert.deepStrictEqual(parse(releaseName).season, 5);
  });

  it("should detect season withing brackets with dot separator and episode in hunderds", () => {
    const releaseName = "Dragon Ball [5.134] Preliminary Peril.mp4";
    assert.deepStrictEqual(parse(releaseName).season, 5);
  });

  it("should detect season with s prefix and single digit", () => {
    const releaseName = "Bron - S4 - 720P - SweSub.mp4";
    assert.deepStrictEqual(parse(releaseName).season, 4);
  });

  it("Mad Men S02 Season 2 720p 5.1Ch BluRay ReEnc-DeeJayAhmed", () => {
    const releaseName =
      "Mad Men S02 Season 2 720p 5.1Ch BluRay ReEnc-DeeJayAhmed";
    assert.deepStrictEqual(parse(releaseName).season, 2);
  });

  it("Friends S04 Season 4 1080p 5.1Ch BluRay ReEnc-DeeJayAhmed", () => {
    const releaseName =
      "Friends S04 Season 4 1080p 5.1Ch BluRay ReEnc-DeeJayAhmed";
    assert.deepStrictEqual(parse(releaseName).season, 4);
  });

  it("should detect multiple season with double seperators", () => {
    const releaseName = "Doctor Who S01--S07--Complete with holiday episodes";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3, 4, 5, 6, 7]);
  });

  it("should detect season with a dot and hyphen separator", () => {
    const releaseName = "My Little Pony FiM - 6.01 - No Second Prances.mkv";
    assert.deepStrictEqual(parse(releaseName).season, 6);
  });

  it("should detect season with a dot and epsiode prefix", () => {
    const releaseName =
      "Desperate Housewives - Episode 1.22 - Goodbye for now.avi";
    assert.deepStrictEqual(parse(releaseName).season, 1);
  });

  it("should detect season with a dot and episode prefix v2", () => {
    const releaseName = "All of Us Are Dead . 2022 . S01 EP #1.2.mkv";
    assert.deepStrictEqual(parse(releaseName).season, 1);
  });

  it("should detect season with a year range afterwards", () => {
    const releaseName = "Empty Nest Season 1 (1988 - 89) fiveofseven";
    assert.deepStrictEqual(parse(releaseName).season, 1);
  });

  it("should detect multiple seasons with russian season and hyphen separator", () => {
    const releaseName =
      "Game of Thrones / Сезон: 1-8 / Серии: 1-73 из 73 [2011-2019, США, BDRip 1080p] MVO (LostFilm)";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("should detect multiple seasons with russian season and comma separator", () => {
    const releaseName =
      "Друзья / Friends / Сезон: 1, 2 / Серии: 1-24 из 24 [1994-1999, США, BDRip 720p] MVO";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2]);
  });

  it("should detect season with russian season word", () => {
    const releaseName =
      "Друзья / Friends / Сезон: 1 / Серии: 1-24 из 24 [1994-1995, США, BDRip 720p] MVO + Original + Sub (Rus, Eng)";
    assert.deepStrictEqual(parse(releaseName).season, 1);
  });

  it("should detect season with russian season word as folder name", () => {
    const releaseName = "Сезон 5/Серия 11.mkv";
    assert.deepStrictEqual(parse(releaseName).season, 5);
  });

  it("should detect season with russian season word followed by the number", () => {
    const releaseName =
      "Разрушители легенд. MythBusters. Сезон 15. Эпизод 09. Скрытая угроза (2015).avi";
    assert.deepStrictEqual(parse(releaseName).season, 15);
  });

  it("should detect season with russian season word followed by the number v2", () => {
    const releaseName =
      "Леди Баг и Супер-Кот – Сезон 3, Эпизод 21 – Кукловод 2 [1080p].mkv";
    assert.deepStrictEqual(parse(releaseName).season, 3);
  });

  it("should detect episode with full russian season name with case suffix", () => {
    const releaseName =
      "Проклятие острова ОУК_ 5-й сезон 09-я серия_ Прорыв Дэна.avi";
    assert.deepStrictEqual(parse(releaseName).season, 5);
  });

  it("should detect season with russian season word with number at front", () => {
    const releaseName = "2 сезон 24 серия.avi";
    assert.deepStrictEqual(parse(releaseName).season, 2);
  });

  it("should detect season with russian season word with number at front and nothing else", () => {
    const releaseName = "3 сезон";
    assert.deepStrictEqual(parse(releaseName).season, 3);
  });

  it("should detect season with russian season word and underscore", () => {
    const releaseName =
      "2. Discovery-Kak_ustroena_Vselennaya.(2.sezon_8.serii.iz.8).2012.XviD.HDTVRip.Krasnodarka";
    assert.deepStrictEqual(parse(releaseName).season, 2);
  });

  it("should detect season with russian season shortened word", () => {
    const releaseName =
      "Otchayannie.domochozyaiki.(8.sez.21.ser.iz.23).2012.XviD.HDTVRip.avi";
    assert.deepStrictEqual(parse(releaseName).season, 8);
  });

  it("should detect season with russian season word and no prefix", () => {
    const releaseName = "Интерны. Сезон №9. Серия №180.avi";
    assert.deepStrictEqual(parse(releaseName).season, 9);
  });

  it("should detect season with russian x separator", () => {
    const releaseName =
      "Discovery. Парни с Юкона / Yokon Men [06х01-08] (2017) HDTVRip от GeneralFilm | P1";
    assert.deepStrictEqual(parse(releaseName).season, 6);
  });

  it("should detect season with russian season word in araic letters", () => {
    const releaseName =
      "Zvezdnie.Voiny.Voina.Klonov.3.sezon.22.seria.iz.22.XviD.HDRip.avi";
    assert.deepStrictEqual(parse(releaseName).season, 3);
  });

  it("should detect season with hyphen separator between episode", () => {
    const releaseName = "2-06. Девичья сила.mkv";
    assert.deepStrictEqual(parse(releaseName).season, 2);
  });

  it("should detect season with hyphen separator between episode v2", () => {
    const releaseName = "4-13 Cursed (HD).m4v";
    assert.deepStrictEqual(parse(releaseName).season, 4);
  });

  it("should detect season with hyphen separator between episode v3", () => {
    const releaseName = "Доктор Хаус 03-20.mkv";
    assert.deepStrictEqual(parse(releaseName).season, 3);
  });

  it("should detect episodes with hyphen separator between episode v4", () => {
    const releaseName = "Комиссар Рекс 11-13.avi";
    assert.deepStrictEqual(parse(releaseName).season, 11);
  });

  it("should not detect season with hyphen separator when it's the title", () => {
    const releaseName = "13-13-13 2013 DVDrip x264 AAC-MiLLENiUM";
    assert.deepStrictEqual(parse(releaseName).season, undefined);
    assert.deepStrictEqual(parse(releaseName).title, "13-13-13");
  });

  it("should detect correct season with eps prefix and hyphen separator", () => {
    const releaseName = "MARATHON EPISODES/Orphan Black S3 Eps.05-08.mp4";
    assert.deepStrictEqual(parse(releaseName).season, 3);
  });

  it("should detect multiple seasons with end season without s symbol", () => {
    const releaseName =
      "Once Upon a Time [S01-07] (2011-2017) WEB-DLRip by Generalfilm";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3, 4, 5, 6, 7]);
  });

  it("should detect multiple seasons with one space and hyphen separator", () => {
    const releaseName =
      "[F-D] Fairy Tail Season 1 -6 + Extras [480P][Dual-Audio]";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3, 4, 5, 6]);
  });

  it("should detect multiple seasons with spaces and hyphen separator", () => {
    const releaseName =
      "Coupling Season 1 - 4 Complete DVDRip - x264 - MKV by RiddlerA";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3, 4]);
  });

  it("should single season with spaces and hyphen separator", () => {
    const releaseName =
      "[HR] Boku no Hero Academia 87 (S4-24) [1080p HEVC Multi-Subs] HR-GZ";
    assert.deepStrictEqual(parse(releaseName).seasons, [4]);
  });

  it("Tokyo Ghoul Root A - 07 [S2-07] [Eng Sub] 480p [email protected]", () => {
    const releaseName =
      "Tokyo Ghoul Root A - 07 [S2-07] [Eng Sub] 480p [email protected]";
    assert.deepStrictEqual(parse(releaseName).seasons, [2]);
  });

  it("Ace of the Diamond: 1st Season", () => {
    const releaseName = "Ace of the Diamond: 1st Season";
    assert.deepStrictEqual(parse(releaseName).seasons, [1]);
  });

  it("Ace of the Diamond: 2nd Season", () => {
    const releaseName = "Ace of the Diamond: 2nd Season";
    assert.deepStrictEqual(parse(releaseName).seasons, [2]);
  });

  it("Adventure Time 10 th season", () => {
    const releaseName = "Adventure Time 10 th season";
    assert.deepStrictEqual(parse(releaseName).season, 10);
  });

  it("Kyoukai no Rinne (TV) 3rd Season - 23 [1080p]", () => {
    const releaseName = "Kyoukai no Rinne (TV) 3rd Season - 23 [1080p]";
    assert.deepStrictEqual(parse(releaseName).season, 3);
  });

  it("[Erai-raws] Granblue Fantasy The Animation Season 2 - 08 [1080p][Multiple Subtitle].mkv", () => {
    const releaseName =
      "[Erai-raws] Granblue Fantasy The Animation Season 2 - 08 [1080p][Multiple Subtitle].mkv";
    assert.deepStrictEqual(parse(releaseName).season, 2);
  });

  it("The Nile Egypts Great River with Bettany Hughes Series 1 4of4 10", () => {
    const releaseName =
      "The Nile Egypts Great River with Bettany Hughes Series 1 4of4 10";
    assert.deepStrictEqual(parse(releaseName).season, 1);
  });

  it("Teen Wolf - 04ª Temporada 720p", () => {
    const releaseName = "Teen Wolf - 04ª Temporada 720p";
    assert.deepStrictEqual(parse(releaseName).season, 4);
  });

  it("Vikings 3 Temporada 720p", () => {
    const releaseName = "Vikings 3 Temporada 720p";
    assert.deepStrictEqual(parse(releaseName).season, 3);
  });

  it("Eu, a Patroa e as Crianças  4° Temporada Completa - HDTV - Dublado", () => {
    const releaseName =
      "Eu, a Patroa e as Crianças  4° Temporada Completa - HDTV - Dublado";
    assert.deepStrictEqual(parse(releaseName).season, 4);
  });

  it("Merl - Temporada 1", () => {
    const releaseName = "Merl - Temporada 1";
    assert.deepStrictEqual(parse(releaseName).season, 1);
  });

  it("Elementar 3º Temporada Dublado", () => {
    const releaseName = "Elementar 3º Temporada Dublado";
    assert.deepStrictEqual(parse(releaseName).season, 3);
  });

  it("Beavis and Butt-Head - 1a. Temporada", () => {
    const releaseName = "Beavis and Butt-Head - 1a. Temporada";
    assert.deepStrictEqual(parse(releaseName).season, 1);
  });

  it("3Âº Temporada Bob esponja Pt-Br", () => {
    const releaseName = "3Âº Temporada Bob esponja Pt-Br";
    assert.deepStrictEqual(parse(releaseName).season, 3);
  });

  it("Juego de Tronos - Temp.2 [ALTA DEFINICION 720p][Cap.209][Spanish].mkv", () => {
    const releaseName =
      "Juego de Tronos - Temp.2 [ALTA DEFINICION 720p][Cap.209][Spanish].mkv";
    assert.deepStrictEqual(parse(releaseName).season, 2);
  });

  it("Los Simpsons Temp 7 DVDrip Espanol De Espana", () => {
    const releaseName = "Los Simpsons Temp 7 DVDrip Espanol De Espana";
    assert.deepStrictEqual(parse(releaseName).season, 7);
  });

  it("should detect spanish season range with & separator", () => {
    const releaseName =
      "The Walking Dead [Temporadas 1 & 2 Completas Em HDTV E Legena";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2]);
  });

  it("should detect spanish short season identifier", () => {
    const releaseName = "My Little Pony - A Amizade é Mágica - T02E22.mp4";
    assert.deepStrictEqual(parse(releaseName).season, 2);
  });

  it("should detect spanish short season identifier with xe separator", () => {
    const releaseName = "30 M0N3D4S ESP T01XE08.mkv";
    assert.deepStrictEqual(parse(releaseName).season, 1);
  });

  it("should detect sn naming scheme", () => {
    const releaseName =
      "Sons of Anarchy Sn4 Ep14 HD-TV - To Be, Act 2, By Cool Release";
    assert.deepStrictEqual(parse(releaseName).season, 4);
  });

  it("should detect single season and not range in filename", () => {
    const releaseName =
      "[FFA] Kiratto Pri☆chan Season 3 - 11 [1080p][HEVC].mkv";
    assert.deepStrictEqual(parse(releaseName).season, 3);
  });

  it("should detect single season and not range in filename v2", () => {
    const releaseName =
      "[Erai-raws] Granblue Fantasy The Animation Season 2 - 10 [1080p][Multiple Subtitle].mkv";
    assert.deepStrictEqual(parse(releaseName).season, 2);
  });

  it("should detect single season and not range in filename v3", () => {
    const releaseName =
      "[SCY] Attack on Titan Season 3 - 11 (BD 1080p Hi10 FLAC) [1FA13150].mkv";
    assert.deepStrictEqual(parse(releaseName).season, 3);
  });

  it("should detect single zero season", () => {
    const releaseName =
      "DARKER THAN BLACK - S00E04 - Darker Than Black Gaiden OVA 3.mkv";
    assert.deepStrictEqual(parse(releaseName).season, 0);
  });

  it("should detect nl season word", () => {
    const releaseName =
      "Seizoen 22 - Zon & Maan Ultra Legendes/afl.18 Je ogen op de bal houden!.mp4";
    assert.deepStrictEqual(parse(releaseName).season, 22);
  });

  it("should detect italian season word", () => {
    const releaseName =
      "Nobody Wants This - Stagione 1 (2024) [COMPLETA] 720p H264 ITA AAC 2.0-Zer0landia";
    assert.deepStrictEqual(parse(releaseName).season, 1);
  });

  it("should detect italian season range", () => {
    const releaseName =
      "Red Oaks - Stagioni 01-03 (2014-2017) [COMPLETA] SD x264 AAC ITA SUB ITA - mkeagle3";
    assert.deepStrictEqual(parse(releaseName).seasons, [1, 2, 3]);
  });

  it("should not detect season when it's part of the name", () => {
    const releaseName = "Ranma-12-86.mp4";
    assert.deepStrictEqual(parse(releaseName).season, undefined);
  });
});
