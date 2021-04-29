const SPAM_STRINGS = ['1xbet', 'xxx'];

function checkSpam(str) {
  const strInLC = str.toLowerCase();

  for (const spamStr of SPAM_STRINGS) {
    if (strInLC.includes(spamStr)) return true;
  }

  return false;
}
