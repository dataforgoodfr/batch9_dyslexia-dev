const carouselElement = document.getElementById("carouselExample");
const searchElement = document.createElement("div");
carouselElement.appendChild(searchElement);
// Add an event listener to the element

searchElement.addEventListener("click", (e) => {
    const event = e.relatedTarget;
    const idx = event.index();
    const itemsPerSlide = 4;
    const totalItems = document.querySelector('.carousel-item').length;

    if (idx >= totalItems-(itemsPerSlide-1)) {
        const it = itemsPerSlide - (totalItems - idx);
        for (let i=0; i<it; i++) {
            // append slides to end
            if (e.direction === "left") {
                const carouselInner = document.querySelector('.carousel-inner');
                document.querySelector('.carousel-item')[i].appendChild(carouselInner);
            }
            else {
                const carouselInner = document.querySelector('.carousel-inner');
                document.querySelector('.carousel-item')[0].appendChild(carouselInner);
            }
        }
    }
});

/*document.getElementById('#carouselExample').carousel({
                interval: 2000
});*/

// Without jQuery
// Define a convenience method and use it
const ready = (callback) => {
  if (document.readyState !== "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

/*ready(() => {
  /!* Do things after DOM has fully loaded *!/
    document.querySelector('a.thumb').addEventListener('click', (event) => {
        event.preventDefault();
        const content = document.querySelector('.modal-body');
        content.empty();
        document.querySelector('.modal-title').innerHTML("MyTITLE");
        document.querySelector(".modal-profile").modal({show:true});
    })
});*/


