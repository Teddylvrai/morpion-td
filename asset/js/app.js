console.log("Initialisation ...");

const container = document.getElementById("container")
const cells = document.querySelectorAll(".cell")
const reset = document.getElementById("reset")

const currentPlayerSpan = document.getElementById("currentPlayer");
const scoreXSpan = document.getElementById("scoreX");
const scoreOSpan = document.getElementById("scoreO");

let board = Array(9).fill("")
let gameIsPlayable = true
let player = "✖️"

let scoreX = 0;
let scoreO = 0;

function handleClick(event){
    const index = event.target.dataset.index
    
    if(board[index] !== "" || !gameIsPlayable) return
    
    board[index] = player
    event.target.textContent = player

    if (checkForWin()){
        updateScore(player);
        showResult(`Le joueur ${player} a gagné !`)
    } 
    else if(!board.includes("")){
        showResult("Match nul !")
    } else {
        player = player === "✖️" ? "⭕" : "✖️"
        
        currentPlayerSpan.textContent = player; 
    }
}

function updateScore(winner) {
    if (winner === "✖️") {
        scoreX++;
        scoreXSpan.textContent = scoreX;
    } else {
        scoreO++;
        scoreOSpan.textContent = scoreO;
    }
}

function showResult(message){
    setTimeout(() => {
        alert(message)
    }, 10)
    
    gameIsPlayable = false
    container.onclick = function fini(){
    } 
}

function checkForWin(){
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winConditions.some(combination => {
        const [a, b, c] = combination
        // Vérifie si a, b et c sont identiques et non vides
        return board[a] && board[a] === board[b] && board[a] === board[c]
    })
}

function initGame(){
    cells.forEach(cell => cell.addEventListener("click", handleClick))
}

console.log("100%");
console.log("Initialisation terminée la partie peut commencer");

reset.addEventListener("click", function resetGame(){
    board = Array(9).fill("")
    gameIsPlayable = true
    player = "✖️"
    
    currentPlayerSpan.textContent = player; 
    
    cells.forEach(cell => cell.textContent = "")
    
    container.onclick = null; 
})

initGame()

const bouton = document.getElementById('monBouton');
const body = document.body;

if(bouton){ 
    bouton.addEventListener('click', function() {
        body.classList.toggle('couleur2');
    });
}
