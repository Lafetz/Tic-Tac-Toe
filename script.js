const players = (function () {
  const player = function (name, score) {
    return {
      name: name,
      score: score,
    };
  };
  let player1 = player("abel", 0);
  let player2 = player("nate", 0);
  return {
    player1,
    player2,
  };
})();
players.player1.name = "he";
let buttons = (function () {
  const restart = function () {
    document.getElementById("restart").addEventListener("click", () => {
      gameBoard.endGame();
      ScoreDisplay.xturn();
    });
  };
  const start = function () {
    document.getElementById("start").addEventListener("click", () => {
      gameBoard.clickDivs();
      ScoreDisplay.xturn();
    });
  };

  return {
    restart,
    start,
  };
})();

const ScoreDisplay = (function () {
  let player1 = document.querySelector(".turn1");

  const turn1 = function () {
    player1.textContent = `${players.player1.name}'s turn`;
  };
  const turn2 = function () {
    player1.textContent = `${players.player2.name}'s turn`;
  };

  const gameEnd = function () {
    player1.textContent = " ";
  };
  const won = function (player) {
    player1.textContent = `${player} won`;
  };
  const tie = function () {
    player1.textContent = "It's a tie ";
  };
  return {
    xturn: turn1,
    oturn: turn2,
    gameEnd: gameEnd,
    gamewinner: won,
    tie: tie,
  };
})();
const disableScreen = (function () {
  const body = document.querySelector("body");
  const background = document.createElement("div");
  background.classList.add("background");
  const add = function () {
    body.appendChild(background);
  };
  const remove = function () {
    body.removeChild(background);
  };
  return {
    add: add,
    remove: remove,
  };
})();

let gameBoard = (function () {
  grids = new Array(9).fill(null);
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

  let firstChoice = true;
  const displayContent = function () {
    for (let i = 0; i < 9; i++) {
      let div = document.querySelector(`[id='${i}']`);
      div.textContent = grids[i];
    }
  };
  const checkSpot = function (index) {
    return grids[index] == null;
  };

  const endGame = function () {
    grids = new Array(9).fill(null);
    gameCount = 0;
    firstChoice = true;
    ScoreDisplay.gameEnd();
    displayContent();
    ScoreDisplay.xturn();
  };
  const GameWon = function () {
    for (const combination of gameGrid) {
      const [a, b, c] = combination;
      if (grids[a] != null && grids[a] === grids[b] && grids[a] === grids[c]) {
        const winner = () => {
          if (grids[a] == "X") {
            ScoreDisplay.gamewinner(players.player1.name);
            disableScreen.add();
            setTimeout(disableScreen.remove, 1000);
            setTimeout(endGame, 1001);
          } else {
            ScoreDisplay.gamewinner(players.player2.name);
            disableScreen.add();
            setTimeout(disableScreen.remove, 1000);
            setTimeout(endGame, 1001);
          }
        };
        winner();
      }
    }
    const notNull = (x) => x != null;
    if (grids.every(notNull)) {
      ScoreDisplay.tie();
      setTimeout(() => {
        gameBoard.endGame();
        ScoreDisplay.xturn();
      }, 1000);
    }
  };
  let gameGrids = function () {
    const spots = document.querySelectorAll(".grid");
    spots.forEach((spot, i) =>
      spot.addEventListener("click", function () {
        if (firstChoice && checkSpot(i)) {
          grids[i] = "X";
          displayContent();
          firstChoice = false;
          gameCount += 1;
          ScoreDisplay.oturn();
          GameWon();
        } else if (checkSpot(i)) {
          grids[i] = "O";
          displayContent();
          firstChoice = true;
          gameCount += 1;
          ScoreDisplay.xturn();
          GameWon();
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

buttons.start();
buttons.restart();
console.log(players.player1.name);
