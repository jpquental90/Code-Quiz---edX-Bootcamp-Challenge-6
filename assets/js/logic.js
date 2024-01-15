const titleEl = document.getElementById("question-title");
const choicesEl = document.getElementById("choices");
const startButton = document.getElementById("start");
const startScreen = document.getElementById("start-screen");
const questionsDiv = document.getElementById("questions");
const endScreen = document.getElementById("end-screen");
const feedbackDiv = document.getElementById("feedback");
const finalScoreSpan = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit");
const highScoresList = document.getElementById("highscores");
const correctSound = new Audio("./assets/sfx/correct.wav");
const incorrectSound = new Audio("./assets/sfx/incorrect.wav");

let questionIndex;
let score;



startButton.addEventListener("click", function() {
    questionIndex = 0;
    score = 0;
    startScreen.classList.add("hide");
    questionsDiv.classList.remove("hide");
    endScreen.classList.add("hide");
    feedbackDiv.classList.add("hide");
    showQuestion();
});

function showQuestion() {
    if (questionIndex < questionsQuiz.length) {
        const currentQuestion = questionsQuiz[questionIndex];
        titleEl.textContent = currentQuestion.title;
        choicesEl.innerHTML = "";

        for (let i = 0; i < currentQuestion.choices.length; i++) {
            const eachChoice = currentQuestion.choices[i];
            const listItem = document.createElement("li");
            listItem.textContent = eachChoice.text;
            listItem.dataset.correct = eachChoice.correct;
            listItem.addEventListener("click", checkAnswer);
            choicesEl.appendChild(listItem);
        }
    } else {
        endQuiz();
    }
}

function checkAnswer(event) {
    const selectedAnswer = event.target;
    const correct = selectedAnswer.dataset.correct === "true";

    if (correct) {
        feedbackDiv.textContent = "Correct!";
        feedbackDiv.classList.remove("hide");
        score++;
        correctSound.play();
    } else {
        feedbackDiv.textContent = "Wrong!";
        feedbackDiv.classList.remove("hide");
        incorrectSound.play();
    }
    
    setTimeout(function () {
        feedbackDiv.classList.add("hide"); 
        questionIndex++;
        showQuestion(); 
    }, 1000);
}

function endQuiz() {
    feedbackDiv.classList.add("hide");
    questionsDiv.classList.add("hide");
    endScreen.classList.remove("hide");
    finalScoreSpan.textContent = score;
    submitInitialsAndSave();
}

function submitInitialsAndSave() {

    let submittedInitials = initialsInput.value;

    if (submittedInitials.trim() !== "") {

        const highScore = {
            initials: submittedInitials,
            score: score,
        };

        let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

        highScores.push(highScore);

        highScores.sort((a, b) => b.score - a.score);

        localStorage.setItem("highScores", JSON.stringify(highScores));

        window.location.href = "highscores.html";
    }
}

submitButton.addEventListener("click", submitInitialsAndSave);