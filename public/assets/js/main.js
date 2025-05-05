// Імпорт необхідних модулів
import { modals } from './modal.js';
import { setupAuthHandlers } from './auth.js';
import { setupDesktopUserUI  } from './header.js';
import { initScrollToTop } from './scroll-to-top.js';
import { initFAQ } from './faq.js'; 
import { mobileMenu } from './mobile-menu.js';
import { initSubscriptionForms } from "./subscribe.js";
import { initContactForm } from './contact.js';

document.addEventListener("DOMContentLoaded", () => {

  modals.init();

  setupAuthHandlers(modals);

  setupDesktopUserUI ();

  initScrollToTop();

  initFAQ();

  initSubscriptionForms();

  initContactForm();

    mobileMenu.init();
 const token = localStorage.getItem('token');
  const name = localStorage.getItem('userName');

  if (token && name) {
    setupDesktopUserUI (name);
  }
});
