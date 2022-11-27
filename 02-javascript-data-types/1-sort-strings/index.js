/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const ret = [...arr];
  
  const collator = new Intl.Collator(['ru', 'en-US'], {caseFirst: 'upper'});

  ret.sort((s1, s2) => collator.compare(s1, s2));

  return param == 'asc' ? ret : ret.reverse();
}
