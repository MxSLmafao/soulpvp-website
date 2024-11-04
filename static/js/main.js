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
        const cardWidth = 220;
        const activeScale = 1.2;
        const inactiveScale = 0.85;
        
        // Get the exact center point of the heading
        const headingRect = featuresHeading.getBoundingClientRect();
        const sliderRect = cardSlider.getBoundingClientRect();
        const headingCenter = headingRect.left + (headingRect.width / 2);
        
        // Calculate container center point
        const containerCenter = sliderRect.left + (sliderRect.width / 2);
        
        // Calculate the offset needed to align with heading
        const centerOffset = headingCenter - containerCenter;
        
        cards.forEach((card, index) => {
            const isActive = index === currentIndex;
            const scale = isActive ? activeScale : inactiveScale;
            
            // Calculate base position relative to the heading center
            let xPosition;
            const activeCardWidth = cardWidth * activeScale;
            const inactiveCardWidth = cardWidth * inactiveScale;
            
            if (index < currentIndex) {
                // Cards before active
                const offset = currentIndex - index;
                xPosition = headingCenter - (activeCardWidth / 2) - (offset * (inactiveCardWidth + 20));
            } else if (index > currentIndex) {
                // Cards after active
                const offset = index - currentIndex;
                xPosition = headingCenter + (activeCardWidth / 2) + ((offset - 1) * (inactiveCardWidth + 20));
            } else {
                // Active card - centered exactly with the heading
                xPosition = headingCenter - (cardWidth * scale / 2);
            }
            
            gsap.to(card, {
                x: xPosition - sliderRect.left,
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
            x: index * (220 + 20),
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
