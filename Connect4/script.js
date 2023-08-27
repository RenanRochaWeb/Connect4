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
      newCell.setAttribute("x", f);
      newCell.setAttribute("y", i);
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
  const cellX = Number(cell.getAttribute("x"));
  let cellY = Number(cell.getAttribute("y"));

  if (cellY != 5) {
    while (
      cellY < 5 &&
      document
        .querySelector(`[x="${cellX}"][y="${cellY + 1}"]`)
        .getAttribute("played") == "none"
    ) {
      cellY++;
    }
  }

  const cellPlacement = document.querySelector(`[x="${cellX}"][y="${cellY}"]`);

  cellPlacement.setAttribute("played", currentPlayer);
  cellPlacement.style.pointerEvents = "none";
  board[cellY][cellX] = currentPlayer;

  if (currentPlayer == PLAYER_1) {
    cellPlacement.style.backgroundColor = "#cba";
    checkWin(cellPlacement);
    currentPlayer = PLAYER_2;
  } else {
    cellPlacement.style.backgroundColor = "#dbf";
    checkWin(cellPlacement);
    currentPlayer = PLAYER_1;
  }

  document.querySelector(
    ".player-turn"
  ).textContent = `${currentPlayer}'s turn`; //change color aswell
}

// Check for a win condition
function checkWin(cell) {
  // Implement win-checking logic
  const cellX = Number(cell.getAttribute("x"));
  const cellY = Number(cell.getAttribute("y"));
  const winDiv = document.createElement("div");
  winDiv.textContent = `${currentPlayer} WON!`;

  if (cellX < 3) {
    if (cellY < 3) {
      for (i = 1; i <= 3; i++) {
        if (
          document
            .querySelector(`[x="${cellX + i}"][y="${cellY}"]`)
            .getAttribute("played") != currentPlayer
        ) {
          break;
        }
        if (i == 3) {
          ///////////////////////////////////////////////////////POOP
          document.querySelector(".info").appendChild(winDiv);
          return;
        } //wins
      }
      for (i = 1; i <= 3; i++) {
        if (
          document
            .querySelector(`[x="${cellX}"][y="${cellY + i}"]`)
            .getAttribute("played") != currentPlayer
        ) {
          break;
        }
        if (i == 3) {
          document.querySelector(".info").appendChild(winDiv);
          return;
        } //wins
      }
      for (i = 1; i <= 3; i++) {
        if (
          document
            .querySelector(`[x="${cellX + i}"][y="${cellY + i}"]`)
            .getAttribute("played") != currentPlayer
        ) {
          break;
        }
        if (i == 3) {
          document.querySelector(".info").appendChild(winDiv);
          return;
        } //wins
      }
    } else {
      for (i = 1; i <= 3; i++) {
        if (
          document
            .querySelector(`[x="${cellX}"][y="${cellY - i}"]`)
            .getAttribute("played") != currentPlayer
        ) {
          break;
        }
        if (i == 3) {
          document.querySelector(".info").appendChild(winDiv);
          return;
        } //wins
      }
      for (i = 1; i <= 3; i++) {
        if (
          document
            .querySelector(`[x="${cellX + i}"][y="${cellY - i}"]`)
            .getAttribute("played") != currentPlayer
        ) {
          break;
        }
        if (i == 3) {
          document.querySelector(".info").appendChild(winDiv);
          return;
        } //wins
      }
      for (i = 1; i <= 3; i++) {
        if (
          document
            .querySelector(`[x="${cellX + i}"][y="${cellY}"]`)
            .getAttribute("played") != currentPlayer
        ) {
          break;
        }
        if (i == 3) {
          document.querySelector(".info").appendChild(winDiv);
          return;
        } //wins
      }
    }
  } else if (cellX > 3) {
    if (cellY < 3) {
      for (i = 1; i <= 3; i++) {
        if (
          document
            .querySelector(`[x="${cellX - i}"][y="${cellY}"]`)
            .getAttribute("played") != currentPlayer
        ) {
          break;
        }
        if (i == 3) {
          document.querySelector(".info").appendChild(winDiv);
          return;
        } //wins
      }
      for (i = 1; i <= 3; i++) {
        if (
          document
            .querySelector(`[x="${cellX - i}"][y="${cellY + i}"]`)
            .getAttribute("played") != currentPlayer
        ) {
          break;
        }
        if (i == 3) {
          document.querySelector(".info").appendChild(winDiv);
          return;
        } //wins
      }
      for (i = 1; i <= 3; i++) {
        if (
          document
            .querySelector(`[x="${cellX}"][y="${cellY + i}"]`)
            .getAttribute("played") != currentPlayer
        ) {
          break;
        }
        if (i == 3) {
          document.querySelector(".info").appendChild(winDiv);
          return;
        } //wins
      }
    } else {
      for (i = 1; i <= 3; i++) {
        if (
          document
            .querySelector(`[x="${cellX - i}"][y="${cellY}"]`)
            .getAttribute("played") != currentPlayer
        ) {
          break;
        }
        if (i == 3) {
          document.querySelector(".info").appendChild(winDiv);
          return;
        } //wins
      }
      for (i = 1; i <= 3; i++) {
        if (
          document
            .querySelector(`[x="${cellX - i}"][y="${cellY - i}"]`)
            .getAttribute("played") != currentPlayer
        ) {
          break;
        }
        if (i == 3) {
          document.querySelector(".info").appendChild(winDiv);
          return;
        } //wins
      }
      for (i = 1; i <= 3; i++) {
        if (
          document
            .querySelector(`[x="${cellX}"][y="${cellY - i}"]`)
            .getAttribute("played") != currentPlayer
        ) {
          break;
        }
        if (i == 3) {
          document.querySelector(".info").appendChild(winDiv);
          return;
        } //wins
      }
    }
  } else {
    return; //not done####################################################
  }
}

// Check for a draw
function checkDraw() {
  // Implement draw-checking logic
  //if all cells are filled and checkwin returns false then this returns true
}

// Restart the game
function restartGame() {
  // Implement game restart logic
  board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));
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
