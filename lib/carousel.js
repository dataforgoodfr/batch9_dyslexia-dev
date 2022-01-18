const carouselElement = document.getElementById("carouselExample");
const searchElement = document.createElement("div");
carouselElement.appendChild(searchElement);
// Add an event listener to the element

searchElement.addEventListener("click", (e) => {
    const event = e.relatedTarget;
    const idx = event.index();
    const itemsPerSlide = 4;
    const totalItems = document.querySelector('.carousel-item').length;

    if (idx >= totalItems - (itemsPerSlide - 1)) {
        const it = itemsPerSlide - (totalItems - idx);
        for (let i = 0; i < it; i++) {
            // append slides to end
            if (e.direction === "left") {
                const carouselInner = document.querySelector('.carousel-inner');
                document.querySelector('.carousel-item')[i].appendChild(carouselInner);
            } else {
                const carouselInner = document.querySelector('.carousel-inner');
                document.querySelector('.carousel-item')[0].appendChild(carouselInner);
            }
        }
    }
});

// Without jQuery
// Define a convenience method and use it
const ready = (callback) => {
    if (document.readyState !== "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}