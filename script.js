// 0 1 2  game grids
// 3 4 5                       x=1  O=2
// 6 7 8
let gameBoard = (function () {
  let grids = ["", "", "", "", "", "", "", "", ""];
  let firstChoice = true; //check who started //change to player
  const displayContent = function () {
    for (let i = 0; i < 9; i++) {
      let div = document.querySelector(`[id='${i}']`);
      div.textContent = grids[i];
    }
  };

  let gameGrids = function () {
    const spots = document.querySelectorAll(".grid");
    spots.forEach((spot, i) =>
      spot.addEventListener("click", function () {
        if (firstChoice) {
          grids[i] = "X";
          displayContent();
          firstChoice = false;
        } else {
          grids[i] = "O";
          displayContent();
          console.log(grids);
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

gameBoard.clickDivs();
