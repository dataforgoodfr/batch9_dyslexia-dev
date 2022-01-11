document.addEventListener('DOMContentLoaded', () => {
  const settingsButton = document.querySelector('.intro__settings');

  settingsButton.addEventListener('click', (evt) => {
    const body = document.querySelector('body');
    body.classList.toggle('standard-font');
  });
});
