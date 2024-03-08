const questions = [
    {
        question: "The Planet Neptune",
        answers: [
            { text: "Blue", correct: true},
            { text: "Red", correct: false},
            { text: "White", correct: false},
            { text: "Brown", correct: false},
        ]
    },
    // First question & possible answers
    {
        question: "A Pumpkin",
        answers: [
            { text: "Yellow", correct: false},
            { text: "Green", correct: false},
            { text: "Orange", correct: true},
            { text: "Brown", correct: false},
        ]
    },
    // Second question & possible answers
    {
        question: "Leader of Power Rangers",
        answers: [
            { text: "Blue", correct: false},
            { text: "Red", correct: true},
            { text: "White", correct: false},
            { text: "Pink", correct: false},
        ]
    },
    //Third question & possible answers
    {
        question: "Statue Of Liberty",
        answers: [
            { text: "Silver", correct: false},
            { text: "Maroon", correct: false},
            { text: "Lavender", correct: false},
            { text: "Green", correct: true},
        ]
    },
    //Fourth question & possible answers
    {
        question: "Character Venom",
        answers: [
            { text: "Blue", correct: false},
            { text: "Black", correct: true},
            { text: "Green", correct: false},
            { text: "Gold", correct: false},
        ]
    },
    //Fifth question & possible answers
];
const questionElement = document.getElementById("question");
// Created a variable for question from html.
const answerButtons = document.getElementById("Answer-buttons");
// Created a variable for answer button from html.
const nextButton = document.getElementById("nxtButton");
// Created a variable for next button from html.

let currentQuestionIndex = 0;
let scoreIndex = 0;
//Setting the default start for questions and score as 0.

function startQuiz(){
    currentQuestionIndex = 0;
    scoreIndex = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    // Created a start quiz function to begin quiz at first question and score 0.
    // Also Calling a new function showQuestion().
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question;
    // This function will show current question and increment to the next question.    

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
    // This function will display the question, the question number and answer.
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
// This function removes the template question and buttons texts from html.
// This ensures display of current questions on Main.js instead.

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        scoreIndex++;
    } else {
        selectedBtn.classList.add("incorrect");
    };
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
// This function checks if the button selected by user corresponds with the data shown as true/false in the questions above.
// Also increments the score whether it is correct or incorrect.

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${scoreIndex} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again!"
    nextButton.style.display = "block";
    // This function shows will calculate how many correct answers out of 5 and show message.
    // Will also show message play again at the end of quiz rather than next button.
    // This function also calls the reset function to start quiz again.
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
// This function shows will call on showQuestion function to continue quiz.. 
// if you're not at the end of the total questions.
// Otherwise, if you are, it will show you the final result.

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }else {
        startQuiz();
    }
})
// Checks if the current question is less than the entire set of questions..
// .. it then calls the handleNextBtn to move onto the next question.
// Otherwise, we're at the end and the quiz starts again.
startQuiz();
// Calls for the quiz to start.
