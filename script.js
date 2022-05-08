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

let buttons = (function () {
  const restart = function () {
    document.getElementById("restart").addEventListener("click", () => {
      gameBoard.endGame();
      ScoreDisplay.xturn();
    });
  };
  const start = function () {
    document.getElementById("start").addEventListener(
      "click",
      () => {
        gameBoard.clickDivs();
        ScoreDisplay.xturn();
      },
      { once: true }
    );
  };
  const addName = function () {
    let addBtn = document.getElementById("addName");
    addBtn.addEventListener("click", () => {
      if (gameBoard.arrayEmt()) {
        const body = document.querySelector("body");
        const bkBackground = document.createElement("div");
        bkBackground.classList.add("bkBackground");
        const form = document.createElement("form");
        let player1Name = document.createElement("input"); //console.log();
        let name1 = document.createElement("label");
        name1.textContent = "Player 1(X):";
        name1.append(player1Name);
        let player2Name = document.createElement("input");
        let name2 = document.createElement("label");
        name2.textContent = "Player 2(O):";
        name2.append(player2Name);
        const submit = document.createElement("button");
        submit.textContent = "Submit";
        form.append(name1, name2, submit);
        bkBackground.appendChild(form);
        body.appendChild(bkBackground);
        submit.addEventListener("click", (e) => {
          e.preventDefault();

          players.player1.name = player1Name.value;
          players.player2.name = player2Name.value;

          if (player1Name.value.length == 0) players.player1.name = "X";
          if (player2Name.value.length == 0) players.player2.name = "O";
          body.removeChild(bkBackground);

          if (ScoreDisplay.divEmt() != 0) ScoreDisplay.xturn();
        });
      } else {
        alert("You need to restart game");
      }
    });
  };
  return {
    restart,
    start,
    addName,
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
    divEmt: () => player1.textContent.length,
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
    let notTie = true;
    for (const combination of gameGrid) {
      const [a, b, c] = combination;
      if (grids[a] != null && grids[a] === grids[b] && grids[a] === grids[c]) {
        const winner = () => {
          if (grids[a] == "X") {
            ScoreDisplay.gamewinner(players.player1.name);
            disableScreen.add();
            setTimeout(disableScreen.remove, 1000);
            setTimeout(endGame, 1001);
            notTie = false;
          } else {
            ScoreDisplay.gamewinner(players.player2.name);
            disableScreen.add();
            setTimeout(disableScreen.remove, 1000);
            setTimeout(endGame, 1001);
            notTie = false;
          }
        };
        winner();
      }
    }
    const notNull = (x) => x != null;
    if (grids.every(notNull) && notTie) {
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
  const isnull = (x) => x == null;
  let arrayEmt = () => grids.every(isnull);
  return {
    displayContent: displayContent,
    clickDivs: gameGrids,
    endGame,
    arrayEmt: arrayEmt,
  };
})();

buttons.start();
buttons.restart();
buttons.addName();
