/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const res = [...arr];
  
  res.sort((s1, s2) => s1.localeCompare(s2, 'ru-u-kf-upper'));

  if (param == 'asc') {return res;}

  return res.reverse();
}
