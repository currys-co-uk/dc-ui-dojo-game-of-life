// Rendering part

const playground = document.getElementById('playBoard'); // canvas element
const boarddimension = playground.getContext('2d'); // dimension
playground.style.border = '0.5px solid #555';

let a, b, value

const selectCell = () => {
    // get coordinates of click over canvas
    playground.addEventListener("click", () => {
        var totalOffsetX = 0;
        var totalOffsetY = 0;
        var canvasX = 0;
        var canvasY = 0;
        var currentElement = document.getElementById('playBoard');

        do{
            totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
            totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
        }
        while(currentElement = currentElement.offsetParent)

        canvasX = event.pageX - totalOffsetX;
        canvasY = event.pageY - totalOffsetY;

        console.log(canvasX,canvasY)
    })
}

initGrid()

// init grid
function initGrid() {
    for(let i=0;i<=270;i+=30) {
        for(let j=0;j<=270;j+=30) {    
            boarddimension.lineWidth = 0.5;
            boarddimension.fillStyle = '#fff'    
            boarddimension.strokeRect(i, j, 30, 30)  
        }
    }
}

// fill cell
function fillCell(xaxis, yaxis, value) {
    if (value == 1) {
        boarddimension.fillStyle = '#555'
        boarddimension.fillRect(xaxis, yaxis, 30, 30)
    } else if(value == 0) {
        boarddimension.fillStyle = '#fff'
        boarddimension.fillRect(xaxis, yaxis, 30, 30)
    }
}

// Clear fields
function clearFields() {
    for(a = 0; a <= 270; a+=30) {
        for (b = 0; b <= 270; b += 30) {
            fillCell(a, b, 0)
        }
    }
    initGrid()
}

// fill fields
function fillFields() {
    //  render cells
    const actualBoard = new Array(10)
    
    for (a = 0; a <= 270; a += 30) {
        actualBoard[a] = new Array(10)
        for (b = 0; b <= 270; b += 30) {
            if (a == 120 && b == 120) {
                actualBoard[a][b] = 1
            } else {
                actualBoard[a][b] = 0
            }
        }
    }

    // render fields
    for (a = 0; a <= 270; a += 30) {
        for (b = 0; b <= 270; b += 30) {
            fillCell(a, b, actualBoard[a][b])
        }
    }
    
    initGrid()
}

// start game
function gameStart() {
    fillFields()
}

// controls
document.getElementById('startButton').addEventListener("click", function(e){
    gameStart()
})
document.getElementById('overButton').addEventListener("click", function(e){
    clearFields()
})

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
