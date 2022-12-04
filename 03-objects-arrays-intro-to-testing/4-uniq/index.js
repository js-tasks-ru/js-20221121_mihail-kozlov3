/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
  if (arr === undefined) { return []; }

  return arr.reduce(
    (ret, item) => { 
      if (!ret.includes(item)) { ret.push(item); } 
      return ret;
    }, 
    []
  );
}
