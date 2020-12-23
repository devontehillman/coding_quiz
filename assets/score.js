const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('finalScore');
const mostRecentScores = document.querySelector('#mostRecentScore'); 

const highScores = JSON.parse(localStorage.getItem('highscores')) || []

const MAX_HIGH_SCORES = 5 ;

finalScore.innerText = mostRecentScores

username.addEventListener('keyup', () =>{
    SVGPathSegCurvetoCubicSmoothRel.Btn.disabled = !username.value
})

saveHighscore = e => {
    e.preventDefault()

    const score = {
        socre: mostRecentScore,
        name : username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score 
    })

    highScores.splice(5)

    localStorage.setItem(highScores, JSON.stringify(highscores))
    window.location.assign('/')

}