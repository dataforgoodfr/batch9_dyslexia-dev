// Get the modal
const modalHelp = document.getElementById("myModal2");

// Get the image and insert it inside the modal - use its "alt" text as a caption
const imgHelp = document.getElementById("help");
const modalHelpImg = document.getElementById("img02");
const captionTextHelp = document.getElementById("caption2");
imgHelp.onclick = function(){
  modalHelp.style.display = "block";
  /*modalHelpImg.src = 'https://data2.unhcr.org/images/documents/big_4cda85d892a5c0b5dd63b510a9c83e9c9d06e739.jpg'*/
  /*modalHelpImg.src = 'https://www.youtube.com/embed/sbxBQbRlaYA?start=5775&controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1';*/
  /*captionTextHelp.innerHTML = this.alt;*/
}

// Get the <span> element that closes the modal
const spanHelp = document.getElementsByClassName("close2")[0];

// When the user clicks on <span> (x), close the modal
spanHelp.onclick = function() {
  modalHelp.style.display = "none";
}


