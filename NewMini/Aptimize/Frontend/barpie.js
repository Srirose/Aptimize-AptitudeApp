// Common quiz functionality
// let currentQuestionIndex = 0;
// let score = 0;
// let startTime = Date.now();
// let questions = [];

// Initialize the quiz with the provided questions
// function initQuiz(quizQuestions) {
//   questions = quizQuestions;
//   currentQuestionIndex = 0;
//   score = 0;
//   startTime = Date.now();
//   loadQuestion();
// }

function loadQuestion() {
  if (currentQuestionIndex < questions.length) {
    let q = questions[currentQuestionIndex];
    document.getElementById("chart-image").src = q.img;
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
      
      if (topic.includes('pie')) return 'pie-chart';
      if (topic.includes('bar')) return 'bar-chart';
      
      return topic.replace(/\s+/g, '-').toLowerCase();
    }
  }
  
  const pageTitle = document.title;
  if (pageTitle) {
    const titleParts = pageTitle.split('-');
    if (titleParts.length > 0) {
      const topic = titleParts[0].trim().toLowerCase();
      
      if (topic.includes('pie')) return 'pie-chart';
      if (topic.includes('bar')) return 'bar-chart';
      
      return topic.replace(/\s+/g, '-').toLowerCase();
    }
  }
  
  if (window.location.href.includes('pie')) return 'pie-chart';
  if (window.location.href.includes('bar')) return 'bar-chart';
  
  return 'quiz';
}

function submitQuiz() {
  let timeTaken = Math.floor((Date.now() - startTime) / 1000);
  document.getElementById("score").style.display = "block";
  document.getElementById("time").style.display = "block";
  document.getElementById("score-value").textContent = score;
  document.getElementById("time-value").textContent = timeTaken;
  
  const quizTopic = getQuizTopic();
  console.log("Detected quiz topic:", quizTopic);
  
  localStorage.setItem(`${quizTopic}QuizScore`, score);
  localStorage.setItem(`${quizTopic}QuizTime`, timeTaken);
  
  let userScores = JSON.parse(localStorage.getItem("userScores")) || {};
  userScores[quizTopic] = score;
  localStorage.setItem("userScores", JSON.stringify(userScores));
  
  console.log(`Score ${score} saved for topic: ${quizTopic}`);
  console.log("Updated userScores:", userScores);

  confetti();
  
  setTimeout(() => {
    window.location.href = "scoreboard.html";
  }, 3000);
}
loadQuestion();