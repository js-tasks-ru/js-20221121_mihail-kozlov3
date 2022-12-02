/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === undefined) { return string; }

  const ret = [];
  let startLetter;

  let cou = 0;
  for (let curLetter of string) {
    cou++;
    if (startLetter === curLetter) { continue; }

    ret.push({letter: startLetter, count: cou});
    cou = 0;
    startLetter = curLetter;
  }
  ret.push({letter: startLetter, count: cou + 1});

  return ret.map(i => {
    return i.letter ? i.letter.repeat(Math.min(i.count, size)) : '';
  }).join('');
}
