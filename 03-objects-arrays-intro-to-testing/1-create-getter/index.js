/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const ret = function(obj) {
    let val = obj;
    for (const key of path.split('.')) {
      if (!Object.hasOwn(val, key)) { return; }
      
      val = val[key];
    }

    return val;
  };

  return ret;
}
