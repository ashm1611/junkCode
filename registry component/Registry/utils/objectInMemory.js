/**
 * this file will be used to keep object in browser memory
 * @type {{}}
 */
const jsObject = {};
/**
 * it will save object in browser memory
 */
export const setObjectInMemory = (key, value) => {
  jsObject[key] = value;
};
/**
 * will return object from browser memory
 */
export const getObjectfromMemory = key => {
  return jsObject[key];
};
