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
    let currentIndex = 0;

    // Calculate positions for each card
    function calculateCardPositions() {
        const containerWidth = cardsContainer.offsetWidth;
        const cardWidth = 220; // Updated card width
        const spacing = 2; // Minimal spacing between cards

        cards.forEach((card, index) => {
            const offset = index - currentIndex;
            const xPosition = offset * (cardWidth + spacing);
            const scale = index === currentIndex ? 1.2 : 0.85;
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

        // Center the cards container
        const totalWidth = cards.length * (cardWidth + spacing);
        const centerOffset = (containerWidth - cardWidth) / 2;
        gsap.to(cardsContainer, {
            x: centerOffset - (currentIndex * (cardWidth + spacing)),
            duration: 0.5,
            ease: "power2.out"
        });
    }

    // Initial setup
    cards.forEach((card, index) => {
        gsap.set(card, {
            x: index * 222, // cardWidth + spacing
            opacity: index === 0 ? 1 : 0.5,
            scale: index === 0 ? 1.2 : 0.85
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
    const autoRotation = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);

    // Pause auto-rotation on hover
    cardsContainer.addEventListener('mouseenter', () => {
        clearInterval(autoRotation);
    });

    // Handle window resize
    window.addEventListener('resize', calculateCardPositions);

    // Initial positioning
    calculateCardPositions();
});
