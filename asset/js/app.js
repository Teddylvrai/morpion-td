console.log("Initialisation ...");

const container = document.getElementById("container")

/*container.onclick = function(){
    alert("clique pas sa marche pas !")
    console.log("arrete d'appuyer");
}*/

const cells = document.querySelectorAll(".cell")

let board = Array(9).fill("")

let gameIsPlayable = true

let player = "✖️"

function handleClick(event){
    const index = event.target.dataset.index
    if(board[index] !== "" || !gameIsPlayable) return
    board[index] = player
    event.target.textContent = player



    if (checkForWin()){
        showResult(`Le joueur ${player} a gagné !`)
    }else if(!board.includes("")){
        showResult("Match nul !")
    }

    player = player === "✖️" ? "⭕" : "✖️"
}

function showResult(message){
    alert(message)
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

    return winConditions.some(winConditions => {
        const [a, b, c] = winConditions
        return board[a] && board[a] === board[b] && board[a] === board[c]
    })
}

function initGame(){
    cells.forEach(cell => cell.addEventListener("click", handleClick))
}

console.log("100%");
console.log("Initialisation terminée la partie peut commencer");

const reset = document.getElementById("reset")

reset.addEventListener("click", function resetGame(){
    board = Array(9).fill("")
    gameIsPlayable = true
    player = "✖️"
    cells.forEach(cell => cell.textContent = "")
})

initGame()

//bouton pour changer couleur de fond

const bouton = document.getElementById('monBouton');

// 2. On récupère le body
const body = document.body;

// 3. On ajoute l'écouteur d'événement "click"
bouton.addEventListener('click', function() {
    // Bascule la classe 'mode-sombre'
    body.classList.toggle('couleur2');
});
