// Menu Toggle
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

// ScrollReveal Animations
const sr = ScrollReveal({
    distance: '40px',
    duration: 2500,
    reset: true
});

sr.reveal('.home-text span', { delay: 600, origin: 'top' });
sr.reveal('.home-text h1', { delay: 680, origin: 'left' });
sr.reveal('.home-text p', { delay: 750, origin: 'right' });
sr.reveal('.main-btn', { delay: 860, origin: 'left' });
sr.reveal('.share', { delay: 950, origin: 'bottom' });
sr.reveal('.home-img', { delay: 1000, origin: 'right' });

// Tab Switching Functionality
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const statusDiv = document.getElementById('formStatus');
    const submitBtn = this.querySelector('button[type="submit"]');
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    statusDiv.textContent = '';
    statusDiv.className = '';
    
    try {
        const response = await fetch('/send-email', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            statusDiv.innerHTML = `
                <p class="success-message">
                    <i class="fa-solid fa-circle-check"></i> 
                    ${data.message}
                </p>
            `;
            this.reset();
            
            // Auto-hide success message after 5 seconds
            setTimeout(() => {
                statusDiv.innerHTML = '';
            }, 5000);
        } else {
            statusDiv.innerHTML = `
                <p class="error-message">
                    <i class="fa-solid fa-circle-xmark"></i> 
                    Failed to send message. Please try again or email me directly.
                </p>
            `;
        }
    } catch (error) {
        console.error('Form submission error:', error);
        statusDiv.innerHTML = `
            <p class="error-message">
                <i class="fa-solid fa-circle-xmark"></i> 
                Connection error. Please email me directly at 
                <a href="mailto:sagarsharma9821315721@gmail.com">sagarsharma9821315721@gmail.com</a>
            </p>
        `;
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
});

// Smooth Scrolling for Navigation Links
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

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section, div[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.navbar a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});