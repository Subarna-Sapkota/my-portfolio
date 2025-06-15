/*=============== SHOW MENU ===============*/

/*===== MENU SHOW =====*/
/* Validate if constant exists */

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */

/*==================== REMOVE MENU MOBILE ====================*/

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

/*==================== CHANGE BACKGROUND HEADER ====================*/

/*==================== SHOW SCROLL UP ====================*/

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






/*=============== CONTACT FORM =============== */
