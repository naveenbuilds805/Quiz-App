const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

const questionContainerElement =
    document.getElementById('question-container');

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreElement = document.getElementById('right-answers');

let shuffledQuestions;
let currentQuestionIndex = 0;
let quizScore = 0;

const questions = [
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hyper Text Markup Language', correct: true },
            { text: 'High Text Machine Language', correct: false },
            { text: 'Hyper Tool Multi Language', correct: false },
            { text: 'Home Text Markup Language', correct: false }
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'Computer Style System', correct: false },
            { text: 'Creative Style Syntax', correct: false },
            { text: 'Colorful Style Sheets', correct: false }
        ]
    },
    {
        question: 'Which language is used for web interactivity?',
        answers: [
            { text: 'JavaScript', correct: true },
            { text: 'HTML', correct: false },
            { text: 'CSS', correct: false },
            { text: 'SQL', correct: false }
        ]
    }
];

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    questionContainerElement.classList.remove('hide');

    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    quizScore = 0;
    scoreElement.innerText = quizScore;

    setNextQuestion();
}

function setNextQuestion() {
    resetState();

    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
        questionElement.innerText = 'Quiz Completed!';
        nextButton.classList.add('hide');
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;

    question.answers.forEach(answer => {
        const button = document.createElement('button');

        button.innerText = answer.text;
        button.classList.add('btn');

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    document.body.classList.remove('correct');
    document.body.classList.remove('wrong');

    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct === 'true';

    if (correct) {
        quizScore++;
        scoreElement.innerText = quizScore;
        document.body.classList.add('correct');
    } else {
        document.body.classList.add('wrong');
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;

        if (button.dataset.correct === 'true') {
            button.style.backgroundColor = 'green';
        }
    });

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.classList.add('hide');
        setTimeout(() => {
            questionElement.innerText =
                `Quiz Completed! Your Score: ${quizScore}/${shuffledQuestions.length}`;

            answerButtonsElement.innerHTML = '';
            startButton.innerText = 'Restart';
            startButton.classList.remove('hide');
        }, 500);
    }
}