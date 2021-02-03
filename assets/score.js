//const username = document.querySelector('#userName').value;
//const saveScoreBtn = document.querySelector('#saveScoreBtn');
//const finalScore = document.querySelector('#scoreArea');
const mostRecentScores = document.querySelector('#mostRecentScore'); 


const MAX_HIGH_SCORES = 5;

const highScores = JSON.parse(localStorage.getItem('mostRecentScore'))


$('#scoreArea').text(highScores)

var scores = init();
console.log(scores)
renderScores(scores);



function renderScores(...arry) {
    // Clear todoList element and update todoCountSpan
    $('#scoreslist').innerHTML = "";//access list to dispay scores
    //console.log(scores.length)

    // Render a new li for each score
    console.log(scores)
    if (scores === undefined){
        return
    }
    for (var i = 0; i < scores.length; i++) {
    var score = ("Score:"+scores[i].score+" Name:"+scores[i].name);
    console.log(score)
    var li = document.createElement("li");
    li.textContent = score;
    li.setAttribute("data-index", i);
    $('#scoreslist').append(li);
    }
}

function init() {
    // Get stored todos from localStorage
    // Parsing the JSON string to an object
    var storedScores = JSON.parse(localStorage.getItem("testarray"));//savehighScores
    console.log(storedScores)
    if (storedScores === null) {
        console.log("Storage empty")
        return;
        }
    else {
        //renderScores();
        console.log(storedScores)
        return (storedScores);
    }
    
}



//pull in user name and clear area
// username.addEventListener('keyup', () =>{
//    saveHighscore(this) 
// })
$('#saveScoreBtn').click(function(event){
    event.preventDefault();
    console.log("click")
    const recentScore = JSON.parse(localStorage.getItem('mostRecentScore'))
    var userName = $('#userName').val()//add a trim

    var obj =  {
        "score": recentScore,
        "name": userName
    }
    // Return from function early if submitted todoText is blank
    if (userName === "") {
    return;
    }

    // Add new todoText to todos array, clear the input
    scores.push(obj);
    console.log(scores)
    // $('#userName').remove()
    // $('#scoreArea').remove()
    
    if (scores.length > 5) {
        scores.push(obj);
        scores.splice(1)
        var score = ("Score:"+obj.score+" Name:"+obj.name);
        console.log(score)
        var li = document.createElement("li");
        li.textContent = score;
        
    $('#scoreslist').append(li);
    }else {
        scores.push(obj);
        var score = ("Score:"+obj.score+" Name:"+obj.name);
        console.log(score)
        var li = document.createElement("li");
        li.textContent = score;
        
    }
    // Store updated todos in localStorage, re-render the list make textarea disapear
    
    storeScores();

    // saveHighscore(event)
})

function storeScores() {
    // Stringify and set "todos" key in localStorage to todos array
    localStorage.setItem('savehighScores', JSON.stringify(scores));
    console.log("saved new score")
}

saveHighscore = e => {
    e.preventDefault()

    const score = {
        score: highScores,
        name : $('#userName').val()
    }
    console.log(score)
    // console.log(typeof(highScores))
    // highScores.push(score)

    // highScores.sort((a,b) => {
    //     return b.score - a.score 
    // })

    // highScores.splice(5)

    localStorage.setItem('savehighScores', JSON.stringify(score))
    window.location.assign('/')

}



// problems 
// if there is not data stored get a area 
// need to clear area to add new item 

// // When form is submitted...
// todoForm.addEventListener("submit", function(event) {
//     event.preventDefault();
  
//     var todoText = todoInput.value.trim();
  
//     // Return from function early if submitted todoText is blank
//     if (todoText === "") {
//       return;
//     }
  
//     // Add new todoText to todos array, clear the input
//     todos.push(todoText);
//     todoInput.value = "";
  
//     // Store updated todos in localStorage, re-render the list
//     storeTodos();
//     renderTodos();
//   });