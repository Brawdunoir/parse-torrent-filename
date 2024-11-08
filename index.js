import { Parser } from "./src/parser.js";
import { addDefaults } from "./src/handlers.js";

const defaultParser = new Parser();

addDefaults(defaultParser);

export { addDefaults };
export { Parser }
export const addHandler = (handlerName, handler, options) =>
  defaultParser.addHandler(handlerName, handler, options);
export const parse = (title) => defaultParser.parse(title);
