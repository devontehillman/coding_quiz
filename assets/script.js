const question  = document.querySelector("#question");
const choices  = Array.from(document.querySelectorAll('.choice-text'));
const progressText  = document.querySelector('#ProgressText');
const scoreText = document.querySelector('#score');
const progressBarFull  = document.querySelector('#progressBarFull');
const timerText = document.querySelector('#countDown');

let currentQuestion = {}
let acceptingAnswers = true 
let score = 0 
let questionCounter = 0 
let availableQuestions = []

let questions = [
    {
        question:'What is 2 + 2?',
        choice1:"1",
        choice2:"2",
        choice3:"6",
        choice4:"4",
        answer:4,
    },
    {
        question:'What is 5 + 4 ?',
        choice1:"2",
        choice2:"2",
        choice3:"9",
        choice4:"4",
        answer:3,
    },
    {
        question:'What is 2 + 6?',
        choice1:"8",
        choice2:"5",
        choice3:"6",
        choice4:"4",
        answer:1,

    },
    {
        question:'What is 2 + 20?',
        choice1:"11",
        choice2:"22",
        choice3:"4",
        choice4:"7",
        answer:2,
    }
]

const SCORE_POINTS = 100
const MAX_QUSTIONS = 4

startGame = () => {
    questionCounter = 0 
    score = 0 
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => { 
    if (availableQuestions.length === 0 || questionCounter > MAX_QUSTIONS){// stores score of quiz
        localStorage.setItem("mostRectentScore", score);

        return window.location.assign('/end.html')
    }

    questionCounter++;
    //progressText.innerText = `Question ${questionCounter} of ${MAX_QUSTIONS}`//changes the count of text 
    //progressBarFull.style.width = `${(questionCounter/MAX_QUSTIONS) * 100}%`// get qustion on and convert to percent

    const  questionIndex = Math.floor(Math.random() * availableQuestions.length); //cycles through questions
    currentQuestion = availableQuestions[questionIndex]; //Keeps track of question on 
    question.innerText = currentQuestion.question; // know what question to ask

    choices.forEach(choice => { // updates choices
        const number = choice.dataset['number']// so it knows what choice we are clicking
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex,1);//removes question from index 

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) {return}

        acceptingAnswers == false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'] // get the number for the index of which button was clicked 
        console.log(selectedChoice);

        let classtoApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'; //turnary???? toggle the style

        if (classtoApply === 'correct'){
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classtoApply)

        setTimeout(() => { // gives us time to see that the user did select a answer
            selectedChoice.parentElement.classList.remove(classtoApply)
            getNewQuestion()// gets next question

        },1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score; // update the score
}
var totalSeconds = 0;

function setTime() {
    var timerInterval = setInterval(function() {
      totalSeconds++;
      return timerText.innerText = totalSeconds;
    }, 1000);
  }



setTime()
startGame()





