// Mobile menu functionality
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
    document.body.classList.add('menu-open');
  });
}

/*===== MENU HIDDEN =====*/
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    document.body.classList.remove('menu-open');
  });
}

/*===== REMOVE MENU MOBILE =====*/
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
  navMenu.classList.remove('show-menu');
  document.body.classList.remove('menu-open');
}
navLinks.forEach(navLink => navLink.addEventListener('click', linkAction));
/*==================== REMOVE MENU MOBILE ====================*/


/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const header = document.getElementById('header');
  // When the scroll is greater than 80 viewport height, add the scroll-header class to header tag
if (this.scrollY >= 80) {
    header.classList.add('scroll-header');
} else {
    header.classList.remove('scroll-header');
}
}
window.addEventListener('scroll', scrollHeader);

/*==================== ABOUT TABS ====================*/
const tabs = document.querySelectorAll('.tabs__btn');
const tabContents = document.querySelectorAll('.tabs__item');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.getElementById(tab.dataset.target);

    tabContents.forEach(content => {
      content.classList.remove('tab__active');
    });
    target.classList.add('tab__active');

    tabs.forEach(t => t.classList.remove('tab__active'));
    tab.classList.add('tab__active');
  });
});


/*=============== EMAILJS CONTACT FORM ===============*/

// Helper function to escape HTML special characters
function escapeHTML(str) {
  return str.replace(/[&<>"'`=\/]/g, function (s) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '`': '&#96;',
      '=': '&#61;',
      '/': '&#47;',
    })[s];
  });
}

window.onload = () => {
  emailjs.init('UrlFSaqwrwDIOP-yz'); // Your public key
};

const contactForm = document.getElementById('contact-form'),
  contactName = document.getElementById('contact-name'),
  contactEmail = document.getElementById('contact-email'),
  contactSubject = document.getElementById('contact-subject'),
  contactMessage = document.getElementById('contact-message'),
  errorMessage = document.getElementById('error-message'),
  submitBtn = document.querySelector('input[type="submit"]');

function isValidEmail(email) {
  // Simple regex for basic email validation
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Escape user input before using it anywhere
  const nameValue = escapeHTML(contactName.value.trim());
  const emailValue = escapeHTML(contactEmail.value.trim());
  const subjectValue = escapeHTML(contactSubject.value.trim());
  const messageValue = escapeHTML(contactMessage.value.trim());

  if (
    nameValue.length < 3 ||
    !isValidEmail(emailValue) ||
    subjectValue.length < 3 ||
    messageValue.length < 3
  ) {
    errorMessage.textContent = 'Please provide valid inputs in all fields ❗';
    errorMessage.className = 'color-second';
    alert('Please provide valid inputs in all fields ❗');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.value = 'Sending...';

  const templateParams = {
    from_name: nameValue,
    email: emailValue,
    subject: subjectValue,
    message: messageValue,
  };

  emailjs
    .send('service_2mtoh4p', 'template_eq77vud', templateParams)
    .then((response) => {
      console.log('Success:', response);
      errorMessage.textContent = 'Message sent successfully ✔';
      errorMessage.className = 'color-first';
      contactForm.reset();
      submitBtn.value = 'Submit';
      submitBtn.disabled = false;

      setTimeout(() => {
        errorMessage.textContent = '';
      }, 5000);
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      errorMessage.textContent = 'Message not sent ❌';
      errorMessage.className = 'color-second';
      alert('Message not sent ❌');
      submitBtn.value = 'Submit';
      submitBtn.disabled = false;

      setTimeout(() => {
        errorMessage.textContent = '';
      }, 5000);
    });
});


/*=====hstack=====*/
// Enhanced form submission handler
contactForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  // Get form elements
  const submitBtn = this.querySelector('button[type="submit"]');
  const formData = new FormData(this);

  // Simple validation
  if (!formData.get('name') || !formData.get('email') || !formData.get('message')) {
    alert('Please fill all required fields');
    return;
  }

  // Set loading state
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    // Send email
    await emailjs.sendForm(
      'service_2mtoh4p',
      'template_eq77vud',
      this
    );

    // Success - reset form and show message
    this.reset();
    alert('Message sent successfully!');
    
    // Optional: Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

  } catch (error) {
    console.error('Failed to send message:', error);
    alert('Failed to send message. Please try again.');
  } finally {
    // Reset button state
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit';
  }
});

/*======better-scrollbar======*/
document.querySelectorAll('.smooth-scroll').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update URL without jumping
      history.pushState(null, null, targetId);
    }
  });
});

/*======hover-effect======*/
// Active link highlighting based on scroll position
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  
  function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active-link');
      }
    });
  }
  
  // Initial call
  updateActiveLink();
  
  // Listen for scroll events
  window.addEventListener('scroll', updateActiveLink);
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('.nav__link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // Skip if it's a social link or let's talk button
      if (this.classList.contains('nav__social-link') || 
          this.classList.contains('nav__link-btn')) {
        return;
      }
      
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without jumping
        history.pushState(null, null, targetId);
        
        // Close mobile menu if open
        const navMenu = document.getElementById('nav-menu');
        if (navMenu.classList.contains('show-menu')) {
          navMenu.classList.remove('show-menu');
        }
      }
    });
  });
});

/*====responsive====*/
// Only needed if you want to add animation on scroll for mobile
document.addEventListener('DOMContentLoaded', function() {
  if (window.innerWidth <= 992) {
    const homeImg = document.querySelector('.home__img');
    
    function animateOnScroll() {
      const scrollPosition = window.scrollY;
      const homePosition = document.querySelector('.home').offsetTop;
      
      if (scrollPosition > homePosition - 300) {
        homeImg.style.transform = 'scale(1.05)';
        homeImg.style.transition = 'transform 0.5s var(--transition)';
      } else {
        homeImg.style.transform = 'scale(1)';
      }
    }
    
    window.addEventListener('scroll', animateOnScroll);
  }
});

// Make all portfolio items clickable
document.querySelectorAll('.portfolio__item').forEach(item => {
  const link = document.createElement('a');
  link.href = 'https://github.com/Subarna-Sapkota';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'portfolio__link';
  item.prepend(link);
  
  // Prevent nested links from conflicting
  item.querySelectorAll('a').forEach(existingLink => {
    existingLink.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });
});
// Mobile-only scroll effects
function initMobileScrollEffects() {
  if (window.innerWidth > 992) return; // Exit if desktop
  
  const portfolioItems = document.querySelectorAll('.portfolio__item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-active');
      } else {
        entry.target.classList.remove('scroll-active');
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  });

  portfolioItems.forEach(item => observer.observe(item));
}

// Initialize on load and resize
window.addEventListener('load', initMobileScrollEffects);
window.addEventListener('resize', initMobileScrollEffects);