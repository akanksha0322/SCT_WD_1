// DOM Elements
const particleContainer = document.getElementById('particles');
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

// Global mouse position for effects
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Product Category Filtering
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        const products = document.querySelectorAll('.product-item');
        
        products.forEach(product => {
            if (category === 'all' || product.dataset.category === category) {
                product.style.display = 'block';
                product.style.opacity = '0';
                product.style.transform = 'translateY(20px)';
                
                // Animate in
                setTimeout(() => {
                    product.style.opacity = '1';
                    product.style.transform = 'translateY(0)';
                }, 100);
            } else {
                product.style.opacity = '0';
                product.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    product.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Magnetic Button Effect
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// Dynamic Particle System
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    
    const duration = Math.random() * 3 + 2;
    particle.style.animationDuration = `${duration}s`;
    
    particleContainer.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, duration * 1000);
}

// Create particles continuously
setInterval(createParticle, 200);

// Interactive particles that respond to mouse movement
document.addEventListener('mousemove', (e) => {
    // Create particle trail on mouse move
    if (Math.random() < 0.1) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        particle.style.width = '3px';
        particle.style.height = '3px';
        particle.style.background = '#00d4ff';
        particle.style.position = 'fixed';
        particle.style.pointerEvents = 'none';
        particle.style.borderRadius = '50%';
        particle.style.opacity = '0.8';
        particle.style.animation = 'float 1s ease-out forwards';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
});

// Parallax Scrolling Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-layer');
    
    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Navbar scroll effect
    if (scrolled > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Parallax background layers
    const layer1 = document.querySelector('.layer1');
    const layer2 = document.querySelector('.layer2');
    const layer3 = document.querySelector('.layer3');
    
    if (layer1) layer1.style.transform = `translateY(${scrolled * 0.2}px)`;
    if (layer2) layer2.style.transform = `translateY(${scrolled * 0.5}px)`;
    if (layer3) layer3.style.transform = `translateY(${scrolled * 0.8}px)`;
});

// Scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.text-reveal, .feature-card, .product-item').forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
});

// 3D Transform on Scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const transform3DElements = document.querySelectorAll('.transform-3d');
    
    transform3DElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.pageYOffset;
        const elementHeight = rect.height;
        
        if (scrolled > elementTop - window.innerHeight && 
            scrolled < elementTop + elementHeight) {
            const progress = (scrolled - (elementTop - window.innerHeight)) / 
                           (elementHeight + window.innerHeight);
            
            const rotateX = (progress - 0.5) * 20;
            const rotateY = (progress - 0.5) * 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    });
});

// Live Scenery - Dynamic Background Changes
function updateScenery() {
    const hour = new Date().getHours();
    const sceneryLayers = document.querySelectorAll('.animated-bg');
    
    sceneryLayers.forEach((layer, index) => {
        if (hour >= 6 && hour < 18) {
            // Day time colors
            layer.style.background = `
                radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(0, 255, 100, 0.1) 0%, transparent 50%)
            `;
        } else {
            // Night time colors
            layer.style.background = `
                radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 0, 150, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(138, 43, 226, 0.1) 0%, transparent 50%)
            `;
        }
    });
}

// Update scenery every minute
updateScenery();
setInterval(updateScenery, 60000);

// Mobile Navigation
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        span.style.transform = navMenu.classList.contains('active') 
            ? `rotate(${index === 0 ? 45 : index === 1 ? 0 : -45}deg) translate(${index === 1 ? '100px' : '0'}, ${index === 0 ? '8px' : index === 2 ? '-8px' : '0'})`
            : 'rotate(0deg) translate(0, 0)';
        span.style.opacity = navMenu.classList.contains('active') && index === 1 ? '0' : '1';
    });
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // Reset hamburger menu
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'rotate(0deg) translate(0, 0)';
            span.style.opacity = '1';
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Glassmorphism intensity based on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const glassElements = document.querySelectorAll('.glass-effect');
    
    glassElements.forEach(element => {
        const intensity = Math.min(scrolled / 500, 1);
        element.style.backdropFilter = `blur(${10 + intensity * 10}px)`;
        element.style.background = `rgba(255, 255, 255, ${0.1 + intensity * 0.1})`;
    });
});

// Floating Elements Animation
function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.float-element');
    
    floatingElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
        );
        
        if (distance < 200) {
            const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
            const force = (200 - distance) / 200;
            
            const moveX = Math.cos(angle) * force * 20;
            const moveY = Math.sin(angle) * force * 20;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.2})`;
        } else {
            element.style.transform = 'translate(0, 0) scale(1)';
        }
    });
    
    requestAnimationFrame(animateFloatingElements);
}

animateFloatingElements();

// Text Reveal Animation on Scroll
const textRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target;
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.text-reveal').forEach(text => {
    textRevealObserver.observe(text);
});

// Newsletter Form Handling
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('.email-input').value;
    
    if (email) {
        // Show success message
        const subscribeBtn = document.querySelector('.subscribe-btn');
        const originalText = subscribeBtn.innerHTML;
        
        subscribeBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
        subscribeBtn.style.background = 'linear-gradient(45deg, #00ff64, #00d4ff)';
        
        setTimeout(() => {
            subscribeBtn.innerHTML = originalText;
            subscribeBtn.style.background = 'linear-gradient(45deg, #00d4ff, #ff0096)';
            document.querySelector('.email-input').value = '';
        }, 2000);
    }
});

// Product hover effects
document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) rotateX(5deg) rotateY(5deg)';
        item.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.3)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        item.style.boxShadow = 'none';
    });
});

// Performance optimization for animations
let ticking = false;

function updateAnimations() {
    // Update particle positions
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        const rect = particle.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) {
            particle.remove();
        }
    });
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Animate hero text
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const spans = heroTitle.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.style.animationDelay = `${index * 0.2}s`;
        });
    }
    
    // Initialize other animations
    setTimeout(() => {
        document.querySelectorAll('.text-reveal').forEach(el => {
            el.classList.add('revealed');
        });
    }, 500);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Accessibility improvements
const focusableElements = document.querySelectorAll(
    'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
);

focusableElements.forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #00d4ff';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    document.documentElement.style.setProperty('--transition-duration', '0.01ms');
}

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
        img.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.style.cssText = `
            width: 100%;
            height: 200px;
            background: linear-gradient(45deg, #1a1a1a, #2a2a2a);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
            font-size: 14px;
        `;
        placeholder.textContent = 'Image not available';
        img.parentNode.replaceChild(placeholder, img);
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(45deg, #00ff64, #00d4ff)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = 'linear-gradient(45deg, #00d4ff, #ff0096)';
                submitBtn.disabled = false;
            }, 3000);
        }, 2000);
    });
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Search functionality for products page
const searchInput = document.querySelector('.search-input');
const filterSelects = document.querySelectorAll('.filter-select');

function filterProducts() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const categoryFilter = document.querySelector('.filter-select') ? document.querySelector('.filter-select').value : 'all';
    const priceFilter = document.querySelectorAll('.filter-select')[1] ? document.querySelectorAll('.filter-select')[1].value : 'all';
    
    const products = document.querySelectorAll('.product-item');
    
    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        const productCategory = product.dataset.category;
        const productPrice = parseFloat(product.querySelector('.product-price').textContent.replace('$', '').replace(',', ''));
        
        let showProduct = true;
        
        // Search filter
        if (searchTerm && !productName.includes(searchTerm)) {
            showProduct = false;
        }
        
        // Category filter
        if (categoryFilter !== 'all' && productCategory !== categoryFilter) {
            showProduct = false;
        }
        
        // Price filter
        if (priceFilter !== 'all') {
            switch (priceFilter) {
                case 'under-100':
                    if (productPrice >= 100) showProduct = false;
                    break;
                case '100-500':
                    if (productPrice < 100 || productPrice > 500) showProduct = false;
                    break;
                case '500-1000':
                    if (productPrice < 500 || productPrice > 1000) showProduct = false;
                    break;
                case 'over-1000':
                    if (productPrice <= 1000) showProduct = false;
                    break;
            }
        }
        
        if (showProduct) {
            product.style.display = 'block';
            product.style.opacity = '1';
            product.style.transform = 'translateY(0)';
        } else {
            product.style.opacity = '0';
            product.style.transform = 'translateY(20px)';
            setTimeout(() => {
                product.style.display = 'none';
            }, 300);
        }
    });
}

if (searchInput) {
    searchInput.addEventListener('input', filterProducts);
}

filterSelects.forEach(select => {
    select.addEventListener('change', filterProducts);
});

// Chat button functionality
const chatBtn = document.querySelector('.chat-btn');
if (chatBtn) {
    chatBtn.addEventListener('click', () => {
        alert('Chat feature will be available soon! Please use the contact form or call us directly.');
    });
}

// Add to cart functionality
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const productName = btn.closest('.product-item').querySelector('h3').textContent;
        
        // Show success message
        const originalText = btn.textContent;
        btn.textContent = 'Added!';
        btn.style.background = 'linear-gradient(45deg, #00ff64, #00d4ff)';
        
        // Show notification
        showNotification(`${productName} added to cart!`);
        
        // Reset button
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = 'linear-gradient(45deg, #00ff64, #00d4ff)';
        }, 2000);
    });
});

// Quick view functionality
document.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const productName = btn.closest('.product-item').querySelector('h3').textContent;
        showNotification(`Quick view for ${productName} - Feature coming soon!`);
    });
});

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification glass-effect';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 212, 255, 0.9);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 10000;
        backdrop-filter: blur(10px);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Initialize active nav link
setActiveNavLink();

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    // Clear intervals and timeouts
    clearInterval(createParticle);
    clearInterval(updateScenery);
});