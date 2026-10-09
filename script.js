let isLoggedIn = false;
let nextPage = "home";

function showPage(pageId) {
    let selectedPage = document.getElementById(pageId);

    If (selectedPage == null) {
        return;
    }

    let pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    selectedPage.classList.add("active");

    window.scrollTo(0, 0);
}

function continueTo(pageId) {
    if (isLoggedIn == true) {
        showPage(pageId);
    } else {
        nextPage = pageId;
        showPage("login");
    }
}

document.addEventListener("click:, function(event) {
    let button = event.target.closest("[date-page], [data-continue]");

    if (button.tagName == "A") {
        event.preventDefault();
    }
    if (button.hasAttribute("data-page)) {
        let pageId = button.getAttribute("data-page);
        showPage(pageId);
    } else if (button.hasAttribute("data-continue")) {
        let pageId = button.getAttribute("data-continue);
        continueTo(pageId);
    }               
});

let themeButton = document.getElementById("theme-toggle");
if (themeButton != null) {
    themeButton.addEventListener("click", function() {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            themeButton.textContent = "☀️";
        } else {
            themButton.textContent = "🌙";
        }
    });
}

let loginForm = document.getElementById("login-form");

if (loginForm != null) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (!loginForm.reportValidity()) {
        }

        isLoggedIn = true;
        showPage(nextPage);
    });
}

          
