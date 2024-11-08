export const none = (input) => input;
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat.js'


export const value = (value) => (input) => {
  if (typeof value === "string") {
    return value.replace("$1", input);
  }
  return value;
};

export const integer = (input) => parseInt(input, 10);

export const boolean = () => true;

export const lowercase = (input) => input.toLowerCase();

export const uppercase = (input) => input.toUpperCase();

export const date = (dateFormat) => (input) => {
  const sanitized = input.replace(/\W+/g, " ").trim();
  dayjs.extend(customParseFormat)
  return dayjs(sanitized, dateFormat).format("YYYY-MM-DD");
};

export const range = (input) => {
  let array = input
    .replace(/\D+/g, " ")
    .trim()
    .split(" ")
    .map((str) => parseInt(str, 10));

  if (array.length === 2 && array[0] < array[1]) {
    array = Array(array[1] - array[0] + 1)
      .fill()
      .map((_, idx) => array[0] + idx);
  }
  if (
    !array.every(
      (number, idx) =>
        idx === array.length - 1 || number + 1 === array[idx + 1],
    )
  ) {
    return null;
  }
  return array;
};

export const yearRange = (input) => {
  const parts = input.split(/\D+/);
  const start = parts[0] && parseInt(parts[0], 10);
  let end = parts[1] && parseInt(parts[1], 10);

  if (!end) {
    return start;
  }
  if (end < 100) {
    end = end + start - (start % 100);
  }
  if (end <= start) {
    return null;
  }
  return `${start}-${end}`;
};

export const array = (chain) => (input) => [chain ? chain(input) : input];

export const uniqConcat = (chain) => (input, result) => {
  const newResult = result || [];
  const value = chain(input);

  return newResult.includes(value) ? newResult : newResult.concat(value);
};
