console.log("Initialisation ...");

const container = document.getElementById("container")
const cells = document.querySelectorAll(".cell")
const reset = document.getElementById("reset") // Déplacé ici pour regrouper les sélecteurs

// --- NOUVEAU : Récupération des éléments HTML pour le score et le tour ---
const currentPlayerSpan = document.getElementById("currentPlayer");
const scoreXSpan = document.getElementById("scoreX");
const scoreOSpan = document.getElementById("scoreO");

let board = Array(9).fill("")
let gameIsPlayable = true
let player = "✖️"

// --- NOUVEAU : Variables pour les scores ---
let scoreX = 0;
let scoreO = 0;

function handleClick(event){
    const index = event.target.dataset.index
    
    // Si la case est prise ou le jeu fini, on arrête
    if(board[index] !== "" || !gameIsPlayable) return
    
    // Marquer la case
    board[index] = player
    event.target.textContent = player

    // Vérification victoire
    if (checkForWin()){
        // --- NOUVEAU : Mise à jour du score avant d'afficher le résultat ---
        updateScore(player);
        showResult(`Le joueur ${player} a gagné !`)
    } 
    else if(!board.includes("")){
        showResult("Match nul !")
    } else {
        // Changement de joueur (seulement si la partie n'est pas finie)
        player = player === "✖️" ? "⭕" : "✖️"
        
        // --- NOUVEAU : Afficher qui doit jouer ---
        currentPlayerSpan.textContent = player; 
    }
}

// --- NOUVEAU : Fonction pour mettre à jour les scores ---
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
    // Petit délai pour laisser le navigateur afficher le dernier symbole avant l'alerte
    setTimeout(() => {
        alert(message)
    }, 10)
    
    gameIsPlayable = false
    container.onclick = function fini(){
        // Empêche les clics résiduels
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

// Reset du jeu
reset.addEventListener("click", function resetGame(){
    board = Array(9).fill("")
    gameIsPlayable = true
    player = "✖️"
    
    // --- NOUVEAU : Remettre l'affichage du joueur à jour ---
    currentPlayerSpan.textContent = player; 
    
    cells.forEach(cell => cell.textContent = "")
    
    // Nettoyage de l'événement onclick bloquant du container s'il existe
    container.onclick = null; 
})

initGame()

// --- Bouton Mode Sombre ---
const bouton = document.getElementById('monBouton');
const body = document.body;

if(bouton){ // Vérifie si le bouton existe pour éviter les erreurs
    bouton.addEventListener('click', function() {
        body.classList.toggle('couleur2');
    });
}