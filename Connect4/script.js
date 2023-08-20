// Constants
const ROWS = 6;
const COLUMNS = 7;
const PLAYER_1 = "Player 1";
const PLAYER_2 = "Player 2";

// Variables
let currentPlayer = PLAYER_1;
let board = [];

// Initialize the game board
function initializeBoard() {
  board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));
  let grid = document.querySelector(".grid");

  for (i = 0; i < board.length; i++) {
    for (f = 0; f < board[i].length; f++) {
      let newCell = document.createElement("div");
      newCell.id = `${i * 7 + f}`;
      newCell.setAttribute("x", i);
      newCell.setAttribute("y", f);
      newCell.setAttribute("played", "none");
      grid.appendChild(newCell);
    }
  }
}

// Add click event listeners to grid cells
function addCellClickListeners() {
  const cells = document.querySelectorAll(".grid div");
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(index));
  });
}

// Handle a player's move
function handleCellClick(columnIndex) {
  // Implement logic for player's move here
  // Update the board, check for a win, switch players, and update the UI
  const cell = document.getElementById(columnIndex);
  const cellY = Number(cell.getAttribute("y"));
  let cellX = Number(cell.getAttribute("x"));

  if (cellX != 5) {
    while (
      cellX < 5 &&
      document
        .querySelector(`[x="${cellX + 1}"][y="${cellY}"]`)
        .getAttribute("played") == "none"
    ) {
      cellX++;
    }
  }

  const cellPlacement = document.querySelector(`[x="${cellX}"][y="${cellY}"]`);

  cellPlacement.setAttribute("played", currentPlayer);
  cellPlacement.style.pointerEvents = "none";
  board[cellX][cellY] = currentPlayer;

  if (currentPlayer == PLAYER_1) {
    cellPlacement.style.backgroundColor = "#cba";
    currentPlayer = PLAYER_2;
  } else {
    cellPlacement.style.backgroundColor = "#dbf";
    currentPlayer = PLAYER_1;
  }

  document.querySelector(
    ".player-turn"
  ).textContent = `${currentPlayer}'s turn`;

  checkWin(cellPlacement);
}

// Check for a win condition
function checkWin(cell) {
  // Implement win-checking logic
  const cellX = Number(cell.getAttribute("x"));
  const cellY = Number(cell.getAttribute("y"));

  //3 direction cases
  if (cellX == 0 && cellY == 0) {
    //check 0 +1 | +1+1 | +1 0
  } else if (cellX == 5 && cellY == 0) {
    //check -1 0 | -1 +1 | 0 +1
  } else if (cellX == 0 && cellY == 6) {
    //check 0 -1 | +1 -1 | +1 0
  } else if (cellX == 5 && cellY == 6) {
    //check 0 -1 | -1 -1 | -1 0
  }
  //the rest, check all 8 directions
  else {
    //check -1-1 | -1 0 | -1 +1
    //       0-1 |  0 0 |  0 +1
    //      +1-1 | +1 0 | +1 +1
  }
}

// Check for a draw
function checkDraw() {
  // Implement draw-checking logic
}

// Restart the game
function restartGame() {
  // Implement game restart logic
  const cells = document.querySelectorAll(".grid div");
  cells.forEach((cell) => {
    cell.setAttribute("played", "none");
    cell.style.backgroundColor = "#ccc";
    cell.style.pointerEvents = "auto";
    currentPlayer = PLAYER_1;
    document.querySelector(
      ".player-turn"
    ).textContent = `${currentPlayer}'s turn`;
  });
}

// Initialize the game
function init() {
  initializeBoard();
  addCellClickListeners();
}

// Start the game when the page loads
window.addEventListener("load", init);
