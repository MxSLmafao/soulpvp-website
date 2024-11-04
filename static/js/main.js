// Copy IP function
function copyIP() {
    const serverIP = document.getElementById('server-ip');
    const textArea = document.createElement('textarea');
    textArea.value = serverIP.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    // Visual feedback
    const button = document.querySelector('.ip-box button');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => {
        button.innerHTML = originalText;
    }, 2000);
}

// Card Slider functionality
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const cardsContainer = document.querySelector('.cards-container');
    const cardSlider = document.querySelector('.card-slider');
    const featuresHeading = document.querySelector('.features h3');
    const CARD_WIDTH = 220;
    const SPACING = 2;
    const ACTIVE_SCALE = 1.2;
    const INACTIVE_SCALE = 0.85;
    let currentIndex = 0;

    // Calculate positions for each card
    function calculateCardPositions() {
        const headingRect = featuresHeading.getBoundingClientRect();
        const headingCenter = headingRect.left + (headingRect.width / 2);
        const containerRect = cardsContainer.getBoundingClientRect();
        
        cards.forEach((card, index) => {
            const isActive = index === currentIndex;
            const scale = isActive ? ACTIVE_SCALE : INACTIVE_SCALE;
            
            // Calculate the position based on CARD_WIDTH
            const baseOffset = headingCenter - containerRect.left - (CARD_WIDTH / 2);
            let xPosition;
            
            if (index < currentIndex) {
                const offset = currentIndex - index;
                xPosition = baseOffset - (offset * (CARD_WIDTH + SPACING));
            } else if (index > currentIndex) {
                const offset = index - currentIndex;
                xPosition = baseOffset + (offset * (CARD_WIDTH + SPACING));
            } else {
                xPosition = baseOffset;
            }

            gsap.to(card, {
                x: xPosition,
                scale: scale,
                opacity: isActive ? 1 : 0.5,
                zIndex: isActive ? 10 : 1,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    }

    // Initial setup
    cards.forEach((card, index) => {
        gsap.set(card, {
            x: index * (CARD_WIDTH + SPACING),
            opacity: index === 0 ? 1 : 0.5,
            scale: index === 0 ? ACTIVE_SCALE : INACTIVE_SCALE,
            zIndex: index === 0 ? 10 : 1
        });
    });

    function goToSlide(index) {
        if (index < 0) index = cards.length - 1;
        if (index >= cards.length) index = 0;
        
        currentIndex = index;
        calculateCardPositions();
    }

    // Navigation buttons
    document.querySelector('.next').addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    document.querySelector('.prev').addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    // Auto-rotation
    let autoRotation = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);

    // Pause auto-rotation on hover
    cardSlider.addEventListener('mouseenter', () => {
        clearInterval(autoRotation);
    });

    cardSlider.addEventListener('mouseleave', () => {
        autoRotation = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    });

    // Handle window resize
    window.addEventListener('resize', calculateCardPositions);

    // Initial positioning
    calculateCardPositions();
});
