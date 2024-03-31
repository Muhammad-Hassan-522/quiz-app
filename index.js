const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", ansStatus: false },
            { text: "Paris", ansStatus: true },
            { text: "Berlin", ansStatus: false },
            { text: "Rome", ansStatus: false },
        ]
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: [
            { text: "Ernest Hemingway", ansStatus: false },
            { text: "Harper Lee", ansStatus: true },
            { text: "Mark Twain", ansStatus: false },
            { text: "F. Scott Fitzgerald", ansStatus: false },
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Au", ansStatus: true },
            { text: "Ag", ansStatus: false },
            { text: "Fe", ansStatus: false },
            { text: "Cu", ansStatus: false },
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", ansStatus: false },
            { text: "Mars", ansStatus: true },
            { text: "Venus", ansStatus: false },
            { text: "Mercury", ansStatus: false },
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent van Gogh", ansStatus: false },
            { text: "Leonardo da Vinci", ansStatus: true },
            { text: "Pablo Picasso", ansStatus: false },
            { text: "Michelangelo", ansStatus: false },
        ]
    },
    {
        question: "What is the tallest mountain in the world?",
        answers: [
            { text: "Mount Kilimanjaro", ansStatus: false },
            { text: "Mount Everest", ansStatus: true },
            { text: "Mount Fuji", ansStatus: false },
            { text: "Mount McKinley", ansStatus: false },
        ]
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            { text: "William Shakespeare", ansStatus: true },
            { text: "Jane Austen", ansStatus: false },
            { text: "Emily Dickinson", ansStatus: false },
            { text: "Charles Dickens", ansStatus: false },
        ]
    },
    {
        question: "What is the largest ocean in the world?",
        answers: [
            { text: "Atlantic Ocean", ansStatus: false },
            { text: "Arctic Ocean", ansStatus: false },
            { text: "Indian Ocean", ansStatus: false },
            { text: "Pacific Ocean", ansStatus: true },
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "H2O", ansStatus: true },
            { text: "CO2", ansStatus: false },
            { text: "O2", ansStatus: false },
            { text: "HCl", ansStatus: false },
        ]
    },
    {
        question: "What is the largest organ in the human body?",
        answers: [
            { text: "Liver", ansStatus: false },
            { text: "Skin", ansStatus: true },
            { text: "Heart", ansStatus: false },
            { text: "Brain", ansStatus: false },
        ]
    }
];


const questionElement = document.getElementById("question");
const ansBtns = document.getElementById("ans-btns");
const nextBtn = document.getElementById("next-btn");

var currentQuestionIndex = 0;
var score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansBtns.appendChild(button);
        if (answer.ansStatus) {
            button.dataset.ansStatus = answer.ansStatus;
        }
        button.addEventListener("click", selectAnswer);
    })
};

function resetState() {
    nextBtn.style.display = "none";
    while (ansBtns.firstChild) {
        ansBtns.removeChild(ansBtns.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.ansStatus === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(ansBtns.children).forEach((button) => {
        if (button.dataset.ansStatus === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextBtn();
    }
    else {
        startQuiz();
    }
})

function handleNextBtn() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

startQuiz();