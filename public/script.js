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

    setInterval(autoScroll, 500000);

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
        }, 300); // Delay to prevent rapid switching
    });

    showCard(currentIndex);
});
document.querySelectorAll('.frame-box').forEach(function(frameBox) {
    frameBox.addEventListener('click', function() {
        const pElements = frameBox.querySelectorAll('p');
        const ulElement = frameBox.querySelector('ul');

        // Check the current state of visibility and toggle accordingly
        if (ulElement.style.display === 'none' || ulElement.style.display === '') {
            // If the <ul> is not visible, hide <p> and show <ul>
            pElements.forEach(function(p) {
                p.style.display = 'none'; // Hide the <p> text
            });
            if (ulElement) {
                ulElement.style.display = 'block'; // Show the <ul> list
            }
        } else {
            // If the <ul> is visible, hide <ul> and show <p>
            pElements.forEach(function(p) {
                p.style.display = 'block'; // Show the <p> text again
            });
            if (ulElement) {
                ulElement.style.display = 'none'; // Hide the <ul> list
            }
        }

        // Toggle visibility of the yellow-box
        const yellowBox = frameBox.querySelector('.yellow-box-sub');
        yellowBox.style.display = yellowBox.style.display === 'none' ? 'block' : 'none';

        // Change the border color
        const currentBorderColor = frameBox.style.borderColor;
        if (currentBorderColor === 'rgb(241, 221, 110)') {
            frameBox.style.borderColor = ''; // Reset to original color
        } else {
            frameBox.style.borderColor = '#F1DD6E'; // Set to the new color
        }
    });
});


