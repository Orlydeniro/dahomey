const questions = [
  {
    question: "What was the primary economic activity of the Kingdom of Dahomey during the 18th and 19th centuries?",
    answers: [
        { text: "Agriculture", correct: false },
        { text: "Slave trade", correct: true },
        { text: "Fishing", correct: false },
        { text: "Mining", correct: false },
    ],
  },
   {
        question: "Which European power colonized Dahomey?",
        answers: [
            { text: "Great Britain", correct: false },
            { text: "France", correct: true },
            { text: "Portugal", correct: false },
            { text: "Netherlands", correct: false },
        ],
    },
    {
    question: "What is the capital city of Benin today?",
    answers: [
      { text: "Abomey", correct: false },
        { text: "Ouidah", correct: false },
        { text: "Porto-Novo", correct: true },
         { text: "Cotonou", correct: false },
    ],
  }
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const feedbackElement = document.getElementById('feedback');


let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next Question";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('answer-btn');
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button);
    });
}

function resetState(){
    nextButton.style.display = "none";
    feedbackElement.innerHTML = "";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect){
        score++;
        feedbackElement.innerHTML = "Correct!";
        feedbackElement.style.color = "green";
    }else {
          feedbackElement.innerHTML = "Incorrect.";
         feedbackElement.style.color = "red";
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if(button.dataset.correct === 'true'){
          button.style.backgroundColor = "lightgreen";
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

function showScore(){
     resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = 'block'
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();