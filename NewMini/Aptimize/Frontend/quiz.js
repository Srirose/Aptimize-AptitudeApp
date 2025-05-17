async function loadQuestions() {
    try {
        let response = await fetch("http://localhost:5000/questions");
        let questions = await response.json();
        
        displayQuestion(questions);
    } catch (error) {
        console.error("Error fetching questions:", error);
    }
}

function displayQuestion(questions) {
    let currentQuestionIndex = 0;
    let questionElement = document.getElementById("question-text");
    let optionsDiv = document.getElementById("options");

    function showNextQuestion() {
        if (currentQuestionIndex < questions.length) {
            let q = questions[currentQuestionIndex];
            questionElement.textContent = q.question;

            optionsDiv.innerHTML = ""; // Clear previous options
            [q.option1, q.option2, q.option3, q.option4].forEach(option => {
                let btn = document.createElement("button");
                btn.textContent = option;
                btn.onclick = () => checkAnswer(option, q.answer);
                optionsDiv.appendChild(btn);
            });
        } else {
            document.getElementById("submit-btn").style.display = "block";
        }
    }

    function checkAnswer(selected, correct) {
        if (selected === correct) {
            score++;
        }
        currentQuestionIndex++;
        showNextQuestion();
    }

    showNextQuestion();
}

loadQuestions();
