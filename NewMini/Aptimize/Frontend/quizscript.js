const quizzes = {
    "train": [
        { question: "A train 100m long passes a pole in 5 sec. Speed?", options: ["10m/s", "20m/s", "30m/s"], answer: "20m/s" },
        { question: "A train 200m long crosses a bridge of 100m in 10 sec. Speed?", options: ["20m/s", "30m/s", "40m/s"], answer: "30m/s" }
    ],
    "profit-loss": [
        { question: "Profit of Rs. 50 on Rs. 200. Profit %?", options: ["25%", "20%", "30%"], answer: "25%" },
        { question: "CP = Rs. 100, SP = Rs. 150. Profit %?", options: ["40%", "50%", "60%"], answer: "50%" }
    ]
};

// Load Quiz Questions
function loadQuiz() {
    const params = new URLSearchParams(window.location.search);
    const topic = params.get("topic");
    document.getElementById("quizTitle").textContent = topic.replace("-", " ").toUpperCase();

    let quizForm = document.getElementById("quizForm");
    let quizData = quizzes[topic] || [];

    quizData.forEach((q, i) => {
        let questionHTML = `<p>${i + 1}. ${q.question}</p>`;
        q.options.forEach(opt => {
            questionHTML += `<input type="radio" name="q${i}" value="${opt}"> ${opt}`;
        });
        quizForm.innerHTML += questionHTML;
    });
}

// Submit Quiz and Calculate Score
function submitQuiz() {
    const params = new URLSearchParams(window.location.search);
    const topic = params.get("topic");
    let quizData = quizzes[topic] || [];
    let score = 0;

    quizData.forEach((q, i) => {
        let selectedOption = document.querySelector(`input[name=q${i}]:checked`);
        if (selectedOption && selectedOption.value === q.answer) {
            score++;
        }
    });

    document.getElementById("result").innerHTML = `You scored ${score} / ${quizData.length}!`;
    saveScore(topic, score);
}

// Save Score in Local Storage
function saveScore(topic, score) {
    let scores = JSON.parse(localStorage.getItem("scores")) || {};
    scores[topic] = score;
    localStorage.setItem("scores", JSON.stringify(scores));
}

// Load Scoreboard
function loadScoreboard() {
    let scores = JSON.parse(localStorage.getItem("scores")) || {};
    let scoreList = document.getElementById("scoreList");
    scoreList.innerHTML = Object.entries(scores).map(([topic, score]) => `<li>${topic}: ${score}</li>`).join("");
}

// Call Load Functions
if (window.location.pathname.includes("quiz.html")) loadQuiz();
if (window.location.pathname.includes("scoreboard.html")) loadScoreboard();
