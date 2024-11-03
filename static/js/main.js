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
    let currentIndex = 0;

    // Calculate positions for each card
    function calculateCardPositions() {
        const sliderWidth = cardSlider.offsetWidth;
        const cardWidth = 220; // Base card width
        const spacing = 2; // Minimal spacing between cards
        const activeScale = 1.2;
        const inactiveScale = 0.85;
        
        // Get the heading's center position
        const headingRect = featuresHeading.getBoundingClientRect();
        const headingCenter = headingRect.left + (headingRect.width / 2);
        const sliderRect = cardSlider.getBoundingClientRect();
        
        // Calculate the scaled widths
        const activeCardWidth = cardWidth * activeScale;
        const inactiveCardWidth = cardWidth * inactiveScale;
        
        // Calculate positions relative to the heading center
        const containerOffset = headingCenter - sliderRect.left - (activeCardWidth / 2);
        
        cards.forEach((card, index) => {
            const offset = index - currentIndex;
            let xPosition;
            
            if (index < currentIndex) {
                // Cards before active
                xPosition = containerOffset - ((currentIndex - index) * (inactiveCardWidth + spacing));
            } else if (index > currentIndex) {
                // Cards after active
                xPosition = containerOffset + activeCardWidth + ((index - currentIndex - 1) * (inactiveCardWidth + spacing));
            } else {
                // Active card - centered under heading
                xPosition = containerOffset;
            }

            const scale = index === currentIndex ? activeScale : inactiveScale;
            const opacity = index === currentIndex ? 1 : 0.5;
            const zIndex = index === currentIndex ? 10 : 1;

            gsap.to(card, {
                x: xPosition,
                scale: scale,
                opacity: opacity,
                zIndex: zIndex,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    }

    // Initial setup
    cards.forEach((card, index) => {
        gsap.set(card, {
            x: index * 222,
            opacity: index === 0 ? 1 : 0.5,
            scale: index === 0 ? 1.2 : 0.85,
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
