// 0 1 2  game grids
// 3 4 5                       x=1  O=2
// 6 7 8
let gameBoard = (function () {
  let grids = ["", "", "", "", "", "", "", "", ""];
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
  const GameWon = function () {
    for (const combination of gameGrid) {
      const [a, b, c] = combination;
      if (grids[a] != "" && grids[a] === grids[b] && grids[a] === grids[c]) {
        console.log("at last");
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
        } else if (checkSpot(i)) {
          grids[i] = "O";
          displayContent();
          GameWon();
          firstChoice = true;
        }
      })
    );
  };
  return {
    displayContent: displayContent,
    clickDivs: gameGrids,
  };
})();
const players = function (player) {
  return {
    player: player,
  };
};

gameBoard.clickDivs();
