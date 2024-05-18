let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const statusDisplay = document.getElementById('status');

function handleMove(cellIndex) {
    if (!gameActive || gameBoard[cellIndex] !== '') return;
    
    gameBoard[cellIndex] = currentPlayer;
    const cell = document.getElementById('game-board').children[cellIndex];
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer); 

    if (checkWin()) {
        statusDisplay.innerText = `${currentPlayer} wins!`;
        statusDisplay.style.color = currentPlayer === 'X' ? '#748891' : '#dc5f82'; 
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        statusDisplay.innerText = `It's a draw!`;
        statusDisplay.style.color = '#3a4664'; 
        statusDisplay.style.fontWeight = 'bolder';
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerText = `${currentPlayer}'s turn`;
    statusDisplay.style.color = currentPlayer === 'X' ? '#748891' : '#dc5f82'; 
    statusDisplay.style.fontWeight = 'bolder';
}


function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameBoard[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return gameBoard.every(cell => {
        return cell !== '';
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('X', 'O'); 
    });

   
    statusDisplay.innerText = `The game is reset.`;
    statusDisplay.style.color = '#3a4664'; 
    statusDisplay.style.fontWeight = 'bolder';

    setTimeout(() => {
        statusDisplay.innerText = `${currentPlayer}'s turn`;
        statusDisplay.style.color = '#748891';
        statusDisplay.style.fontWeight = 'bolder';
    }, 1000);
}

