function showPage(pageName) {
    const selectedPage = document.getElementById(pageName);

    if (!selectedPage || !selectedPage.classList.contains('page')) {
        return;
    }

    const pages = document.querySelectorAll('.page');

    pages.forEach(function(page) {
        page.classList.remove('active');
    });

    selectedPage.classList.add('active');

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}



document.addEventListener('DOMContentLoaded', function() {

    
    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark');

            if (document.body.classList.contains('dark')) {
                themeToggle.textContent = '☀️';
                themeToggle.setAttribute('aria-label', 'Switch to light mode');
            } else {
                themeToggle.textContent = '🌙';
                themeToggle.setAttribute('aria-label', 'Switch to dark mode');
            }
        });
    }


    
    const quizButton = document.getElementById('submit-quiz');

    if (quizButton) {
        
        quizButton.onclick = null;

        quizButton.addEventListener('click', function() {
            const answer = document.querySelector('input[name="q1"]:checked');

            if (!answer) {
                alert('Please select an answer first.');
                return;
            }

            const resultValues = document.querySelectorAll('.stat-value');
            const resultMessages = document.querySelectorAll('.stat-card p:last-child');

            if (answer.value === 'b') {
               
                resultValues[0].textContent = '100%';
                resultValues[1].textContent = '1';
                resultValues[2].textContent = '0';

                if (resultMessages.length >= 3) {
                    resultMessages[0].textContent = 'Great job! You got the question right.';
                    resultMessages[1].textContent = 'You completed 1 question.';
                    resultMessages[2].textContent = 'No questions need reviewing.';
                }

                alert('Correct! A red traffic light means stop.');
            } else {
                
                resultValues[0].textContent = '0%';
                resultValues[1].textContent = '1';
                resultValues[2].textContent = '1';

                if (resultMessages.length >= 3) {
                    resultMessages[0].textContent = 'Keep practicing to improve your score.';
                    resultMessages[1].textContent = 'You completed 1 question.';
                    resultMessages[2].textContent = 'Review the red traffic light question.';
                }

                alert('Incorrect. The correct answer is Stop.');
            }

            showPage('results');
        });
    }
    
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            if (!loginForm.reportValidity()) {
                return;
            }

            if (loginMessage) {
                loginMessage.textContent =
                    'Demo sign-in successful. Real account login is not connected.';
            }
        });
    }

});
