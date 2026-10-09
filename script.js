let loggedIn = false;
let pageAfterLogin = 'home';


const questionBank = [
    {
        id: 'red-light',
        question: 'What does a red traffic light mean?',
        options: [
            { value: 'a', text: 'Speed up' },
            { value: 'b', text: 'Stop' },
            { value: 'c', text: 'Turn without stopping' }
        ],
        answer: 'b',
        explanation: 'A red traffic light means you must stop.'
    }
];

let currentQuestion = null;


function getMissedQuestions() {
    const savedQuestions = localStorage.getItem('roadReadyMissed');

    return savedQuestions ? JSON.parse(savedQuestions) : [];
}


function saveMissedQuestion(question, selectedAnswer) {
    let missedQuestions = getMissedQuestions();

    const alreadySaved = missedQuestions.some(function(item) {
        return item.id === question.id;
    });

    if (!alreadySaved) {
        missedQuestions.push({
            id: question.id,
            selectedAnswer: selectedAnswer
        });
    }

    localStorage.setItem(
        'roadReadyMissed',
        JSON.stringify(missedQuestions)
    );
}


function removeMissedQuestion(questionId) {
    let missedQuestions = getMissedQuestions();

    missedQuestions = missedQuestions.filter(function(item) {
        return item.id !== questionId;
    });

    localStorage.setItem(
        'roadReadyMissed',
        JSON.stringify(missedQuestions)
    );
}


function renderRandomQuestion() {
    const questionArea = document.getElementById('quiz-question-area');
    const feedback = document.getElementById('quiz-feedback');

    if (!questionArea) {
        return;
    }

    const randomIndex = Math.floor(Math.random() * questionBank.length);
    currentQuestion = questionBank[randomIndex];

    let questionHTML = '<h3>' + currentQuestion.question + '</h3>';

    currentQuestion.options.forEach(function(option) {
        questionHTML += `
            <label class="answer-option" data-value="${option.value}">
                <input type="radio" name="q1" value="${option.value}">
                ${option.text}
            </label>
        `;
    });

    questionArea.innerHTML = questionHTML;

    if (feedback) {
        feedback.textContent = '';
    }
}


function renderMissedQuestions() {
    const practiceArea = document.getElementById('missed-questions');

    if (!practiceArea) {
        return;
    }

    const missedQuestions = getMissedQuestions();

    if (missedQuestions.length === 0) {
        practiceArea.innerHTML = '<p>You have no missed questions to review.</p>';
        return;
    }

    practiceArea.innerHTML = '';

    missedQuestions.forEach(function(missed) {
        const question = questionBank.find(function(item) {
            return item.id === missed.id;
        });

        if (!question) {
            return;
        }

        const chosenOption = question.options.find(function(option) {
            return option.value === missed.selectedAnswer;
        });

        const correctOption = question.options.find(function(option) {
            return option.value === question.answer;
        });

        const questionCard = document.createElement('div');
        questionCard.className = 'missed-question';

        const heading = document.createElement('h4');
        heading.textContent = question.question;

        const wrongAnswer = document.createElement('p');
        wrongAnswer.textContent = 'Your answer: ' +
            (chosenOption ? chosenOption.text : 'Not available');

        const rightAnswer = document.createElement('p');
        rightAnswer.textContent = 'Correct answer: ' + correctOption.text;

        questionCard.appendChild(heading);
        questionCard.appendChild(wrongAnswer);
        questionCard.appendChild(rightAnswer);

        practiceArea.appendChild(questionCard);
    });
}



function showPage(pageName) {
    const selectedPage = document.getElementById(pageName);

    if (!selectedPage || !selectedPage.classList.contains('page')) {
        return;
    }

    
    const protectedPages = ['game', 'gameplay', 'quiz', 'results'];

    if (protectedPages.includes(pageName) && !loggedIn) {
        pageAfterLogin = pageName;
        pageName = 'login';
    }

    document.querySelectorAll('.page').forEach(function(page) {
        page.classList.remove('active');
    });

    document.getElementById(pageName).classList.add('active');

   
    if (pageName === 'quiz') {
        renderRandomQuestion();
    }

    if (pageName === 'game') {
        renderMissedQuestions();
    }

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
            if (!currentQuestion) {
                return;
            }

            const selectedAnswer = document.querySelector(
                'input[name="q1"]:checked'
            );

            const feedback = document.getElementById('quiz-feedback');

            if (!selectedAnswer) {
                feedback.textContent = 'Please select an answer first.';
                return;
            }

            const answerLabels = document.querySelectorAll('.answer-option');

            
            answerLabels.forEach(function(label) {
                if (label.dataset.value === currentQuestion.answer) {
                    label.classList.add('correct');
                }
            });

            const resultValues = document.querySelectorAll('.stat-value');
            const resultMessages = document.querySelectorAll(
                '.stat-card p:last-child'
            );

            if (selectedAnswer.value === currentQuestion.answer) {
                feedback.textContent = 'Correct! ' + currentQuestion.explanation;

                removeMissedQuestion(currentQuestion.id);

                resultValues[0].textContent = '100%';
                resultValues[1].textContent = '1';
                resultValues[2].textContent = getMissedQuestions().length;

                if (resultMessages.length >= 3) {
                    resultMessages[0].textContent = 'Great job! You got it right.';
                    resultMessages[1].textContent = 'You completed 1 question.';
                    resultMessages[2].textContent =
                        'Questions left to review: ' + getMissedQuestions().length;
                }
            } else {
               
                const selectedLabel = document.querySelector(
                    '.answer-option[data-value="' + selectedAnswer.value + '"]'
                );

                if (selectedLabel) {
                    selectedLabel.classList.add('incorrect');
                }

                const correctOption = currentQuestion.options.find(function(option) {
                    return option.value === currentQuestion.answer;
                });

                feedback.textContent =
                    'Incorrect. The correct answer is "' +
                    correctOption.text + '". ' +
                    currentQuestion.explanation;

                saveMissedQuestion(currentQuestion, selectedAnswer.value);

                resultValues[0].textContent = '0%';
                resultValues[1].textContent = '1';
                resultValues[2].textContent = getMissedQuestions().length;

                if (resultMessages.length >= 3) {
                    resultMessages[0].textContent =
                        'Keep practicing to improve your score.';
                    resultMessages[1].textContent = 'You completed 1 question.';
                    resultMessages[2].textContent =
                        'Questions left to review: ' + getMissedQuestions().length;
                }
            }
            
            document.querySelectorAll('input[name="q1"]').forEach(function(input) {
                input.disabled = true;
            });

            quizButton.disabled = true;
            
            renderMissedQuestions();
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

            loggedIn = true;

            if (loginMessage) {
                loginMessage.textContent =
                    'Demo login successful! You can now continue.';
            }

            showPage(pageAfterLogin);
        });
    }

});
