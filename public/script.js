document.addEventListener("wheel", function (event) {
    event.preventDefault();

    let dots = document.querySelectorAll(".dot");
    let activeDot = document.querySelector(".dot.active");
    let currentIndex = Array.from(dots).indexOf(activeDot);

    if (event.deltaY > 0 && currentIndex < dots.length - 1) {
        dots[currentIndex].classList.remove("active");
        dots[currentIndex + 1].classList.add("active");
    } else if (event.deltaY < 0 && currentIndex > 0) {
        dots[currentIndex].classList.remove("active");
        dots[currentIndex - 1].classList.add("active");
    }
}, { passive: false });
