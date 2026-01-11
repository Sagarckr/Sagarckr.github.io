// ============================================
// MENU TOGGLE
// ============================================
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
};

// Close menu when clicking on a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('bx-x');
        navbar.classList.remove('open');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('bx-x');
        navbar.classList.remove('open');
    }
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
const sr = ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset: true
});

// Home Section
sr.reveal('.badge', { delay: 200, origin: 'top' });
sr.reveal('.home-text h1', { delay: 300, origin: 'left' });
sr.reveal('.home-description', { delay: 400, origin: 'right' });
sr.reveal('.main-btn', { delay: 500, origin: 'bottom' });
sr.reveal('.share', { delay: 600, origin: 'bottom' });
sr.reveal('.home-img', { delay: 700, origin: 'right' });

// About Section
sr.reveal('.about-col-1', { delay: 200, origin: 'left' });
sr.reveal('.about-col-2 .sub-title', { delay: 300, origin: 'top' });
sr.reveal('.about-description', { delay: 400, origin: 'right' });
sr.reveal('.stats-container', { delay: 500, origin: 'bottom' });
sr.reveal('.tab-titles', { delay: 600, origin: 'bottom' });

// Services Section
sr.reveal('.section-header', { delay: 200, origin: 'top' });
sr.reveal('.service-card', { delay: 300, origin: 'bottom', interval: 200 });

// Portfolio Section
sr.reveal('.work', { delay: 200, origin: 'bottom', interval: 200 });

// Contact Section
sr.reveal('.contact-left', { delay: 200, origin: 'left' });
sr.reveal('.contact-right', { delay: 300, origin: 'right' });

// ============================================
// TAB SWITCHING FUNCTIONALITY
// ============================================
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    // Remove active classes
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    
    // Add active classes
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        formStatus.innerHTML = '';
        
        try {
            const formData = new FormData(this);
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatus.innerHTML = `
                    <p class="success-message">
                        <i class="fa-solid fa-circle-check"></i> 
                        Thank you! Your message has been sent successfully. I'll get back to you soon.
                    </p>
                `;
                this.reset();
                
                // Auto-hide success message after 5 seconds
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            formStatus.innerHTML = `
                <p class="error-message">
                    <i class="fa-solid fa-circle-xmark"></i> 
                    Oops! Something went wrong. Please email me directly at 
                    <a href="mailto:sagarsharma9821315721@gmail.com">sagarsharma9821315721@gmail.com</a>
                </p>
            `;
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// Check for success redirect from Formspree
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        formStatus.innerHTML = `
            <p class="success-message">
                <i class="fa-solid fa-circle-check"></i> 
                Thank you! Your message has been sent successfully.
            </p>
        `;
        
        // Remove query parameter from URL
        window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
        
        setTimeout(() => {
            formStatus.innerHTML = '';
        }, 5000);
    }
});

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for hash links, not for external links
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// ACTIVE NAVIGATION ON SCROLL
// ============================================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.navbar a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Add scrolled class to header
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================
// TYPING EFFECT FOR HOME SECTION (Optional)
// ============================================
const typingText = document.querySelector('.home-text h1');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after page load
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 1000);
    });
}

// ============================================
// LAZY LOADING IMAGES
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

// ============================================
// STATISTICS COUNTER ANIMATION
// ============================================
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats-container');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statBoxes = document.querySelectorAll('.stat-box h3');
                statBoxes.forEach((box, index) => {
                    const text = box.textContent;
                    const number = parseInt(text);
                    if (!isNaN(number)) {
                        box.textContent = '0+';
                        setTimeout(() => {
                            animateCounter(box, number, 2000);
                        }, index * 200);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// ============================================
// CURSOR EFFECT (Optional - for desktop)
// ============================================
if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower animation
    function animate() {
        const distX = mouseX - followerX;
        const distY = mouseY - followerY;
        
        followerX += distX * 0.1;
        followerY += distY * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animate);
    }
    animate();
    
    // Add hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .service-card, .work');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// PREVENT CONTEXT MENU ON IMAGES (Optional)
// ============================================
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Defer non-critical scripts
window.addEventListener('load', () => {
    // Add any non-critical initialization here
    console.log('Portfolio loaded successfully! 🚀');
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🚀 Portfolio by Sagar Upadhyaya', 'color: #ffae00; font-size: 20px; font-weight: bold;');
console.log('%cData Analyst & Python Developer', 'color: #c3c3c3; font-size: 14px;');
console.log('%c📧 Contact: sagarsharma9821315721@gmail.com', 'color: #ffae00; font-size: 12px;');