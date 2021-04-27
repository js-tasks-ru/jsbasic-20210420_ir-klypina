function checkSpam(str) {
  let spamStrings = ['1xbet', 'xxx'];

  str = str.toLowerCase();

  for (let spamStr of spamStrings) {
    if (str.indexOf(spamStr) !== -1) return true;
  }

  return false;
}
