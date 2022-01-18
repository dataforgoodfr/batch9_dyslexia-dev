/*
## endpoint: ocr_file : https://dyslexia-dfg.herokuapp.com/ocr_file/
curl -X 'POST' \
  'https://dyslexia-dfg.herokuapp.com/ocr_file/' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@image_to_ocr.jpg;type=image/jpeg'
## Test Charge with ab
ab -c 10 -n 10 -p image_to_ocr.jpg -r -T application/json -H 'Content-Type: multipart/form-data' https://dyslexia-dfg.herokuapp.com/ocr_file/
ab -p image_to_ocr.jpg -T application/json -H 'Content-Type: multipart/form-data' -c 10 -n 100 https://dyslexia-dfg.herokuapp.com/ocr_file/

## endpoint: ocr_url = https://dyslexia-dfg.herokuapp.com/ocr_url/?url=xxx
curl -X 'POST' \
  'https://dyslexia-dfg.herokuapp.com/ocr_url/?url=https%3A%2F%2Fdata2.unhcr.org%2Fimages%2Fdocuments%2Fbig_4cda85d892a5c0b5dd63b510a9c83e9c9d06e739.jpg' \
  -H 'accept: application/json' \
  -d ''

 ab -T application/json -c 10 -n 100 https://dyslexia-dfg.herokuapp.com/ocr_url/?url=https%3A%2F%2Fdata2.unhcr.org%2Fimages%2Fdocuments%2Fbig_4cda85d892a5c0b5dd63b510a9c83e9c9d06e739.jpg

/* TODO: Fetch by file */
/*        curl -X 'POST' \
         'https://dyslexia-dfg.herokuapp.com/ocr_file/' \
        -H 'accept: application/json' \
        -H 'Content-Type: multipart/form-data' \
        -F 'file=@image_to_ocr.jpg;type=image/jpeg'
*/


document.addEventListener('DOMContentLoaded', function() {

    const inputElement = document.getElementById("inputField");
    inputElement.addEventListener("change", handleFiles, false);

    function handleFiles() {
        const uploadfile = this.files; /* Vous pouvez maintenant manipuler la liste de fichiers */

    }

    document.querySelector(".btn-upload").addEventListener('click', function() {
        console.log('btn-upload-local');
        const doc_url = 'https://data2.unhcr.org/images/documents/big_4cda85d892a5c0b5dd63b510a9c83e9c9d06e739.jpg'
        const full_url = `https://dyslexia-dfg.herokuapp.com/ocr_url/?url=${doc_url}`

        /* const local_file_url = 'http://localhost:5000/ocr_file/' */
        /* const public_file_url = 'https://dyslexia-dfg.herokuapp.com/ocr_file/'*/
        /* API deployed on Nathan's Repo */
        const public_file_url = 'https://dyslexia-ocr.herokuapp.com/ocr_file/';
        const url = public_file_url;
        // console.log(public_file_url);

        // Lancement du loading visuel
        const loader = document.querySelector('.preview__area--loading');
        loader.style.display = 'block';

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        /*headers.append('Content-Type', 'multipart/form-data')*/

        /* fetch by FILE */
        let formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');
        /*console.log(fileField);*/

        console.log(fileField.files[0]);
        console.log(fileField.files[0].name);
        formData.append('file', fileField.files[0]);
        console.log(formData);

        const image = document.createElement('img');
        image.src = window.URL.createObjectURL(fileField.files[0]);

        if (url === full_url) {
            data = '';
        } else {
            data = formData;
        }
        // Later, perhaps in a form 'submit' handler or the input's 'change' handler:
        fetch(`${url}`, {
                method: 'POST',
                /*mode: 'no-cors', // no-cors, *cors, same-origin*/
                headers: headers,
                body: data,
            })
            .then((response) =>
                response.json())
            .then((data) => {
                console.log(data);
                //console.log(data["text"]);
                const error = data["error"];
                const result = document.getElementById("preview__area_text");
                if (error) {
                    let message = data["error"]["message"];
                    const code = data["error"]["code"];
                    // IMAGE_BLURY
                    // NO_TEXT_FOUND
                    // UNKNOWN_ERROR
                    switch (code) {
                        case 'IMAGE_BLURRY':
                            message = "Votre image est floue. Veuillez reprendre votre photo SVP 🙏";
                            break;
                        case 'NO_TEXT_FOUND':
                            // code block
                            message = "Votre document ne semble pas contenir de texte lisible ou n'est pas dans une langue supportée par le système.";
                            break;
                        case 'UNKNOWN_ERROR':
                            // code block
                            message = "Une erreur inconnue est survenue. Veuillez retenter ultérieurement SVP 🙏"
                            break;
                        default:
                            // code block
                            message = "Une erreur inconnue est survenue. Veuillez retenter ultérieurement SVP 🙏"
                    }
                    console.log('error' + error);
                    console.log('message' + error);
                    result.classList.toggle("pink");
                    result.innerHTML = `${message}`;
                } else {
                    const text = data["paragraphs"];
                    if (text) {
                        result.innerHTML = "";
                        text.forEach((paragraph) => {
                            result.innerHTML += '<br>';
                            const lines = paragraph.split('\n');
                            lines.forEach((line) => {
                                /* console.log(line);*/
                                result.innerHTML += line + '<br>';
                            });
                        });
                    } else {
                        result.innerHTML = "No Result";
                    }

                    const eye = document.getElementById("myImg")
                    eye.style.opacity = '1';
                }
            })
            .catch(err => {

                console.log('Erreur : ' + err);
                const text = "Une erreur inconnue est survenue, veuillez retenter ultérieurement";

                const result = document.getElementById("preview__area_text");
                result.innerHTML = text;

                const eye = document.getElementById("myImg")
                eye.style.opacity = '1';
                //eye.style.display = 'block';
            })
            .finally(() => {
                // Loading visuel enlevé
                loader.style.display = 'none';
            });


        /* fetch by URL */
        /*fetch(`${full_url}`, {
            //mode: 'no-cors',
            //credentials: 'include',
            method: 'POST',
            headers: headers,
            data: ''
        })
            .then((response) =>
                response.json())
            .then((data) => {
                //console.log(data);
                //console.log(data["text"]);
                const text = data["text"];
                const lines = text.split('\n');
                /!*console.log(lines);*!/
                const result = document.getElementById("preview__area_text");
                result.innerHTML = "";
                lines.forEach( (line)=> {
                    /!* console.log(line);*!/
                    result.innerHTML += line + '<br>';

                });

                const eye = document.getElementById("myImg")
                eye.style.opacity = '1';
            })

            .catch(err => {
                console.log('Erreur : ' + err);
                const text="Unknow Error, please try again in a few minutes";

                const result = document.getElementById("preview__area_text");
                result.innerHTML = text;

                const eye = document.getElementById("myImg")
                eye.style.opacity = '1';
                //eye.style.display = 'block';
            })
            .finally( () => {
                // Loading visuel enlevé
                loader.style.display = 'none';
            });*/
    });

    /* Save Text in preview__area_text div in the clipboard */
    document.getElementById("save-clipboard").addEventListener('click', function() {
        /* Get the text field */
        const text = document.getElementById("preview__area_text").innerText;
        const elem = document.createElement("textarea");
        document.body.appendChild(elem);
        elem.value = text;
        /* Select the text field */
        elem.select();
        elem.setSelectionRange(0, 99999); /* For mobile devices */
        document.execCommand("copy");
        document.body.removeChild(elem);
        /* Copy the text inside the text field */
        /* Alert the copied text */
        alert("Texte copié ! ");

    });

    /* Save content of the div in a Word Document */
    document.getElementById("save-to-word").addEventListener('click', function() {
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
            "xmlns:w='urn:schemas-microsoft-com:office:word' " +
            "xmlns='http://www.w3.org/TR/REC-html40'>" +
            "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + document.getElementById("preview__area_text").innerHTML + footer;

        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'document.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);
    });

    /*};*/

});