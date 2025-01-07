// Quiz questions data
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Retrieve saved progress from sessionStorage or initialize as empty array
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || new Array(questions.length).fill(null);

// Render the questions and choices
function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = ""; // Clear previous content
  
  questions.forEach((question, index) => {
    const questionElement = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);
    
    question.choices.forEach((choice) => {
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${index}`);
      choiceElement.setAttribute("value", choice);
      
      // If user previously selected this answer, mark it as checked
      if (userAnswers[index] === choice) {
        choiceElement.checked = true; // Mark the radio button as checked
      }

      // Save the selected choice to sessionStorage
      choiceElement.addEventListener("change", () => {
        userAnswers[index] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers)); // Save progress in session storage
      });

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    });

    questionsElement.appendChild(questionElement);
  });
}

// Calculate and display the score
function calculateScore() {
  let score = 0;

  questions.forEach((question, index) => {
    // Find the selected radio button for this question
    const selectedRadio = document.querySelector(`input[name="question-${index}"]:checked`);
    
    if (selectedRadio && selectedRadio.value === question.answer) {
      score++;
    }
  });

  // Save the score to local storage
  localStorage.setItem("score", score); 

  // Display the score
  document.getElementById("score").textContent = `Your score is ${score} out of ${questions.length}.`;
}

// Event listener for submit button
document.getElementById("submit").addEventListener("click", calculateScore);

// Check if there's a stored score in localStorage and display it
document.addEventListener("DOMContentLoaded", () => {
  const storedScore = localStorage.getItem("score");
  if (storedScore) {
    document.getElementById("score").textContent = `Your score is ${storedScore} out of ${questions.length}.`;
  }
});

// Initial call to render the quiz
renderQuestions();
