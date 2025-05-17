// function loadQuestion() {
//     if (currentQuestionIndex < questions.length) {
//         let q = questions[currentQuestionIndex];
//         document.getElementById("question-text").textContent = q.question;

//         let optionsHtml = '';
//         q.options.forEach(opt => {
//             optionsHtml += `<button onclick="checkAnswer('${opt}', '${q.answer}', \`${q.explanation}\`)">${opt}</button>`;
//         });
//         document.getElementById("options").innerHTML = optionsHtml;
//         document.getElementById("submit-btn").style.display = "none";
//         document.getElementById("next-btn").style.display = "none";
//         document.getElementById("explanation").style.display = "none";
//     } else {
//         document.getElementById("submit-btn").style.display = "block";
//         document.getElementById("next-btn").style.display = "none";
//     }
// }
// function checkAnswer(selected, correct, explanation) {
//     let buttons = document.querySelectorAll("#options button");
//     buttons.forEach(button => {
//         if (button.textContent === correct) {
//             button.classList.add("correct");
//         }
//         if (button.textContent === selected && selected !== correct) {
//             button.classList.add("wrong");
//         }
//         button.disabled = true;
//     });
//     if (selected === correct) {
//         score++;
//     }
//     document.getElementById("explanation-text").textContent = explanation;
//     document.getElementById("explanation").style.display = "block";
//     document.getElementById("next-btn").style.display = "block";
// }
// function nextQuestion() {
//     let buttons = document.querySelectorAll("#options button");
//     buttons.forEach(button => {
//         button.classList.remove("correct", "wrong");
//         button.disabled = false;
//     }); 
//     document.getElementById("explanation").style.display = "none";
//     document.getElementById("next-btn").style.display = "none";  
//     currentQuestionIndex++;
//     loadQuestion();
// }
// function submitQuiz() {
//     let timeTaken = Math.floor((Date.now() - startTime) / 1000);
//     document.getElementById("score").style.display = "block";
//     document.getElementById("time").style.display = "block";
//     document.getElementById("score-value").textContent = score;
//     document.getElementById("time-value").textContent = timeTaken;
//     localStorage.setItem("trainQuizScore", score);
//     localStorage.setItem("trainQuizTime", timeTaken);
//     let userScores = JSON.parse(localStorage.getItem("userScores")) || {};
//     userScores["train"] = score;
//     localStorage.setItem("userScores", JSON.stringify(userScores));
//     console.log("Score saved to userScores:", userScores);
//     confetti();
// }
// loadQuestion();


function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        let q = questions[currentQuestionIndex];
        document.getElementById("question-text").textContent = q.question;

        let optionsHtml = '';
        q.options.forEach(opt => {
            optionsHtml += `<button onclick="checkAnswer('${opt}', '${q.answer}', \`${q.explanation}\`)">${opt}</button>`;
        });

        document.getElementById("options").innerHTML = optionsHtml;
        document.getElementById("submit-btn").style.display = "none";
        document.getElementById("next-btn").style.display = "none";
        document.getElementById("explanation").style.display = "none";
    } else {
        document.getElementById("submit-btn").style.display = "block";
        document.getElementById("next-btn").style.display = "none";
    }
}

function checkAnswer(selected, correct, explanation) {
    let buttons = document.querySelectorAll("#options button");

    buttons.forEach(button => {
        if (button.textContent === correct) {
            button.classList.add("correct");
        }
        if (button.textContent === selected && selected !== correct) {
            button.classList.add("wrong");
        }
        button.disabled = true;
    });

    if (selected === correct) {
        score++;
    }

    document.getElementById("explanation-text").textContent = explanation;
    document.getElementById("explanation").style.display = "block";
    document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
    let buttons = document.querySelectorAll("#options button");
    buttons.forEach(button => {
        button.classList.remove("correct", "wrong");
        button.disabled = false;
    });
    
    document.getElementById("explanation").style.display = "none";
    document.getElementById("next-btn").style.display = "none";
    
    currentQuestionIndex++;
    loadQuestion();
}

function getQuizTopic() {
    const topicHeader = document.querySelector('.quiz-container h2');
    if (topicHeader) {
        const topicText = topicHeader.textContent.trim();
        if (topicText.startsWith('Topic:')) {
            const topic = topicText.replace('Topic:', '').trim().toLowerCase();
            
            if (topic.includes('train')) return 'train';
            if (topic.includes('profit') && topic.includes('loss')) return 'profit-loss';
            if (topic.includes('time') && topic.includes('work')) return 'time-work';
            if (topic.includes('letter') && topic.includes('symbol')) return 'letter-symbol';
            if (topic.includes('syllogism') ) return 'syllogism';


            // if (topic.includes('bar')) return 'bar-chart';

            
            return topic.replace(/\s+/g, '-').toLowerCase();
        }
    }
    
    const pageTitle = document.title;
    if (pageTitle) {
        const titleParts = pageTitle.split('-');
        if (titleParts.length > 0) {
            const topic = titleParts[0].trim().toLowerCase();
            
            // Map the title topic to the key used in the scoreboard
            if (topic.includes('train')) return 'train';
            if (topic.includes('profit')) return 'profit-loss';
            if (topic.includes('time')) return 'time-work';
            if (topic.includes('letter')) return 'letter-symbol';
            if (topic.includes('syllogism')) return 'syllogism';
            
            // Convert other topics to kebab-case for consistency
            return topic.replace(/\s+/g, '-').toLowerCase();
        }
    }
    
    // Fallback: Try to extract from URL
    const url = window.location.href;
    const urlParts = url.split('/');
    const page = urlParts[urlParts.length - 1];
    if (page.includes('train')) return 'train';
    if (page.includes('profit')) return 'profit-loss';
    if (page.includes('time')) return 'time-work';
    if (page.includes('letter')) return 'letter-symbol';
    if (topic.includes('syllogism')) return 'syllogism';
    
    // Last resort
    return 'general';
}

function submitQuiz() {
    let timeTaken = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("score").style.display = "block";
    document.getElementById("time").style.display = "block";
    document.getElementById("score-value").textContent = score;
    document.getElementById("time-value").textContent = timeTaken;
    
    // Determine which quiz topic this is
    const quizTopic = getQuizTopic();
    console.log("Detected quiz topic:", quizTopic);
    
    // Save individual quiz data with the topic name
    localStorage.setItem(`${quizTopic}QuizScore`, score);
    localStorage.setItem(`${quizTopic}QuizTime`, timeTaken);
    
    // Save to the userScores object used by the scoreboard
    let userScores = JSON.parse(localStorage.getItem("userScores")) || {};
    userScores[quizTopic] = score;
    localStorage.setItem("userScores", JSON.stringify(userScores));
    
    console.log(`Score ${score} saved for topic: ${quizTopic}`);
    console.log("Updated userScores:", userScores);

    confetti();
}

loadQuestion();