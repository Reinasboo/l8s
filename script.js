/**
 * I8 Ultra Smartwatch - Landing Page
 * Production-Ready JavaScript
 * Features: Form Validation, Animations, WhatsApp Integration, Timer, Analytics
 */

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPageLoader();
    initNavigation();
    initScrollAnimations();
    initCountdownTimer();
    initOrderForm();
    initAccordions();
    initStickyBar();
    initMobileMenu();
    
    // Remove loading animation
    setTimeout(() => {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            loader.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => loader.style.display = 'none', 500);
        }
    }, 800);
});

// ===== PAGE LOADER =====

function initPageLoader() {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;
    
    // Add fade out animation class when page fully loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    });
}

// ===== NAVIGATION =====

function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Close menu when link is clicked
    if (mobileMenu) {
        const links = mobileMenu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    // Close menu when scrolling
    window.addEventListener('scroll', () => {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// ===== SCROLL ANIMATIONS =====

function initScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate fade-in-up elements
                if (entry.target.classList.contains('fade-in-up')) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
                
                // Animate feature cards
                if (entry.target.classList.contains('feature-card')) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
                
                // Animate testimonial cards
                if (entry.target.classList.contains('testimonial-card')) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
                
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements that should animate
    document.querySelectorAll('.fade-in-up, .feature-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
}

// ===== COUNTDOWN TIMER =====

function initCountdownTimer() {
    // Set timer for 7 days from now
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    
    function updateTimer() {
        const now = new Date();
        const diff = endDate - now;
        
        if (diff <= 0) {
            // Timer expired
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        
        // Update DOM with zero-padded values
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    // Update immediately and then every second
    updateTimer();
    setInterval(updateTimer, 1000);
    
    // Animate stock bar
    animateStockBar();
}

function animateStockBar() {
    const stockBar = document.getElementById('stockBar');
    const remaining = document.getElementById('remaining');
    let stock = 75;
    let targetStock = 25;
    
    const stockInterval = setInterval(() => {
        if (stock > targetStock) {
            stock -= 1;
            const percentage = (stock / 100) * 100;
            stockBar.style.width = percentage + '%';
            remaining.textContent = stock;
        }
    }, 2000);
}

// ===== ORDER FORM =====

function initOrderForm() {
    const form = document.getElementById('orderForm');
    if (!form) return;
    
    const fullNameInput = document.getElementById('fullName');
    const whatsappInput = document.getElementById('whatsappNumber');
    
    // Real-time validation
    if (fullNameInput) {
        fullNameInput.addEventListener('input', validateName);
        fullNameInput.addEventListener('blur', validateName);
    }
    
    if (whatsappInput) {
        whatsappInput.addEventListener('input', formatPhoneNumber);
        whatsappInput.addEventListener('blur', validatePhone);
    }
    
    // Form submission
    form.addEventListener('submit', handleFormSubmit);
}

function validateName() {
    const input = document.getElementById('fullName');
    const error = input.parentElement.querySelector('.text-error');
    
    if (input.value.trim().length < 2) {
        input.classList.add('border-red-500', 'bg-red-500/10');
        input.classList.remove('border-green-500', 'bg-green-500/10');
        if (error) error.classList.remove('hidden');
        return false;
    } else {
        input.classList.add('border-green-500', 'bg-green-500/10');
        input.classList.remove('border-red-500', 'bg-red-500/10');
        if (error) error.classList.add('hidden');
        return true;
    }
}

function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Limit to 10 digits
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    
    e.target.value = value;
}

function validatePhone() {
    const input = document.getElementById('whatsappNumber');
    const error = input.parentElement.querySelector('.text-error');
    
    const phoneRegex = /^[0-9]{10}$/;
    const isValid = phoneRegex.test(input.value);
    
    if (!isValid && input.value.length > 0) {
        input.classList.add('border-red-500', 'bg-red-500/10');
        input.classList.remove('border-green-500', 'bg-green-500/10');
        if (error) error.classList.remove('hidden');
        return false;
    } else if (isValid) {
        input.classList.add('border-green-500', 'bg-green-500/10');
        input.classList.remove('border-red-500', 'bg-red-500/10');
        if (error) error.classList.add('hidden');
        return true;
    }
    
    return false;
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const whatsappNumber = document.getElementById('whatsappNumber').value.trim();
    const color = document.querySelector('input[name="color"]:checked').value;
    const terms = document.getElementById('terms').checked;
    
    // Validate all fields
    if (!fullName || !whatsappNumber || !terms) {
        showNotification('Please fill all required fields', 'error');
        return;
    }
    
    // Validate name
    if (fullName.length < 2) {
        showNotification('Please enter a valid name', 'error');
        return;
    }
    
    // Validate phone
    if (!/^[0-9]{10}$/.test(whatsappNumber)) {
        showNotification('Please enter a valid 10-digit Nigerian number', 'error');
        return;
    }
    
    // Show success message
    const form = document.getElementById('orderForm');
    const successMsg = document.getElementById('successMessage');
    
    if (successMsg) {
        successMsg.classList.remove('hidden');
        form.style.opacity = '0.5';
        form.style.pointerEvents = 'none';
    }
    
    // Prepare WhatsApp message
    const message = encodeURIComponent(
        `Hello I8 Ultra Team!\n\n` +
        `I would like to order the I8 Ultra Smartwatch.\n\n` +
        `My Details:\n` +
        `Name: ${fullName}\n` +
        `Phone: +234${whatsappNumber}\n` +
        `Color: ${color}\n\n` +
        `Please confirm my order and provide payment details. Thank you!`
    );
    
    // Nigerian WhatsApp Business Number (Replace with your actual number)
    const whatsappLink = `https://wa.me/2341234567890?text=${message}`;
    
    // Redirect to WhatsApp after 2 seconds
    setTimeout(() => {
        window.open(whatsappLink, '_blank');
        
        // Reset form after redirect
        setTimeout(() => {
            form.reset();
            form.style.opacity = '1';
            form.style.pointerEvents = 'auto';
            successMsg.classList.add('hidden');
        }, 1000);
    }, 2000);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    const bgColor = type === 'error' ? 'bg-red-500/20 border-red-400/50 text-red-300' : 'bg-green-500/20 border-green-400/50 text-green-300';
    
    notification.className = `fixed top-6 right-6 p-4 border rounded-lg ${bgColor} z-50 animate-pulse max-w-xs`;
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ===== ACCORDIONS =====

function initAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const button = item.querySelector('button');
        if (button) {
            button.addEventListener('click', toggleAccordion);
        }
    });
}

function toggleAccordion(e) {
    const button = e.currentTarget;
    const item = button.parentElement;
    const content = item.querySelector('div');
    const isOpen = item.classList.contains('open');
    
    // Close all other accordions
    document.querySelectorAll('.faq-item').forEach(faq => {
        if (faq !== item && faq.classList.contains('open')) {
            faq.classList.remove('open');
            faq.querySelector('div').style.display = 'none';
        }
    });
    
    // Toggle current accordion
    if (isOpen) {
        item.classList.remove('open');
        content.style.display = 'none';
    } else {
        item.classList.add('open');
        content.style.display = 'block';
    }
}

// ===== STICKY BAR (Mobile) =====

function initStickyBar() {
    const stickyBar = document.getElementById('stickyBar');
    const stickyOrderBtn = document.getElementById('stickyOrderBtn');
    let lastScrollTop = 0;
    let isVisible = false;
    
    if (!stickyBar) return;
    
    // Show sticky bar after scrolling past hero
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const heroHeight = window.innerHeight;
        
        if (scrollTop > heroHeight && !isVisible) {
            stickyBar.style.transform = 'translateY(0)';
            isVisible = true;
        } else if (scrollTop <= heroHeight && isVisible) {
            stickyBar.style.transform = 'translateY(100%)';
            isVisible = false;
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Scroll to order form on click
    if (stickyOrderBtn) {
        stickyOrderBtn.addEventListener('click', () => {
            const orderSection = document.getElementById('order');
            if (orderSection) {
                orderSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ===== MOBILE MENU =====

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        }
    });
}

// ===== DEMO BUTTON =====

document.addEventListener('DOMContentLoaded', () => {
    const demoBtn = document.getElementById('demoBtn');
    if (demoBtn) {
        demoBtn.addEventListener('click', () => {
            showNotification('Demo video coming soon!', 'info');
        });
    }
});

// ===== SCROLL TO TOP ON ORDER SUCCESS =====

function scrollToOrderForm() {
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===== KEYBOARD NAVIGATION =====

document.addEventListener('keydown', (e) => {
    // Close mobile menu on ESC
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }
    
    // Focus management for accordions
    if (e.key === 'Enter') {
        const target = e.target;
        if (target && target.classList.contains('faq-item')) {
            toggleAccordion({ currentTarget: target.querySelector('button') });
        }
    }
});

// ===== ANALYTICS TRACKING (Optional - Replace with your tracking ID) =====

function trackEvent(eventName, eventData = {}) {
    // Google Analytics tracking (if implemented)
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
    
    // Console log for development
    console.log('Event tracked:', eventName, eventData);
}

// Track form submission
document.addEventListener('submit', (e) => {
    if (e.target.id === 'orderForm') {
        trackEvent('form_submit', {
            form_name: 'order_form',
            timestamp: new Date().toISOString()
        });
    }
});

// Track page scroll depth
let maxScrollDepth = 0;
window.addEventListener('scroll', () => {
    const scrollDepth = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Track milestones
        if (Math.round(scrollDepth) % 25 === 0) {
            trackEvent('scroll_depth', {
                depth_percent: Math.round(scrollDepth)
            });
        }
    }
});

// ===== PERFORMANCE OPTIMIZATION =====

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Add ARIA labels where needed
document.querySelectorAll('button[type="submit"]').forEach(btn => {
    btn.setAttribute('aria-label', 'Submit order form');
});

// Announce form validation messages
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => announcement.remove(), 1000);
}

// ===== SERVICE WORKER (Optional - for PWA support) =====

if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed:', err));
}

// ===== EXPORT FUNCTIONS FOR TESTING =====

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateName,
        validatePhone,
        handleFormSubmit,
        trackEvent
    };
}
