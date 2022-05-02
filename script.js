// 0 1 2  game grids
// 3 4 5                       x=1  O=2
// 6 7 8

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
        } else if (checkSpot(i)) {
          grids[i] = "O";
          displayContent();
          GameWon();
          firstChoice = true;
          gameCount += 1;
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

  return {
    restart,
  };
})();

gameBoard.clickDivs();
buttons.restart();
