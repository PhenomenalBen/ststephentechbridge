// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');
const navCta = document.querySelector('.nav-cta');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a, .nav-cta a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animate stats on scroll
const animateStats = () => {
    const statItems = document.querySelectorAll('.stat-item h3');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target;
                const text = statElement.textContent;
                const numberMatch = text.match(/\d+/);
                
                if (numberMatch) {
                    const finalNumber = parseInt(numberMatch[0]);
                    const icon = statElement.querySelector('i');
                    const iconHTML = icon ? icon.outerHTML : '';
                    let currentNumber = 0;
                    const increment = Math.ceil(finalNumber / 50);
                    const duration = 1500;
                    const intervalTime = duration / (finalNumber / increment);
                    
                    const counter = setInterval(() => {
                        currentNumber += increment;
                        if (currentNumber >= finalNumber) {
                            statElement.innerHTML = iconHTML + ' ' + text.replace(/\d+/, finalNumber);
                            clearInterval(counter);
                        } else {
                            statElement.innerHTML = iconHTML + ' ' + text.replace(/\d+/, currentNumber);
                        }
                    }, intervalTime);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statItems.forEach(item => observer.observe(item));
};

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .impact-text, .impact-image');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => observer.observe(element));
};

// Contact form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simple validation
    if (name && email && message) {
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateStats();
    animateOnScroll();
});

// Add active class to current nav item based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.style.color = '#1a1a1a';
            });
            if (navLink) {
                navLink.style.color = '#dc2626';
            }
        }
    });
});

// Add parallax effect to hero section (removed - was causing overlap issue)
// Commented out to fix stats section disappearing under hero
/*
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
*/


window.addEventListener('load', () => {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    document.body.appendChild(preloader);
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 300);
    }, 500);
});
