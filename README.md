# parse-torrent-filename

Forked from [parse-torrent-title](https://github.com/TheBeastLT/parse-torrent-title) but migrated to ES6.

This package helps you extract information from a torrent name such as language, resolution and codec.

## Installation

You can install it using npm:

```bash
npm install @brawdunoir/parse-torrent-filename
```

You should use Node 18.0 or higher to use this package.

## Usage

A simple usage is as follows:

```javascript
import { parse } from '@brawdunoir/parse-torrent-filename/index.js'
const information = parse("Game.of.Thrones.S01E01.720p.HDTV.x264-CTU");

console.log(information.title); // Game of Thrones
console.log(information.season); // 1
console.log(information.episode); // 1
console.log(information.resolution); // 720p
console.log(information.codec); // x264
console.log(information.source); // HDTV
console.log(information.group); // CTU
```

## Advanced usage

This module is configurable and extendable using handlers and regular expressions.

### Regular expressions

If you want an extra field to be populated, you can use a regular expression as follow:

```javascript
import { parse, addHandler } from '@brawdunoir/parse-torrent-filename/index.js'

// Add a handler for the "part" information
addHandler("part", /Part[. ]([0-9])/i, { type: "integer" });
const information = parse("Silent.Witness.S18E03.Falling.Angels.Part.1.720p.HDTV.x264-FTP",);

console.log(information)
// {
//   resolution: '720p',
//   source: 'HDTV',
//   codec: 'x264',
//   group: 'FTP',
//   seasons: [ 18 ],
//   season: 18,
//   episodes: [ 3 ],
//   episode: 3,
//   part: '1',    <----- new field
//   title: 'Silent Witness'
// }
```

If you want to keep only a part of the matched regular expression, you should use capturing groups
[explained here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp).

For regular expressions, the following options are available:

- `skipIfAlreadyFound` (default to `true`) which will skip the regular expression if a previous handler for the same
  information already found something.
- `type` (default to `string`) which indicates what is the expected output of the regular expression.
  It can be:
  - `string`: does nothing
  - `integer`: convert the matching part into an integer
  - `lowercase`: convert the matching part to lowercase
  - `boolean`: convert to true if there is a matching part
- `value` (default to undefined) which, if defined, set the specified value instead of the matching part as the result

### Handlers

A handler is a function with the title and the resulting information as parameters.
It can modify the result in any wanted way.
If the matched string is not part of the title, it should return the beginning of it.

```javascript
import { parse, addHandler } from '@brawdunoir/parse-torrent-filename/index.js'

const information = parse(
  "[REQ] Harry Potter And The Prisoner Of Azkaban 2004 1080p BluRay DTS x264-hV",
);
console.log(information.isHarryPotterRelated); // undefined

addHandler(({ title, result }) => {
  const match = title.match(/harry.potter/i);
  if (match) {
    result.isHarryPotterRelated = true;
  }
});

const information2 = parse(
  "[REQ] Harry Potter And The Prisoner Of Azkaban 2004 1080p BluRay DTS x264-hV",
);
console.log(information2.isHarryPotterRelated); // true
```

### Multiple parsers

You may want several parsers within the same project.
To do that, you can simply create new parsers:

```javascript
import { Parser } from '@brawdunoir/parse-torrent-filename/index.js'
const parser = new Parser();
const anotherParser = new Parser();
```

By default, a freshly created parser has no handler.
If you want to add default handlers to a parser, you can do so using the specific method:

```javascript
import { Parser, addDefaults } from '@brawdunoir/parse-torrent-filename/index.js'
const myParser = new Parser();
addDefaults(myParser); // myParser is now ready
```

### Usage with TypeScript

If you add new properties with `addHandler` in TypeScript, the result type `DefaultParserResult` will not be updated,
and you will encounter a TS2339 error.

To prevent this error and have autocomplete,
you should create a `ParserResult` interface with the expected properties.
It is possible to extend the `DefaultParserResult` interface to get all the default properties.
Then, create a new `Parser` object using the above interface.
Finally, use the `parse` function as usual.

Example:

```ts
import { Parser, DefaultParserResult, addDefaults } from "@brawdunoir/parse-torrent-filename/index.js";

interface ParserResult extends DefaultParserResult {
  part?: number;
}

const parser = new Parser<ParserResult>();
addDefaults(parser);
parser.addHandler("part", /(?:Part|CD)[. ]?([0-9])/i, { type: "integer" });
const parse = parser.parse;

const result = parse(
  "Watergate.2018.Part1.DOC.SUBFRENCH.1080p.HDTV.H264-ELEARNiNG",
);
console.log(result.year); // 2018 - it works as before
console.log(result.part); // 1 - `part` is now a known property of the `result` object
```
