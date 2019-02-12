const { value, integer, boolean, lowercase, range, array } = require("./transformers");

exports.addDefaults = /** @type Parser */ parser => {

    // Year
    parser.addHandler("year", /(?!^)[([]?((?:19[0-9]|20[012])[0-9])[)\]]?/, integer, { remove: true });

    // Resolution
    parser.addHandler("resolution", /([0-9]{3,4}[pi])/i, lowercase, { remove: true });
    parser.addHandler("resolution", /[([]?1920x1080[)\]]?/i, value('1080p'), { remove: true });
    parser.addHandler("resolution", /[([]?(?:1280|960)x720[)\]]?/i, value('720p'), { remove: true });
    parser.addHandler("resolution", /[([]?640x480[)\]]?/i, value('480p'), { remove: true });
    parser.addHandler("resolution", /(4k)/i, lowercase, { remove: true });

    // Extended
    parser.addHandler("extended", /EXTENDED/, boolean);

    // Convert
    parser.addHandler("convert", /CONVERT/, boolean);

    // Hardcoded
    parser.addHandler("hardcoded", /HC|HARDCODED/, boolean);

    // Proper
    parser.addHandler("proper", /(?:REAL.)?PROPER/, boolean);

    // Repack
    parser.addHandler("repack", /REPACK|RERIP/, boolean);

    // Retail
    parser.addHandler("retail", /\bRetail\b/i, boolean);

    // Remastered
    parser.addHandler("remastered", /\bRemaster(?:ed)?\b/i, boolean);

    // Unrated
    parser.addHandler("unrated", /\bunrated|uncensored\b/i, boolean);

    // Region
    parser.addHandler("region", /R[0-9]/);

    // Container
    parser.addHandler("container", /(?:\.)?\b(MKV|AVI|MP4|WMV|MPG|MPEG)\b/i, lowercase, { remove: true });

    // Source
    parser.addHandler("source", /\b(?:HD-?)?CAM\b/, { remove: true });
    parser.addHandler("source", /\b(?:HD-?)?T(?:ELE)?S(?:YNC)?\b/i, { remove: true });
    parser.addHandler("source", /\bHD-?Rip\b/i, { remove: true });
    parser.addHandler("source", /\bBRRip\b/i, value("BRRip"), { remove: true });
    parser.addHandler("source", /\bBDRip\b/i, value("BDRip"), { remove: true });
    parser.addHandler("source", /\bDVDRip\b/i, value("DVDRip"), { remove: true });
    parser.addHandler("source", /\bDVD(?:R[0-9])?\b/i, value("DVD"), { remove: true });
    parser.addHandler("source", /\bDVD?Scr\b/i, value("DVDScr"), { remove: true });
    parser.addHandler("source", /\b(?:HD-?)?TVRip\b/i, { remove: true });
    parser.addHandler("source", /\bTC\b/, value("TC"), { remove: true });
    parser.addHandler("source", /\bPPVRip\b/i, value("PPVRip"), { remove: true });
    parser.addHandler("source", /\bTVRips?\b/i, value("TVRip"), { remove: true });
    parser.addHandler("source", /\bR5\b/i, value("R5"), { remove: true });
    parser.addHandler("source", /\bVHSScr\b/i, value("VHSScr"), { remove: true });
    parser.addHandler("source", /\bBluRay\b/i, value("BluRay"), { remove: true });
    parser.addHandler("source", /\bWEB-?DL\b/i, value("WEB-DL"), { remove: true });
    parser.addHandler("source", /\bWEB-?Rip\b/i, value("WEBRip"), { remove: true });
    parser.addHandler("source", /\b(?:DL|WEB|BD|BR)MUX\b/i, { remove: true });
    parser.addHandler("source", /\b(DivX|XviD)\b/, { remove: true });
    parser.addHandler("source", /\bHDTV\b/i, value("HDTV"), { remove: true });

    // Codec
    parser.addHandler("codec", /[xh][-. ]?26[45]/i, lowercase, { remove: true });
    parser.addHandler("codec", /dvix|mpeg2|divx|xvid|avc|hevc/i, lowercase, { remove: true });
    parser.addHandler("codec", ({ result }) => {
        if (result.codec) {
            result.codec = result.codec.replace(/[ .-]/, "");
        }
    });

    // Audio
    parser.addHandler("audio", /MD|MP3|mp3|FLAC|Atmos|DTS(?:-HD)?|TrueHD/, lowercase);
    parser.addHandler("audio", /Dual[- ]Audio/i, lowercase);
    parser.addHandler("audio", /AC-?3(?:[.-]5\.1)?/i, value("ac3"), { remove: true });
    parser.addHandler("audio", /5\.1ch/i, value("ac3"), { remove: true });
    parser.addHandler("audio", /DD5[. ]?1/i, value("dd5.1"), { remove: true });
    parser.addHandler("audio", /AAC(?:[. ]?2[. ]0)?/, value("aac"), { remove: true });

    // Group
    parser.addHandler("group", /- ?([^\-. ]+)$/, { remove: true });

    // Volumes
    parser.addHandler("volumes", /vol(?:s|umes?)?[. -]*(?:\d{1,2}[., +/\\&-]+)+\d{1,2}\b/i, range, { remove: true });
    parser.addHandler("volumes", ({ title, result, matched }) => {
        const startIndex = matched.year && matched.year.matchIndex || 0;
        const match = title.substring(startIndex).match(/vol(?:ume)?[. -]*(\d{1,2})/i);
        if (match) {
            matched.volumes = { match: match[0], matchIndex: match.index };
            result.volumes = array(integer)(match[1]);
            return { matchIndex: match.index, remove: true };
        }
        return null;
    });

    // Season
    parser.addHandler("seasons", /(?:complete\W|seasons?\W|\W|^)((?:s\d{1,2}[., +/\\&-]+)+s\d{1,2}\b)/i, range);
    parser.addHandler("seasons", /(?:(?:\bthe\W)?\bcomplete\W)?\bseasons?\b[. -]?[([]?((?:\d{1,2}[., /\\&-]+)+\d{1,2}\b)[)\]]?/i, range);
    parser.addHandler("seasons", /(?:(?:\bthe\W)?\bcomplete\W)?\bseasons?\b[. -]?(\d{1,2}[. -]?(?:to|thru|and|\+|:)[. -]?\d{1,2})\b/i, range);
    parser.addHandler("seasons", /(?:(?:\bthe\W)?\bcomplete\W)?(?:saison|season)[. -]?(\d{1,2})/i, array(integer));
    parser.addHandler("seasons", /(?:(?:\bthe\W)?\bcomplete)?(?:\W|^)s(\d{1,2})(?:[\Wex]|$)/i, array(integer), { skipIfAlreadyFound: false });
    parser.addHandler("seasons", /(?:\D|^)(\d{1,2})x\d{1,3}(?:\D|$)/, array(integer));
    parser.addHandler("seasons", /[[(](\d{1,2})\.\d{1,2}[)\]]/, array(integer));

    // adds single season info if its there's only single season
    parser.addHandler("season", ({ result }) => {
        if (result.seasons && result.seasons.length === 1) {
            result.season = result.seasons[0];
        }
    });

    // Episode
    parser.addHandler("episodes", /(?:[\W\d]|^)[ex]p?(?:isode)?s?[ .]?[([]?(\d{1,3}(?:[ .+-]*[ex&+-]e?p?[ .]?\d{1,3})+)(?:\W|$)/i, range);
    parser.addHandler("episodes", /(?:[s .([-]|^)\d{1,2}[. -]*[ex]{1,2}p?[. ]?(\d{1,3})(?:[ab]|\W|$)/i, array(integer));
    parser.addHandler("episodes", /(?<!seasons?\W*)(?:[ .([-]|^)(\d{1,3}(?:[ .]?[,&+-][ .]?\d{1,3})+)(?:[ .)\]-]|$)/i, range);
    parser.addHandler("episodes", /[ée]p(?:isode)?[. -]?(\d{1,3})(?:\W|$)/i, array(integer));
    parser.addHandler("episodes", /[[(]\d{1,2}\.(\d{1,2})[)\]]/, array(integer));

    // can be both absolute episode and season+episode in format 101
    parser.addHandler("episodes", ({ title, result, matched }) => {
        if (!result.seasons && !result.episodes) {
            const indexes = [matched.resolution, matched.source, matched.codec, matched.audio]
                .filter(component => component)
                .map(component => component.matchIndex)
                .filter(index => index > 0);
            const startIndex = matched.year && matched.year.matchIndex || 0;
            const endIndex = Math.min(...indexes, title.length);
            const match = title.substring(startIndex, endIndex).match(/(?:[ .([-]|^)(\d{1,3})(?:a|b|v\d)?(?:\W|$)/);
            if (match) {
                result.episodes = [match[1]]
                    .map(group => group.replace(/\D/g, ""))
                    .map(group => parseInt(group, 10));
                return { matchIndex: match.index }
            }
        }
    });

    // adds single season info if its there's only single season
    parser.addHandler("episode", ({ result }) => {
        if (result.episodes && result.episodes.length === 1) {
            result.episode = result.episodes[0];
        }
    });

    parser.addHandler("complete", /(?:\bthe\W)?(?:\bcomplete|collection|dvd)?\b[ .]?\bbox[ .-]?set\b/i, boolean);
    parser.addHandler("complete", /(?:\bthe\W)?(?:\bcomplete|collection|dvd)?\b[ .]?\bmini[ .-]?series\b/i, boolean);
    parser.addHandler("complete", /(?:\bthe\W)?(?:\bcomplete|full|all)\b.*\b(?:series|seasons|collection|episodes)\b/i, boolean);
    parser.addHandler("complete", /\bseries\b[ .]\b(?:complete|collection)\b/i, boolean);
    parser.addHandler("complete", /\bseasons\b[ .]\b(?:complete|collection)\b/i, boolean);
    parser.addHandler("complete", /(?:\bthe\W)?\bultimate\b[ .]\bcollection\b/i, boolean, { skipIfAlreadyFound: false });

    // Language
    parser.addHandler("language", /\bRUS\b/i, lowercase);
    parser.addHandler("language", /\bNL\b/, lowercase);
    parser.addHandler("language", /\bFLEMISH\b/, lowercase);
    parser.addHandler("language", /\bGERMAN\b/, lowercase);
    parser.addHandler("language", /\bDUBBED\b/, lowercase);
    parser.addHandler("language", /\b(ITA(?:LIAN)?|iTALiAN)\b/, value("ita"));
    parser.addHandler("language", /\bFR(?:ENCH)?\b/, lowercase);
    parser.addHandler("language", /\bTruefrench|VF(?:[FI])\b/i, lowercase);
    parser.addHandler("language", /\bVOST(?:(?:F(?:R)?)|A)?|SUBFRENCH\b/i, lowercase);
    parser.addHandler("language", /\bMULTi(?:Lang|-VF2)?\b/i, lowercase);
};
