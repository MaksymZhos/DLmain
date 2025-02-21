document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;
    let isScrolling = false;

    function showCard(index) {
        cards.forEach((card, i) => {
            if (i === index) {
                card.style.display = "block";
                card.style.opacity = "1"; // Smooth fade-in
                dots[i].classList.add("active");
            } else {
                card.style.display = "none";
                card.style.opacity = "0"; // Smooth fade-out
                dots[i].classList.remove("active");
            }
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            currentIndex = index;
            showCard(currentIndex);
        });
    });

    function autoScroll() {
        currentIndex = (currentIndex + 1) % cards.length;
        showCard(currentIndex);
    }

    setInterval(autoScroll, 10000);

    window.addEventListener("wheel", function (event) {
        if (isScrolling) return; // Prevent rapid scrolling
        isScrolling = true;

        if (event.deltaY > 0) {
            currentIndex = (currentIndex + 1) % cards.length;
        } else {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        }

        showCard(currentIndex);

        setTimeout(() => {
            isScrolling = false;
        }, 500); // Delay to prevent rapid switching
    });

    showCard(currentIndex);
});
document.querySelectorAll('.frame-box').forEach(function(frameBox) {
    frameBox.addEventListener('click', function() {
        const pElements = frameBox.querySelectorAll('p');
        const ulElement = frameBox.querySelector('ul');
        const yellowBox = frameBox.querySelector('.yellow-box-sub');

        // Check the current state of the <ul> (visible if its display is 'block')
        const isUlVisible = ulElement.style.display === 'block';

        if (!isUlVisible) {
            // First click: hide <p> and show <ul>
            pElements.forEach(p => p.style.display = 'none');
            if (ulElement) ulElement.style.display = 'block';
            if (yellowBox) yellowBox.style.visibility = 'hidden';
            frameBox.style.borderColor = '#F1DD6E';
        } else {
            // Second click: reset - hide <ul> and show <p>
            pElements.forEach(p => p.style.display = 'block');
            if (ulElement) ulElement.style.display = 'none';
            if (yellowBox) yellowBox.style.visibility = 'visible';
            frameBox.style.borderColor = '';
        }
    });
});

// Reset the state on scroll
window.addEventListener('wheel', function() {
    document.querySelectorAll('.frame-box').forEach(function(frameBox) {
        const pElements = frameBox.querySelectorAll('p');
        const ulElement = frameBox.querySelector('ul');
        const yellowBox = frameBox.querySelector('.yellow-box-sub');

        // Reset display properties to initial state
        pElements.forEach(p => p.style.display = 'block');
        if (ulElement) ulElement.style.display = 'none';
        if (yellowBox) yellowBox.style.visibility = 'visible';
        frameBox.style.borderColor = '';
    });
});
