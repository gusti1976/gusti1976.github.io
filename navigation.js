/**
 * Global Navigation - Hamburger Menu
 * Handles menu toggle, collapsible sections, and active state
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }

  function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navDrawer = document.getElementById('nav-drawer');
    const navOverlay = document.getElementById('nav-overlay');

    if (!navToggle || !navDrawer || !navOverlay) {
      console.warn('Navigation elements not found');
      return;
    }

    // Toggle menu open/close
    navToggle.addEventListener('click', function() {
      const isOpen = navDrawer.classList.contains('open');

      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close menu when clicking overlay
    navOverlay.addEventListener('click', closeNav);

    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navDrawer.classList.contains('open')) {
        closeNav();
      }
    });

    // Handle collapsible sections
    const collapsibleTriggers = document.querySelectorAll('.nav-collapsible-trigger');
    collapsibleTriggers.forEach(function(trigger) {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        toggleCollapsible(this);
      });
    });

    // Set active link based on current page
    setActiveLink();

    // Prevent body scroll when menu is open
    function openNav() {
      navDrawer.classList.add('open');
      navOverlay.classList.add('active');
      navToggle.classList.add('active');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeNav() {
      navDrawer.classList.remove('open');
      navOverlay.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    function toggleCollapsible(trigger) {
      const content = trigger.nextElementSibling;
      const isExpanded = trigger.classList.contains('expanded');

      if (isExpanded) {
        trigger.classList.remove('expanded');
        content.classList.remove('expanded');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        trigger.classList.add('expanded');
        content.classList.add('expanded');
        trigger.setAttribute('aria-expanded', 'true');
      }
    }

    function setActiveLink() {
      const currentPath = window.location.pathname;
      const navLinks = document.querySelectorAll('.nav-drawer a');

      navLinks.forEach(function(link) {
        const linkPath = new URL(link.href).pathname;

        if (currentPath === linkPath ||
            (currentPath === '/' && linkPath === '/') ||
            (currentPath.endsWith('.html') && linkPath.endsWith(currentPath.split('/').pop()))) {
          link.classList.add('active');

          // If link is inside a collapsible section, expand it
          const collapsibleContent = link.closest('.nav-collapsible-content');
          if (collapsibleContent) {
            const trigger = collapsibleContent.previousElementSibling;
            if (trigger && trigger.classList.contains('nav-collapsible-trigger')) {
              trigger.classList.add('expanded');
              collapsibleContent.classList.add('expanded');
              trigger.setAttribute('aria-expanded', 'true');
            }
          }
        }
      });
    }
  }
})();
