/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const ret = {};
  
  for (const key of fields) {
    if (Object.keys(obj).includes(key)) {ret[key] = obj[key];}
  }

  return ret;
};
