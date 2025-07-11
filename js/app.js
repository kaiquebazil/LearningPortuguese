
// Toggle card content
document.querySelectorAll('.card-header').forEach(header => {
    header.addEventListener('click', () => {
        const body = document.getElementById(header.id.replace('Header', 'Body'));
        header.classList.toggle('collapsed');
        body.classList.toggle('collapsed');
    });
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    document.getElementById('progressBar').style.width = scrollProgress + '%';

    // Show/hide back to top button
    const backToTop = document.getElementById('backToTop');
    if (scrollTop > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Back to top button
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Search functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm.length < 2) return;

    // Search through all content
    const cards = document.querySelectorAll('.card-body');
    cards.forEach(card => {
        const content = card.textContent.toLowerCase();
        if (content.includes(searchTerm)) {
            card.parentElement.style.display = 'block';
            // Highlight matches
            const regex = new RegExp(searchTerm, 'gi');
            card.innerHTML = card.innerHTML.replace(regex, match =>
                `<span class="highlight">${match}</span>`
            );
        } else {
            card.parentElement.style.display = 'none';
        }
    });
});

// Animation on scroll
const animateElements = document.querySelectorAll('.animate');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

animateElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Audio functionality
function playAudio(text) {
    // In a real implementation, you would use a text-to-speech API or pre-recorded audio files
    // This is a placeholder for the actual implementation
    console.log("Playing audio for: " + text);

    // For demonstration, we'll use the Web Speech API
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR'; // Set language to Brazilian Portuguese
        speechSynthesis.speak(utterance);
    } else {
        alert("Text-to-speech not supported in your browser");
    }
}

// Initialize any remaining functionality
document.addEventListener('DOMContentLoaded', function () {
    // Add any additional initialization code here

    // Example: Make all external links open in new tab
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
});

// Menu mobile
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fechar menu quando um link for clicado
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Suavizar rolagem para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Ajuste para o navbar fixo
                behavior: 'smooth'
            });
        }
    });
});
