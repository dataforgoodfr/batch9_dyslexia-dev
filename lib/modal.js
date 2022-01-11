// Get the modal
const modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
const img = document.getElementById("myImg");
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  const fileField = document.getElementById('inputField');
  let formData = new FormData();
  formData.append('file', fileField.files[0]);
  /*modalImg.src = 'https://data2.unhcr.org/images/documents/big_4cda85d892a5c0b5dd63b510a9c83e9c9d06e739.jpg';*/
  modalImg.src = window.URL.createObjectURL(fileField.files[0]);
  /*modalImg.src = 'https://drive.google.com/file/d/1TBp4yu6kaqA3lG65T1nP8IQi06XUFlCJ/view?usp=sharing';*/
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
