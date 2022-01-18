// Switch.js : slider settings - Change all page font to opendys font

document.addEventListener('DOMContentLoaded', () => {
    const settingsButton = document.querySelector('.intro__settings');

    settingsButton.addEventListener('click', (evt) => {
        const body = document.querySelector('body');
        body.classList.toggle('standard-font');
    });
});

const switch_button = document.querySelector("input");

switch_button.addEventListener("change", (event) => {
    //console.log('click!');
    const body = document.querySelector("body");
    body.classList.toggle("standard-font");
});