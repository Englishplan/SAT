const questions = [
    { question: "Which word best fits the sentence: 'She was ____ by the complexity of the math problem.'", options: ["confused", "excited", "bored", "angry"], answer: "confused" },
    { question: "What is the main purpose of an argumentative essay?", options: ["To entertain", "To persuade", "To describe", "To inform"], answer: "To persuade" },
    { question: "Which sentence is grammatically correct?", options: ["Me and him went to the store.", "He and I went to the store.", "He and me went to the store.", "Him and I went to the store."], answer: "He and I went to the store." }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreOutput = document.getElementById("score-output");

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        let q = questions[currentQuestionIndex];
        questionText.textContent = q.question;
        optionsContainer.innerHTML = "";

        q.options.forEach(option => {
            let button = document.createElement("button");
            button.textContent = option;
            button.onclick = () => {
                if (option === q.answer) {
                    correctAnswers++;
                }
                currentQuestionIndex++;
                loadQuestion();
            };
            optionsContainer.appendChild(button);
        });
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("quiz-container").style.display = "none";
    resultContainer.style.display = "block";

    let estimatedScore = estimateScore(correctAnswers);
    scoreOutput.textContent = `You answered ${correctAnswers} out of ${questions.length} correctly. Estimated SAT Score: ${estimatedScore}`;
}

function estimateScore(rawScore) {
    let conversionTable = {
        3: 400, 2: 350, 1: 300, 0: 200
    };
    return conversionTable[rawScore] || 800;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    document.getElementById("quiz-container").style.display = "block";
    resultContainer.style.display = "none";
    loadQuestion();
}

loadQuestion();
