// Switch.js : Change all page font to opendys font

const switch_button = document.querySelector("input");

switch_button.addEventListener("change", (event) => {
  //console.log('click!');
  const body = document.querySelector("body");
  body.classList.toggle("standard-font");
});

