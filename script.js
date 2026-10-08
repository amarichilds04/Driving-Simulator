// =========================
// PAGE NAVIGATION
// =========================

function showPage(pageName) {
  const pages = document.querySelectorAll(".page");
  const selectedPage = document.getElementById(pageName);

  if (!selectedPage) {
    return;
  }

  pages.forEach((page) => {
    page.classList.remove("active");
  });

  selectedPage.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// =========================
// LIGHT AND DARK MODE
// =========================

const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  const isDark = theme === "dark";

  document.body.classList.toggle("dark", isDark);

  if (themeToggle) {
    themeToggle.textContent = isDark ? "☀" : "☾";
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
    themeToggle.title = isDark ? "Light mode" : "Dark mode";
  }
}

let savedTheme = "light";

try {
  savedTheme = localStorage.getItem("roadready-theme") || "light";
} catch (error) {
  // The website can still work if browser storage is unavailable.
}

applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark")
      ? "light"
      : "dark";

    applyTheme(newTheme);

    try {
      localStorage.setItem("roadready-theme", newTheme);
    } catch (error) {
      // Theme switching still works for the current page.
    }
  });
}

// =========================
// LOGIN PLACEHOLDER
// =========================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    alert(
      "Login is not connected yet. " +
      "The backend developer can connect authentication here."
    );
  });
}

// =========================
// ACCOUNT UI PLACEHOLDERS
// =========================

const forgotPassword = document.getElementById("forgotPassword");

if (forgotPassword) {
  forgotPassword.addEventListener("click", (event) => {
    event.preventDefault();

    alert("Password recovery will be added when the backend is connected.");
  });
}

const createAccount = document.getElementById("createAccount");

if (createAccount) {
  createAccount.addEventListener("click", (event) => {
    event.preventDefault();

    alert("Account registration will be added when the backend is connected.");
  });
}
