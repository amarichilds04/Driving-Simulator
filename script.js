// RoadReady frontend interactions.

//  Visitors can preview every page without signing in.
let loggedIn = false;

//  Remember which section the visitor wants to continue to.
let pageAfterLogin = 'home';

//  Navigation changes pages without forcing a login.
function showPage(pageName) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  const selectedPage = document.getElementById(pageName);

  if (selectedPage) {
    selectedPage.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

//  Login is requested only when Continue is clicked.
function continueTo(pageName) {
  if (!loggedIn) {
    // Remember the section the visitor selected.
    pageAfterLogin = pageName;

    // Explain why login is being shown.
    const message = document.getElementById('login-message');

    if (message) {
      message.textContent =
        'Please sign in to continue to ' + pageLabel(pageName) + '.';
    }

    // Send the visitor to the login screen.
    showPage('login');
    return;
  }

  // If already signed in for this demo, continue to the selected page.
  const message = document.getElementById('login-message');

  if (message) {
    message.textContent =
      'You are signed in for this preview. Real account authentication is not connected.';
  }

  showPage(pageName);
}

//  Provide readable names for the login message.
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

// Theme preference is session-only.
// Refreshing the page returns the theme to light mode.
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    const darkModeEnabled = document.body.classList.contains('dark');

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

// Demo sign-in only. No credentials are sent, checked, or saved.
const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', event => {
    event.preventDefault();

    // This only simulates signing in in the current page session.
    loggedIn = true;

    const message = document.getElementById('login-message');

    if (message) {
      message.textContent =
        'You are signed in for this preview. Real account authentication is not connected.';
    }

    //  Return to the section the visitor wanted to continue to.
    showPage(pageAfterLogin || 'home');
  });
}
