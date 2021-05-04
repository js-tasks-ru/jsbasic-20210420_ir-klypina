function camelize(str) {
  let wordsArray = str.split('-');

  for (let i = 1; i < wordsArray.length; i++) {
    wordsArray[i] = wordsArray[i][0].toUpperCase() + wordsArray[i].slice(1);
  }

  return wordsArray.join('');
}
