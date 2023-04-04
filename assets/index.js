// Declares variables to store values
var question = document.querySelector("#question");
var answerA = document.querySelector("#answerA");
var answerB = document.querySelector("#answerB");
var answerC = document.querySelector("#answerC");
var answerD = document.querySelector("#answerD");
var resultText = document.querySelector("#score");
var containerHome = document.querySelector("#home");
var containerGame = document.querySelector("#quiz");
var containerEnd = document.querySelector("#end");
var timerEl = document.querySelector("#timerEl");
var progressText = document.querySelector("#progressText");
var userAnswer = document.querySelector(".choice-text");
var secondsLeft = 60;
var finalScore = document.querySelector("#finalScore");
var timer;
var answerArr = [answerA, answerB, answerC, answerD];
// This is an index of questions, and multiple choice answers that will be logged
var questionIndex = 0;
var questions = [
  {
    question:
      "In JavaScript, the following loop will execute ________ times for (x=1; x<11; x++).",
    choices: ["9", "10", "11", "4"],
    answer: "10",
  },
  {
    question:
      "When you want to use JavaScript to manipulate the browser window, the browser window's JavaScript object name is:",
    choices: ["Frame", "Window", "Document", "Browser_Window"],
    answer: "Window",
  },
  {
    question: "Alert(message), close() and reset() are JavaScript:",
    choices: ["Commands", "Properties", "Methods", "Objects"],
    answer: "Methods",
  },
  {
    question: "What does PNG stand for?",
    choices: [
      "Portable Network Graphics",
      "Ported Nanite Grids",
      "Personal Node Grid",
      "Petrachias NaN Grievious",
    ],
    answer: "Portable Network Graphics",
  },
  {
    question: "In HTML, you use a button on a form to:",
    choices: [
      "Run a program",
      "Submit a form to a server",
      "Reset a form to its original state",
      "All of the above",
    ],
    answer: "All of the above",
  },
];
// function to display question and choices on game and change to next question when an answer is chosen
function showQuestion() {
  question.textContent = questions[questionIndex].question;
  for (var i = 0; i < answerArr.length; i++) {
    answerArr[i].textContent = questions[questionIndex].choices[i];
    answerArr[i].onclick = function () {
      if (questions[questionIndex].answer !== this.textContent) {
        secondsLeft = secondsLeft - 15;
      }
      questionIndex++;
      if (questionIndex >= questions.length) {
        endQuiz();
      } else if (secondsLeft <= 0) {
        endQuiz();
      } else {
        showQuestion();
        progressText.textContent =
          questionIndex + 1 + " of " + questions.length;
      }
    };
  }
}
// Sets the timer at 60 seconds and will begin decrementing to 0
function setTime() {
  timer = setInterval(function () {
    secondsLeft--;
    timerEl.textContent = "0:" + secondsLeft;
    if (secondsLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
    if (secondsLeft < 10) {
      timerEl.textContent = "0:0" + secondsLeft;
    }
  }, 1000);
}

// Ends the quiz if seconds left on the timer is less than 0
function endQuiz() {
  clearInterval(timer);
  if (secondsLeft < 0) {
  }
  localStorage.setItem("score", JSON.stringify(secondsLeft));
  containerGame.classList.add("hidden");
  containerEnd.classList.remove("hidden");
  finalScore.textContent = localStorage.getItem("score");
}
// when begin quiz button is clicked, the initial screen and title of quiz disappears
document.querySelector("#begin-quiz").onclick = function () {
  secondsLeft = 60;
  questionIndex = 0;
  containerHome.classList.add("hidden");
  containerGame.classList.remove("hidden");
  showQuestion();
  setTime();
  progressText.textContent = questionIndex + 1 + " of " + questions.length;
};
// Allows user to retake quiz
document.querySelector("#retake-quiz").onclick = function (event) {
  event.preventDefault();
  secondsLeft = 60;
  questionIndex = 0;
  containerEnd.classList.add("hidden");
  containerHome.classList.add("hidden");
  containerGame.classList.remove("hidden");
  showQuestion();
  setTime();
  progressText.textContent = questionIndex + 1 + " of " + questions.length;
};
