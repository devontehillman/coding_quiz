const question  = document.querySelector("#question");
const choices  = Array.from(document.querySelectorAll('.choice-text'));
//const progressText  = document.querySelector('#ProgressText');
const scoreText = document.querySelector('#score');
const progressBarFull  = document.querySelector('#progressBarFull');//not usign this 
const timerText = document.querySelector('#countDown');

let currentQuestion = {}//object to store all the questions 
let acceptingAnswers = true //boolean to singnal page change
let score = 0 // score counter 
let questionCounter = 0 
let availableQuestions = [] //Array to keep track of unanswered questions

// creation of questions
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

const SCORE_POINTS = 1 // score increment
const MAX_QUSTIONS = 4 // number of questions

startGame = () => {// resets score and questions 
    questionCounter = 0 
    score = 0 
    availableQuestions = [...questions]// use of rest syntax to retrive the remaining should there be a restOfQuestions instead 
    getNewQuestion()
}

getNewQuestion = () => { 
    if (availableQuestions.length === 0 || questionCounter > MAX_QUSTIONS){// stores score of quiz and goes to score page
        localStorage.setItem("mostRecentScore", JSON.stringify(score));
        return window.location.assign('score.html')
    }
    // progress bar
    questionCounter++;
    //progressText.innerText = `Question ${questionCounter} of ${MAX_QUSTIONS}`//changes the count of text 
    //progressBarFull.style.width = `${(questionCounter/MAX_QUSTIONS) * 100}%`// get qustion on and convert to percent

    //
    const  questionIndex = Math.floor(Math.random() * availableQuestions.length); //gets randon number for question
    currentQuestion = availableQuestions[questionIndex]; //selects random question and stores it in current question
    question.innerText = currentQuestion.question; //updates html question area with  

    choices.forEach(choice => { // selects each choice element to updates them
        const number = choice.dataset['number']// updates each choice with its respective answer
        choice.innerText = currentQuestion['choice' + number]// updates each choice with its respective answer
    })

    availableQuestions.splice(questionIndex,1);//removes used question from index 

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) {return} //returns early if questions are done

        acceptingAnswers == false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'] // get the number for the index of which button was clicked 
        console.log(selectedChoice);// logs what choice 

        let classtoApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'; //turnary???? toggle the style

        if (classtoApply === 'correct'){
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classtoApply)//adds color when right or wrong

        setTimeout(() => { // gives time so that see that the color is displayed
            selectedChoice.parentElement.classList.remove(classtoApply)
            getNewQuestion()// gets next question

        },1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score; // update the score
}

var totalSeconds = 500;
//var timerDone = false;

function setTime() { // need to pass in var to be returned 
    var timerInterval = setInterval(function() {
        totalSeconds--;
        timerText.textContent = totalSeconds;
    
    if(totalSeconds === 0) {
        clearInterval(timerInterval);
        localStorage.setItem("mostRectentScore", JSON.stringify(score));
        return window.location.assign('score.html')
        }
    }, 1000);
  }



setTime()
startGame()





