// Rendering part

const playground = document.getElementById('playBoard'); // canvas element
const boarddimension = playground.getContext('2d'); // dimension
playground.style.border = '0.5px solid #1F2E40';

let a, b, value, axisX, axisY, roundedX, roundedY, currentBoard

initGrid()
selectCell()

function selectCell() {
    // get coordinates of click over canvas
    playground.addEventListener("click", () => {
        let totalOffsetX = 0
        let totalOffsetY = 0
        let axisX = 0
        let axisY = 0
        let currentElement = document.getElementById('playBoard')

        do {
            totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft
            totalOffsetY += currentElement.offsetTop - currentElement.scrollTop
        }
        while (currentElement = currentElement.offsetParent)

        axisX = event.pageX - totalOffsetX
        axisY = event.pageY - totalOffsetY
        roundedX = Math.floor(axisX)
        roundedY = Math.floor(axisY)

        while (roundedX % 30 != 0) {
            roundedX--
        }
        while (roundedY % 30 != 0) {
            roundedY--
        }
        fillCell(roundedX, roundedY, 1)

        return currentBoard
    })
}
// init grid
function initGrid() {
    for(let i=0;i<=270;i+=30) {
        for(let j=0;j<=270;j+=30) {
            boarddimension.lineWidth = 1;
            boarddimension.fillStyle = '#1F2E40'
            boarddimension.strokeStyle = '#1F2E40'
            boarddimension.strokeRect(i, j, 30, 30)
        }
    }
}

// fill cell
function fillCell(xaxis, yaxis, value) {
    if (value == 1) {
        boarddimension.fillStyle = '#1F2E40'
        boarddimension.fillRect(xaxis, yaxis, 28, 28)
    } else if(value == 0) {
        boarddimension.fillStyle = '#fff'
        boarddimension.fillRect(xaxis, yaxis, 28, 28)
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

// start game
function gameStart() {
    gameOfLife(currentBoard)
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
    if(typeof(inputBoard) == 'undefined') {
        inputBoard = []
        for (a = 0; a <= 9; a++) {
            inputBoard[a] = []
            for (b = 0; b <= 9; b++) {
                inputBoard[a][b] = Math.round(Math.random())
            }
        }
    }

    for(let i=0;i<10;i++) {
        for(let j=0;j<10;j++) {
            if(i && j == 0) {
                fillCell(0, 0, inputBoard[0][0])
            } else {
                fillCell(i*30, j*30, inputBoard[i][j])
            }
        }
    }
    initGrid()

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

    console.log(outputBoard)

  return outputBoard;
}
