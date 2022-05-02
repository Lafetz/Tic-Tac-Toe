const ScoreDisplay = (function () {
  let player1 = document.querySelector(".turn1");
  let player2 = document.querySelector(".turn2");
  const turn1 = function () {
    player1.textContent = "X's turn";
    player2.textContent = "";
  };
  const turn2 = function () {
    player1.textContent = "";
    player2.textContent = "O's turn";
  };
  const gameEnd = function () {
    player1.textContent = "";
    player2.textContent = "";
  };
  return {
    xturn: turn1,
    oturn: turn2,
    gameEnd: gameEnd,
  };
})();

const players = (function () {
  const player = function (name, score) {
    return {
      name: name,
      score: score,
    };
  };
  let player1 = player("X", 0);
  let player2 = player("O", 0);
  return {
    player1,
    player2,
  };
})();

let gameBoard = (function () {
  grids = new Array(9).fill("");
  let gameCount = 0;
  const gameGrid = [
    [0, 1, 2], //1
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], //4
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], //7
    [2, 4, 6],
  ];

  let firstChoice = true; //check who started //change to player
  const displayContent = function () {
    for (let i = 0; i < 9; i++) {
      let div = document.querySelector(`[id='${i}']`);
      div.textContent = grids[i];
    }
  };
  const checkSpot = function (index) {
    //see if grid is taken
    return grids[index] == "";
  };

  const endGame = function () {
    grids = new Array(9).fill("");
    displayContent();
    ScoreDisplay.gameEnd();
  };
  const GameWon = function () {
    for (const combination of gameGrid) {
      const [a, b, c] = combination;
      if (grids[a] != "" && grids[a] === grids[b] && grids[a] === grids[c]) {
        const winner = (won) => {
          if (gameCount % 2 == 0) {
            console.log(`${players.player1.name} won`);
            endGame();
          } else {
            console.log(`${players.player2.name} won`);
            endGame();
          }
        };
        winner();
      }
    }
  };
  let gameGrids = function () {
    const spots = document.querySelectorAll(".grid");
    spots.forEach((spot, i) =>
      spot.addEventListener("click", function () {
        if (firstChoice && checkSpot(i)) {
          grids[i] = "X";
          displayContent();
          GameWon();
          firstChoice = false;
          gameCount += 1;
          ScoreDisplay.oturn();
        } else if (checkSpot(i)) {
          grids[i] = "O";
          displayContent();
          GameWon();
          firstChoice = true;
          gameCount += 1;
          ScoreDisplay.xturn();
        }
      })
    );
  };
  return {
    displayContent: displayContent,
    clickDivs: gameGrids,
    endGame,
  };
})();
let buttons = (function () {
  const restart = function () {
    document
      .getElementById("restart")
      .addEventListener("click", gameBoard.endGame);
  };
  const start = function () {
    document
      .getElementById("start")
      .addEventListener("click", gameBoard.clickDivs);
  };

  return {
    restart,
    start,
  };
})();

buttons.start();
buttons.restart();
