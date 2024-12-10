document.addEventListener('DOMContentLoaded', () => {
    // Add scroll animation effect
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.player-highlight, .joker-section, .playing-style, .fun-facts, .quote-section');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('fade-in-visible');
            }
        });
    };

    // Initialize scroll listener
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Stats number animation
    const animateStats = () => {
        const stats = {
            ppg: { target: 20.2, current: 0 },
            rpg: { target: 10.5, current: 0 },
            apg: { target: 6.6, current: 0 }
        };

        const statsText = document.querySelector('.stats-box li:last-child');
        const duration = 2000; // Animation duration is 2 seconds
        const steps = 60;
        const interval = duration / steps;

        let step = 0;
        const animation = setInterval(() => {
            step++;
            for (let stat in stats) {
                stats[stat].current = (stats[stat].target / steps) * step;
            }

            statsText.textContent = ` Career averages: ${stats.ppg.current.toFixed(1)} PPG, ${stats.rpg.current.toFixed(1)} RPG, ${stats.apg.current.toFixed(1)} APG`;

            if (step >= steps) clearInterval(animation);
        }, interval);
    };

    // Add image hover effect
    const jokerImage = document.querySelector('.joker-image');
    if (jokerImage) {
        jokerImage.addEventListener('mouseover', () => {
            jokerImage.style.transform = `rotate(${Math.random() * 10 - 5}deg) scale(1.1)`;
        });

        jokerImage.addEventListener('mouseout', () => {
            jokerImage.style.transform = 'rotate(0deg) scale(1)';
        });
    }

    // Rewrite quote section handling
    const quote = document.querySelector('blockquote');
    if (quote) {
        const originalQuote = "I don't care about stats, I care about winning. That's what basketball is all about.";
        const originalFooter = "- Nikola Jokić";
        const footer = quote.querySelector('footer');
        
        quote.addEventListener('mouseenter', () => {
            let displayText = '';
            let currentIndex = 0;
            
            // Clear existing content
            quote.firstChild.textContent = '';
            footer.textContent = '';
            
            const typeInterval = setInterval(() => {
                if (currentIndex < originalQuote.length) {
                    displayText += originalQuote[currentIndex];
                    quote.firstChild.textContent = displayText;
                    currentIndex++;
                } else {
                    clearInterval(typeInterval);
                    footer.textContent = originalFooter;
                }
            }, 50);
        });
        
        quote.addEventListener('mouseleave', () => {
            quote.firstChild.textContent = originalQuote;
            footer.textContent = originalFooter;
        });
    }

    // Add interactive highlight effect
    const styleHighlights = document.querySelectorAll('.style-highlights li');
    styleHighlights.forEach(highlight => {
        highlight.addEventListener('mouseenter', () => {
            highlight.style.transform = 'translateX(20px) scale(1.05)';
            highlight.style.backgroundColor = 'var(--nuggets-gold)';
            highlight.style.color = 'var(--nuggets-blue)';
        });

        highlight.addEventListener('mouseleave', () => {
            highlight.style.transform = '';
            highlight.style.backgroundColor = '';
            highlight.style.color = '';
        });
    });

    // Add 3D card effect
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        const content = card.querySelector('.card-content');
        
        // Mouse move event handler
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation angles
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            // Apply transformation
            content.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.05, 1.05, 1.05)
            `;
        });
        
        // Mouse leave event handler
        card.addEventListener('mouseleave', () => {
            content.style.transform = `
                perspective(1000px)
                rotateX(0deg)
                rotateY(0deg)
                scale3d(1, 1, 1)
            `;
        });
        
        // Mouse enter event handler
        card.addEventListener('mouseenter', () => {
            content.style.transition = 'all 0.1s ease';
        });
        
        // Ensure smooth transition on leave
        card.addEventListener('mouseleave', () => {
            content.style.transition = 'all 0.5s ease';
        });
    });

    // Initialize effects
    animateStats();
});

// Add necessary CSS
const style = document.createElement('style');
style.textContent = `
    .fade-in-visible {
        animation: fadeInUp 0.8s ease-out forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .player-highlight, .joker-section, .playing-style, .fun-facts, .quote-section {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.8s ease-out;
    }

    .card-3d {
        perspective: 1000px;
        transform-style: preserve-3d;
        padding: 20px;
    }

    .card-content {
        position: relative;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        transition: transform 0.5s ease;
    }

    .card-content::before {
        content: '';
        position: absolute;
        inset: -20px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        backdrop-filter: blur(10px);
        box-shadow: 
            0 5px 15px rgba(0,0,0,0.1),
            0 15px 35px rgba(0,0,0,0.2);
        transform: translateZ(-50px);
        transition: all 0.5s ease;
    }

    .card-content:hover::before {
        box-shadow: 
            0 10px 30px rgba(0,0,0,0.2),
            0 30px 60px rgba(0,0,0,0.3);
    }

    .feature-image,
    .stats-box {
        transform: translateZ(50px);
    }
`;
document.head.appendChild(style);