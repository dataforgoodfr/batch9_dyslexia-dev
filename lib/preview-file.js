
const input = document.getElementById('inputField');
const preview = document.querySelector('.preview__file');

input.style.opacity = 0;
input.addEventListener('change', updateImageDisplay);

function updateImageDisplay() {
  while(preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  let curFiles = input.files;

  if(curFiles.length === 0) {
    const para = document.createElement('p');
    para.textContent = 'Aucun fichier selectionné';
    preview.appendChild(para);
  } else {
    const list = document.createElement('ol');
    preview.appendChild(list);
    for(let i = 0; i < curFiles.length; i++) {
      const listItem = document.createElement('li');
      const paraName = document.createElement('p');
      /*paraName.classList.add('text-start');*/
      /*console.log(curFiles[i]);*/
      if(validFileType(curFiles[i])) {
        paraName.textContent = 'Nom Fichier:  ' + curFiles[i].name + '(' + returnFileSize(curFiles[i].size) + ')';
        const image = document.createElement('img');
        image.style.width  = '100px';
        image.style.height = '100px';
        if (curFiles[i].type === 'application/pdf') {
          const paraInfo = document.createElement('p');
          paraInfo.textContent = 'NB: Prévisualisation non encore disponible pour les fichiers PDF' ;
          paraInfo.classList.toggle("pink");
          paraInfo.classList.toggle("mb-3");
          listItem.appendChild(paraInfo);
        }else {
          image.src = window.URL.createObjectURL(curFiles[i]);
          listItem.appendChild(image);
        }

        listItem.appendChild(paraName);

      } else {
        paraName.textContent = 'Nom Fichier: ' + curFiles[i].name + ": N'est pas un type de fichier valide. Changez votre selection.";
        listItem.appendChild(paraName);
      }

      list.appendChild(listItem);
    }
  }
}

var fileTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/pdf',
]

function validFileType(file) {
  for(let i = 0; i < fileTypes.length; i++) {
    /*console.log(fileTypes[i]);
    console.log(file.type);*/
    if(file.type === fileTypes[i]) {
      return true;
    }
  }

  return false;
}

function returnFileSize(number) {
  if(number < 1024) {
    return number + ' octets';
  } else if(number >= 1024 && number < 1048576) {
    return (number/1024).toFixed(1) + ' Ko';
  } else if(number >= 1048576) {
    return (number/1048576).toFixed(1) + ' Mo';
  }
}
