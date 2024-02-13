const question = [
  {
    question: "Why do mothers usually soak meat in pineapple juice before cooking it?",
    answers: [
      { text: "A. firm set of beliefs", correct: true},
      { text: "B. It makes meat tender", correct: false},
      { text: "C. It removes the bad odor", correct: false},
      { text: "D. It preserves the natural taste of meat", correct: false},
    ]
  },
  {
    question: "it never recycled any waste materials, the company’s environmental record was not perfect.",
    answers: [
      { text: "For", correct: false},
      { text: "In what", correct: true},
      { text: "With", correct: false},
      { text: "Due to", correct: false},
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();

}


function showQuestion(){
  resetQuiz();

  let currentQuestion = question[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const preButton = document.createElement("button");
    preButton.innerHTML = answer.text;
    preButton.classList.add("button");
    answerButton.appendChild(preButton);

    if(answer.correct){
      preButton.dataset.correct = answer.correct;
    }
    preButton.addEventListener("click", selectAnswer);
  });
}

function resetQuiz(){
  nextButton.style.display = "none";
    while(answerButton.firstChild){
      answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(answer){
  const selectedButton = answer.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  if (isCorrect){
    selectedButton.classList.add("Correct");
    score++;
  }else {
    selectedButton.classList.add("Incorrect");
  }
  
  Array.from(answerButton.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("Correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore(){
  resetQuiz();
  questionElement.innerHTML = 'You scored ' + score + ' / ' + question.length;
  nextButton.innerHTML = "Quiz Again.";
  nextButton.style.display = "block";
}
function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < question.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < question.length){
    handleNextButton();
  }else{
    startQuiz();
  };
});


// nextButton.addEventListener("click", ()=>{
//   if(currentQuestionIndex < question.length){
//     currentQuestionIndex++;
//     if(currentQuestionIndex < question.length){
//       showQuestion();
//     }
//   }else{
//     showScore();
//   };
// })

startQuiz();
