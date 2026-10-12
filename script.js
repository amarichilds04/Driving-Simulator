let loggedIn = false;
let pageAfterLogin = 'home';
let currentQuestion = null;
let lastQuestionId = null;
let questionToPractice = null;
let totalAnswered = 0;
let totalCorrect = 0;
let quizFinished = false;


const questionBank = [
    {
        id: 'red-light',
        question: 'What does a red traffic light mean?',
        options: [
            { value: 'a', text: 'Speed up' },
            { value: 'b', text: 'Stop' },
            { value: 'c', text: 'Turn without stopping' },
            { value: 'd', text: 'Ignore the signal if the road is clear' }
        ],
        answer: 'b',
        explanation: 'A red traffic light means you must stop.'
    },
    {
        id: 'seat-belt',
        question: 'What should you do before driving?',
        options: [
            { value: 'a', text: 'Adjust the radio while moving' },
            { value: 'b', text: 'Check your phone' },
            { value: 'c', text: 'Fasten your seat belt' },
            { value: 'd', text: 'Leave the mirrors unchecked' }
        ],
        answer: 'c',
        explanation: 'You should fasten your seat belt before driving.'
    },
    {
        id: 'stop-sign',
        question: 'What should you do at a stop sign?',
        options: [
            { value: 'a', text: 'Come to a complete stop' },
            { value: 'b', text: 'Slow down but keep moving' },
            { value: 'c', text: 'Stop only if another car is coming' },
            { value: 'd', text: 'Speed up to clear the intersection' }
        ],
        answer: 'a',
        explanation: 'You must come to a complete stop and check for other road users.'
    }
];


function getMissedQuestions() {
    try {
        return JSON.parse(localStorage.getItem('roadReadyMissed')) || [];
    } catch (error) {
        return [];
    }
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
    } else {
        missedQuestions = missedQuestions.map(function(item) {
            if (item.id === question.id) {
                item.selectedAnswer = selectedAnswer;
            }

            return item;
        });
    }

    localStorage.setItem(
        'roadReadyMissed',
        JSON.stringify(missedQuestions)
    );
}


function removeMissedQuestion(questionId) {
    const missedQuestions = getMissedQuestions().filter(function(item) {
        return item.id !== questionId;
    });

    localStorage.setItem(
        'roadReadyMissed',
        JSON.stringify(missedQuestions)
    );
}


function renderRandomQuestion() {
    let availableQuestions = questionBank;

    if (questionBank.length > 1 && lastQuestionId) {
        availableQuestions = questionBank.filter(function(question) {
            return question.id !== lastQuestionId;
        });
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[randomIndex];

    questionToPractice = null;
    showQuestion();
}


function practiceQuestion(questionId) {
    questionToPractice = questionId;
    showPage('quiz');
}


function showQuestion() {
    const questionArea = document.getElementById('quiz-question-area');
    const feedback = document.getElementById('quiz-feedback');
    const submitButton = document.getElementById('submit-quiz');
    const nextButton = document.getElementById('next-question');
    const questionCount = document.getElementById('question-count');

    if (!questionArea || !currentQuestion) {
        return;
    }

    questionCount.textContent = 'Practice Question';

    let questionHTML = '<div class="quiz-question">';
    questionHTML += '<h3>' + currentQuestion.question + '</h3>';

    currentQuestion.options.forEach(function(option) {
        questionHTML += `
            <label class="answer-option" data-value="${option.value}">
                <input type="radio" name="quiz-answer" value="${option.value}">
                <span>${option.text}</span>
            </label>
        `;
    });

    questionHTML += '</div>';
    questionArea.innerHTML = questionHTML;

    feedback.textContent = '';
    feedback.className = '';
    submitButton.hidden = false;
    submitButton.disabled = false;
    nextButton.hidden = true;
    quizFinished = false;
}


function renderMissedQuestions() {
    const practiceArea = document.getElementById('missed-questions');
    const countLabel = document.getElementById('missed-count');

    if (!practiceArea) {
        return;
    }

    const missedQuestions = getMissedQuestions();

    countLabel.textContent = missedQuestions.length + ' questions';

    if (missedQuestions.length === 0) {
        practiceArea.innerHTML =
            '<p>You do not have any missed questions yet. Keep practicing!</p>';
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

        const card = document.createElement('article');
        card.className = 'missed-question';

        const heading = document.createElement('h3');
        heading.textContent = question.question;

        const wrongAnswer = document.createElement('p');
        wrongAnswer.className = 'wrong-answer';
        wrongAnswer.textContent = 'Your previous answer: ' +
            (chosenOption ? chosenOption.text : 'Not available');

        const rightAnswer = document.createElement('p');
        rightAnswer.className = 'right-answer';
        rightAnswer.textContent = 'Correct answer: ' + correctOption.text;

        const explanation = document.createElement('p');
        explanation.textContent = question.explanation;

        const practiceButton = document.createElement('button');
        practiceButton.className = 'btn btn-secondary';
        practiceButton.textContent = 'Try This Question';

        practiceButton.addEventListener('click', function() {
            practiceQuestion(question.id);
        });

        card.appendChild(heading);
        card.appendChild(wrongAnswer);
        card.appendChild(rightAnswer);
        card.appendChild(explanation);
        card.appendChild(practiceButton);

        practiceArea.appendChild(card);
    });
}


function updateResults() {
    const score = totalAnswered === 0
        ? 0
        : Math.round((totalCorrect / totalAnswered) * 100);

    document.getElementById('result-score').textContent = score + '%';
    document.getElementById('result-completed').textContent = totalAnswered;
    document.getElementById('result-missed').textContent =
        getMissedQuestions().length;
}


function checkAnswer() {
    if (!currentQuestion || quizFinished) {
        return;
    }

    const selectedAnswer = document.querySelector(
        'input[name="quiz-answer"]:checked'
    );

    const feedback = document.getElementById('quiz-feedback');

    if (!selectedAnswer) {
        feedback.textContent = 'Please select an answer first.';
        feedback.className = '';
        return;
    }

    quizFinished = true;
    totalAnswered++;

    const isCorrect = selectedAnswer.value === currentQuestion.answer;

    if (isCorrect) {
        totalCorrect++;
        removeMissedQuestion(currentQuestion.id);

        feedback.textContent = 'Correct! ' + currentQuestion.explanation;
        feedback.className = 'correct-message';
    } else {
        saveMissedQuestion(currentQuestion, selectedAnswer.value);

        feedback.textContent = 'Incorrect. The correct answer is "' +
            currentQuestion.options.find(function(option) {
                return option.value === currentQuestion.answer;
            }).text + '". ' + currentQuestion.explanation;

        feedback.className = 'incorrect-message';
    }

  
    document.querySelectorAll('.answer-option').forEach(function(label) {
        const answerValue = label.dataset.value;

        if (answerValue === currentQuestion.answer) {
            label.classList.add('correct');
        } else if (answerValue === selectedAnswer.value) {
            label.classList.add('incorrect');
        }
    });

    
    document.querySelectorAll('input[name="quiz-answer"]').forEach(function(input) {
        input.disabled = true;
    });

    document.getElementById('submit-quiz').disabled = true;
    document.getElementById('next-question').hidden = false;

    lastQuestionId = currentQuestion.id;

    renderMissedQuestions();
    updateResults();
}


function nextQuestion() {
    if (questionToPractice) {
        const question = questionBank.find(function(item) {
            return item.id === questionToPractice;
        });

        questionToPractice = null;

        if (question) {
            currentQuestion = question;
            showQuestion();
            return;
        }
    }

    renderRandomQuestion();
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
        if (questionToPractice) {
            const question = questionBank.find(function(item) {
                return item.id === questionToPractice;
            });

            if (question) {
                currentQuestion = question;
                showQuestion();
            } else {
                renderRandomQuestion();
            }
        } else {
            renderRandomQuestion();
        }
    }

    if (pageName === 'game') {
        renderMissedQuestions();
    }

    if (pageName === 'results') {
        updateResults();
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}



function continueTo(pageName) {
    showPage(pageName);
}


document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');

    
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

    
    document.getElementById('submit-quiz').addEventListener('click', checkAnswer);

    document.getElementById('next-question').addEventListener('click', nextQuestion);

    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!loginForm.reportValidity()) {
            return;
        }

        loggedIn = true;
        loginMessage.textContent = 'Login successful! Opening your page...';

        showPage(pageAfterLogin);
    });

    renderMissedQuestions();
    updateResults();
});
