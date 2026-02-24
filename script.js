/**
 * Agust Islandia - Interactive Elements
 * Handles info bubbles, tooltips, and accessibility features
 */

document.addEventListener('DOMContentLoaded', function() {
  const infoBubbles = document.querySelectorAll('.info-bubble');
  const srAnnouncements = document.getElementById('sr-announcements');

  // Detect touch devices and mobile
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  let isMobile = window.innerWidth <= 640;

  /**
   * Announce messages to screen readers
   * @param {string} message - The message to announce
   */
  function announceToScreenReader(message) {
    if (srAnnouncements) {
      srAnnouncements.textContent = message;
      // Clear after a moment to allow for repeated announcements
      setTimeout(() => {
        srAnnouncements.textContent = '';
      }, 1000);
    }
  }

  /**
   * Toggle content visibility and manage ARIA states
   * @param {Element} bubble - The info bubble button element
   */
  function toggleContent(bubble) {
    const isExpanded = bubble.getAttribute('aria-expanded') === 'true';
    const releaseName = bubble.getAttribute('aria-label').replace('Show release information for ', '');

    if (isMobile) {
      // Mobile: Handle inline collapsible content
      const listItem = bubble.closest('li');
      const mobileContent = listItem.querySelector('.mobile-info-content');

      if (mobileContent) {
        // Close all other expanded content and reset their ARIA states
        document.querySelectorAll('.mobile-info-content.expanded').forEach(content => {
          if (content !== mobileContent) {
            content.classList.remove('expanded');
            content.setAttribute('aria-hidden', 'true');
            const otherBubble = content.parentElement.querySelector('.info-bubble');
            if (otherBubble) {
              otherBubble.setAttribute('aria-expanded', 'false');
            }
          }
        });

        // Toggle current content
        const willExpand = !isExpanded;
        mobileContent.classList.toggle('expanded', willExpand);
        mobileContent.setAttribute('aria-hidden', willExpand ? 'false' : 'true');
        bubble.setAttribute('aria-expanded', willExpand.toString());

        // Screen reader announcement
        if (willExpand) {
          announceToScreenReader(`${releaseName} release information expanded`);
        } else {
          announceToScreenReader(`${releaseName} release information collapsed`);
        }
      }
    } else {
      // Desktop: Handle tooltip behavior
      const tooltip = bubble.querySelector('.info-tooltip');

      // Close other active bubbles and tooltips
      infoBubbles.forEach(otherBubble => {
        if (otherBubble !== bubble) {
          otherBubble.classList.remove('active');
          otherBubble.setAttribute('aria-expanded', 'false');
          const otherTooltip = otherBubble.querySelector('.info-tooltip');
          if (otherTooltip) {
            otherTooltip.setAttribute('aria-hidden', 'true');
          }
        }
      });

      // Toggle current bubble and tooltip
      const willExpand = !isExpanded;
      bubble.classList.toggle('active', willExpand);
      bubble.setAttribute('aria-expanded', willExpand.toString());
      if (tooltip) {
        tooltip.setAttribute('aria-hidden', willExpand ? 'false' : 'true');
      }

      // Screen reader announcement
      if (willExpand) {
        announceToScreenReader(`${releaseName} release information shown`);
      } else {
        announceToScreenReader(`${releaseName} release information hidden`);
      }
    }
  }

  // Attach event listeners to all info bubbles
  infoBubbles.forEach(bubble => {
    // Click and touch handling
    bubble.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleContent(bubble);
    });

    // Keyboard navigation
    bubble.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        toggleContent(bubble);
      }
      // Escape key to close
      if (e.key === 'Escape') {
        const isExpanded = bubble.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
          e.preventDefault();
          if (isMobile) {
            const listItem = bubble.closest('li');
            const mobileContent = listItem.querySelector('.mobile-info-content');
            if (mobileContent) {
              mobileContent.classList.remove('expanded');
              mobileContent.setAttribute('aria-hidden', 'true');
              bubble.setAttribute('aria-expanded', 'false');
              announceToScreenReader('Release information collapsed');
            }
          } else {
            bubble.classList.remove('active');
            bubble.setAttribute('aria-expanded', 'false');
            const tooltip = bubble.querySelector('.info-tooltip');
            if (tooltip) {
              tooltip.setAttribute('aria-hidden', 'true');
            }
            announceToScreenReader('Release information hidden');
          }
        }
      }
    });

    // For Safari and other browsers that might need explicit touch handling
    if (isTouchDevice) {
      bubble.addEventListener('touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
      });
    }
  });

  // Close tooltip when clicking outside (desktop only)
  if (!isMobile) {
    document.addEventListener('click', function() {
      infoBubbles.forEach(bubble => {
        bubble.classList.remove('active');
        bubble.setAttribute('aria-expanded', 'false');
        const tooltip = bubble.querySelector('.info-tooltip');
        if (tooltip) {
          tooltip.setAttribute('aria-hidden', 'true');
        }
      });
    });
  }

  // Handle window resize to update mobile detection
  window.addEventListener('resize', function() {
    const isNowMobile = window.innerWidth <= 640;
    if (isNowMobile !== isMobile) {
      isMobile = isNowMobile;
      // Clean up any active states when switching between mobile/desktop
      infoBubbles.forEach(bubble => {
        bubble.classList.remove('active');
        bubble.setAttribute('aria-expanded', 'false');
        const tooltip = bubble.querySelector('.info-tooltip');
        if (tooltip) {
          tooltip.setAttribute('aria-hidden', 'true');
        }
      });
      document.querySelectorAll('.mobile-info-content.expanded').forEach(content => {
        content.classList.remove('expanded');
        content.setAttribute('aria-hidden', 'true');
      });
    }
  });
});
