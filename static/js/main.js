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
    const cards = document.querySelector('.cards');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cardElements = document.querySelectorAll('.card');
    
    let currentIndex = 0;
    const cardWidth = 300;
    const cardGap = 32; // 2rem
    const totalCards = cardElements.length;
    
    // Auto-rotation interval (5 seconds)
    let autoRotateInterval = setInterval(nextCard, 5000);

    function updateSliderPosition() {
        cards.style.transform = `translateX(-${currentIndex * (cardWidth + cardGap)}px)`;
    }

    function nextCard() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateSliderPosition();
    }

    function prevCard() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateSliderPosition();
    }

    // Click handlers for navigation buttons
    nextBtn.addEventListener('click', () => {
        clearInterval(autoRotateInterval);
        nextCard();
        autoRotateInterval = setInterval(nextCard, 5000);
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(autoRotateInterval);
        prevCard();
        autoRotateInterval = setInterval(nextCard, 5000);
    });

    // Card expansion functionality
    cardElements.forEach(card => {
        card.addEventListener('click', () => {
            clearInterval(autoRotateInterval);
            
            // Toggle expansion of clicked card
            const wasExpanded = card.classList.contains('expanded');
            cardElements.forEach(c => c.classList.remove('expanded'));
            
            if (!wasExpanded) {
                card.classList.add('expanded');
            }
            
            autoRotateInterval = setInterval(nextCard, 5000);
        });
    });

    // Reset auto-rotation when user interacts with cards
    cards.addEventListener('mouseenter', () => {
        clearInterval(autoRotateInterval);
    });

    cards.addEventListener('mouseleave', () => {
        autoRotateInterval = setInterval(nextCard, 5000);
    });
});
