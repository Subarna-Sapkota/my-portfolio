/*=============== SHOW MENU ===============*/

/*===== MENU SHOW =====*/
/* Validate if constant exists */

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */

/*==================== REMOVE MENU MOBILE ====================*/

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

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
/*==================== SHOW SCROLL UP ====================*/
// Get the scroll-up button
function scrollUpShow() {
  const scrollUp = document.getElementById('scroll-up');
  // When the scroll is higher than 350 viewport height, add the show-scroll class to scroll-top class
  if (this.scrollY >= 350) {
    scrollUp.classList.add('show-scroll');
  } else {
    scrollUp.classList.remove('show-scroll');
  }
}
window.addEventListener('scroll', scrollUpShow);

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
// (Removed duplicate and erroneous form submission handler and Promise chains)

// Email validation function
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}