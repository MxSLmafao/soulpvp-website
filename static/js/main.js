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
    // Initialize GSAP timeline for auto-rotation
    const cards = document.querySelectorAll('.card');
    const cardsContainer = document.querySelector('.cards-container');
    let currentIndex = 0;

    // Initial setup
    gsap.set(cards, {
        opacity: 0.5,
        scale: 0.8,
        x: (i) => i * 182  // New spacing (180px card + 2px total margin)
    });
    
    gsap.set(cards[0], {
        opacity: 1,
        scale: 1
    });

    function goToSlide(index) {
        gsap.to(cardsContainer, {
            x: -index * 182,  // Match the new spacing
            duration: 0.7,
            ease: "power2.out"
        });

        // Animate cards
        cards.forEach((card, i) => {
            gsap.to(card, {
                opacity: i === index ? 1 : 0.5,
                scale: i === index ? 1 : 0.8,
                duration: 0.7,
                ease: "power2.out"
            });
        });
        
        currentIndex = index;
    }

    // Navigation buttons
    document.querySelector('.next').addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            goToSlide(currentIndex + 1);
        }
    });

    document.querySelector('.prev').addEventListener('click', () => {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    });

    // Auto-rotation
    const autoRotation = setInterval(() => {
        if (currentIndex < cards.length - 1) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(0);
        }
    }, 5000);
});
