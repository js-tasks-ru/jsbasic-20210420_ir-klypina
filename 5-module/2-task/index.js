function toggleText() {
  const toggleButton = document.querySelector('.toggle-text-button');
  const text = document.getElementById('text');

  toggleButton.addEventListener('click', () => {
    text.hidden = !text.hidden;
  })
}
