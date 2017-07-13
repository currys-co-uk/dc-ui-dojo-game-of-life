// Rendering part

const playground = document.getElementById('playBoard'); // canvas element
const boarddimension = playground.getContext('2d'); // dimension
playground.style.border = '3px solid #2cc875';

// axis
let x, y;
x = y = 0;

// cell
const cell =() => {
  boarddimension.fillRect(0, 0, 30, 30);
  boarddimension.fillStyle = '#2cc875';
}

// controls
document.getElementById('startButton').onclick = function(e) {
    gameStart()
}
document.getElementById('overButton').onclick = function(e) {
    gameOver()
}


let gameStart = function() {
  console.log("successfully started")
}

let gameOver = function() {
    console.log("It is sad but this game is over")
}


// finally rendering

// the algorithm
export function countLivingNeighbors(x, y, inputBoard) {
    let count = 0;
    for (let i = x - 1; i <= x + 1; i++) {
        if (i < 0 || i >= inputBoard.length) { continue; }

        for (let j = y - 1; j <= y + 1; j++) {
            if (j < 0 || j >= inputBoard[i].length) { continue; }

            if (i === x && j === y) { continue; }

            if (inputBoard[i][j] === 1) {
                count++;
            }
        }
    }

    return count;
}

export default function gameOfLife(inputBoard) {
  const outputBoard = inputBoard.map((row, x) => row.map((cell, y) => {
    const living = countLivingNeighbors(x, y, inputBoard);
    if (cell === 1) {
      if (living < 2) { return 0; }
      if (living > 3) {
        return 0;
      }
    } else if (living === 3) {
      return 1;
    }

    return cell;
  }));

  return outputBoard;
}
