function hideSelf() {
  const hideButton = document.querySelector('.hide-self-button');
  hideButton.addEventListener('click', () => {
    hideButton.hidden = true;
  }, { once: true })
}
