// Constants
const ROWS = 6;
const COLUMNS = 7;
const PLAYER_1 = "Player 1";
const PLAYER_2 = "Player 2";
const POPUP = document.getElementById("popup");
const BACKDROP = document.getElementById("backdrop");

// Variables
let currentPlayer = PLAYER_1;
let board = [];

// Initialize the game board
function initializeBoard() {
  board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0));
  let grid = document.querySelector(".grid");

  for (i = 0; i < board.length; i++) {
    for (f = 0; f < board[i].length; f++) {
      let newCell = document.createElement("div");
      newCell.id = `${i * 7 + f}`;
      newCell.setAttribute("x", f);
      newCell.setAttribute("y", i);
      newCell.setAttribute("played", "none");
      grid.appendChild(newCell);
    }
  }
}

// Add click event listeners to grid cells
function addCellClickListeners() {
  const CELLS = document.querySelectorAll(".grid div");
  CELLS.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(index));
  });
}

// Update the board, check for a win, switch players, and update the UI
function handleCellClick(columnIndex) {
  const CELL = document.getElementById(columnIndex);
  const CELLX = Number(CELL.getAttribute("x"));
  let cellY = Number(CELL.getAttribute("y"));

  //Force the placed piece to go to the last available cell
  if (cellY != 5) {
    while (
      cellY < 5 &&
      document
        .querySelector(`[x="${CELLX}"][y="${cellY + 1}"]`)
        .getAttribute("played") == "none"
    ) {
      cellY++;
    }
  }

  //Place the piece for the turn player
  const CELLPLACEMENT = document.querySelector(`[x="${CELLX}"][y="${cellY}"]`);
  CELLPLACEMENT.setAttribute("played", currentPlayer);
  CELLPLACEMENT.style.pointerEvents = "none";

  if (currentPlayer === PLAYER_1) {
    CELLPLACEMENT.style.backgroundColor = "#cba";
    board[cellY][CELLX] = 1;
  } else {
    CELLPLACEMENT.style.backgroundColor = "#dbf";
    board[cellY][CELLX] = 2;
  }

  //Check if game has ended
  if (checkWin()) {
    document.getElementById("win-player").textContent = `${currentPlayer} won!`;
    POPUP.style.display = "block";
    BACKDROP.style.display = "block";
  }
  if (checkDraw()) {
    document.getElementById("win-player").textContent = `It's a draw!`;
    POPUP.style.display = "block";
    BACKDROP.style.display = "block";
  }

  //Change the player
  currentPlayer = currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1;
  document.querySelector(
    ".player-turn"
  ).textContent = `${currentPlayer}'s turn`;
}

function checkLine(a, b, c, d) {
  // Check first cell non-zero and all cells match
  return a != 0 && a == b && a == c && a == d;
}

// Check for a win condition
function checkWin() {
  // Check down
  for (x = 0; x < 3; x++) {
    for (y = 0; y < 7; y++) {
      if (
        checkLine(
          board[x][y],
          board[x + 1][y],
          board[x + 2][y],
          board[x + 3][y]
        )
      )
        return board[x][y];
    }
  }

  // Check right
  for (x = 0; x < 6; x++) {
    for (y = 0; y < 4; y++) {
      if (
        checkLine(
          board[x][y],
          board[x][y + 1],
          board[x][y + 2],
          board[x][y + 3]
        )
      )
        return board[x][y];
    }
  }

  // Check down-right
  for (x = 0; x < 3; x++) {
    for (y = 0; y < 4; y++) {
      if (
        checkLine(
          board[x][y],
          board[x + 1][y + 1],
          board[x + 2][y + 2],
          board[x + 3][y + 3]
        )
      )
        return board[x][y];
    }
  }

  // Check down-left
  for (x = 3; x < 6; x++) {
    for (y = 0; y < 4; y++) {
      if (
        checkLine(
          board[x][y],
          board[x - 1][y + 1],
          board[x - 2][y + 2],
          board[x - 3][y + 3]
        )
      )
        return board[x][y];
    }
  }

  return 0;
}

// Check for a draw
function checkDraw() {
  //if all cells are filled and checkwin returns false then this returns true
  for (x = 0; x < 6; x++) {
    for (y = 0; y < 7; y++) {
      if (board[x][y] == 0) {
        return 0;
      }
    }
  }
  return 1;
}

// Restart the game
function restartGame() {
  //board
  board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0));
  //cells
  const CELLS = document.querySelectorAll(".grid div");
  CELLS.forEach((cell) => {
    cell.setAttribute("played", "none");
    cell.style.backgroundColor = "#ccc";
    cell.style.pointerEvents = "auto";
    currentPlayer = PLAYER_1;
    document.querySelector(
      ".player-turn"
    ).textContent = `${currentPlayer}'s turn`;
  });
  //popup
  popup.style.display = "none";
  backdrop.style.display = "none";
}

// Initialize the game
function init() {
  initializeBoard();
  addCellClickListeners();
}

// Start the game when the page loads
window.addEventListener("load", init);
