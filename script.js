const questions = [
    {
        question: "What is the capital of France?",
        answers: {
            a: "Berlin",
            b: "Madrid",
            c: "Paris",
            d: "Lisbon"
        },
        correct: "c"
    },
    {
        question: "What is 2 + 2?",
        answers: {
            a: "3",
            b: "4",
            c: "5",
            d: "6"
        },
        correct: "b"
    },
    // Add more questions to reach a total of 5
    {
        question: "What is the largest ocean on Earth?",
        answers: {
            a: "Atlantic",
            b: "Indian",
            c: "Arctic",
            d: "Pacific"
        },
        correct: "d"
    },
    {
        question: "What is the smallest prime number?",
        answers: {
            a: "0",
            b: "1",
            c: "2",
            d: "3"
        },
        correct: "c"
    },
    {
        question: "What is the chemical symbol for water?",
        answers: {
            a: "H2O",
            b: "O2",
            c: "CO2",
            d: "NaCl"
        },
        correct: "a"
    }
];

const questionsContainer = document.getElementById('questions');
const submitButton = document.getElementById('submit');
const scoreContainer = document.getElementById('score');

function loadQuestions() {
    questions.forEach((currentQuestion, questionIndex) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');

        const questionText = document.createElement('h2');
        questionText.innerText = currentQuestion.question;
        questionElement.appendChild(questionText);

        for (const answer in currentQuestion.answers) {
            const answerLabel = document.createElement('label');
            answerLabel.innerHTML = `
                <input type="radio" name="question${questionIndex}" value="${answer}">
                ${currentQuestion.answers[answer]}
            `;
            questionElement.appendChild(answerLabel);
        }

        questionsContainer.appendChild(questionElement);
    });
}

function calculateScore() {
    let score = 0;
    questions.forEach((currentQuestion, questionIndex) => {
        const selectedAnswer = document.querySelector(`input[name="question${questionIndex}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === currentQuestion.correct) {
            score++;
        }
    });
    scoreContainer.innerText = `Your score: ${score} out of ${questions.length}`;
}

submitButton.addEventListener('click', calculateScore);

loadQuestions();