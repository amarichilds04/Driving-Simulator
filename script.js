
/* RoadReady frontend interactions */

// Demo sign-in only. Nothing is sent to a server or saved.
let loggedIn = false;

// Remember the section the visitor wants to continue to.
let pageAfterLogin = 'home';

// Navigate between pages.
function showPage(pageName) {
  const selectedPage = document.getElementById(pageName);

  if (!selectedPage || !selectedPage.classList.contains('page')) {
    return;
  }

  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  selectedPage.classList.add('active');

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Ask visitors to sign in only when they click Continue.
function continueTo(pageName) {
  const destination = document.getElementById(pageName);

  if (!destination || !destination.classList.contains('page')) {
    return;
  }

  if (!loggedIn) {
    pageAfterLogin = pageName;

    const message = document.getElementById('login-message');

    if (message) {
      message.textContent =
        'Please sign in to continue to ' + pageLabel(pageName) + '.';
    }

    showPage('login');
    return;
  }

  showPage(pageName);
}

// Friendly names for login messages.
function pageLabel(pageName) {
  const labels = {
    home: 'Home',
    game: 'Practice',
    gameplay: 'the Driving Game',
    quiz: 'the Quiz',
    results: 'Results'
  };

  return labels[pageName] || 'this section';
}

// Set up interactions after the HTML has loaded.
document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle.
  const themeToggle = document.getElementById('theme-toggle');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');

      const darkModeEnabled =
        document.body.classList.contains('dark');

      themeToggle.textContent = darkModeEnabled ? '☀️' : '🌙';

      themeToggle.setAttribute(
        'aria-label',
        darkModeEnabled ? 'Switch to light mode' : 'Switch to dark mode'
      );

      themeToggle.setAttribute(
        'title',
        darkModeEnabled ? 'Switch to light mode' : 'Switch to dark mode'
      );
    });
  }

  // Demo login form.
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', event => {
      event.preventDefault();

      // Check the browser's required email and password fields.
      if (!loginForm.reportValidity()) {
        return;
      }

      // Simulate signing in for this page session only.
      loggedIn = true;

      const message = document.getElementById('login-message');

      if (message) {
        message.textContent =
          'You are signed in for this preview. Real account authentication is not connected.';
      }

      // Return to the selected section.
      showPage(pageAfterLogin || 'home');
    });
  }
});
