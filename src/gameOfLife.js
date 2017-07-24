const playground = document.getElementById('playBoard'); // canvas element
const boarddimension = playground.getContext('2d'); // dimension
playground.style.border = '0.5px solid #444';

let a, b, value, axisX, axisY, roundedX, roundedY, currentBoard, time, selectMode, generations, stopCounter, zeroPoint

(function() {
    stopCounter = 0
    selectMode = false
    initGrid()
    selectCell()
})();

// selectCell
function selectCell() {
    playground.addEventListener("click", () => {
        if(selectMode == false) {
            clearFields()
            currentBoard = []
            for(let a=0;a<10;a++) {
                currentBoard[a] = []
                for (let b = 0; b < 10; b++) {
                    currentBoard[a][b] = 0
                }
            }
        }
        let totalOffsetX = 0
        let totalOffsetY = 0
        let axisX = 0
        let axisY = 0
        selectMode = true
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
        if (roundedX || roundedY != 0) {
            roundedX /= 30;
            roundedY /= 30;
        }
        currentBoard[roundedX][roundedY] = 1
    })
}

// fill cell
function fillCell(xaxis, yaxis, value) {
    if (value == 1) {
        boarddimension.fillStyle = '#444'
        boarddimension.fillRect(xaxis, yaxis, 30, 30)
    } else if(value == 0) {
        boarddimension.fillStyle = '#fff'
        boarddimension.fillRect(xaxis, yaxis, 29, 29)
    }
}

// init grid
function initGrid() {
    for(let i=0;i<=270;i+=30) {
        for(let j=0;j<=270;j+=30) {
            boarddimension.lineWidth = 1;
            boarddimension.fillStyle = '#444'
            boarddimension.strokeStyle = '#444'
            boarddimension.strokeRect(i, j, 30, 30)
        }
    }
}

// Clear fields
function clearFields() {
    for(let a=0;a<=270;a+=30) {
        for(let b=0;b<=270;b+=30) {
            fillCell(a, b, 0)
        }
    }
    initGrid()
}

// start game
function gameStart() {
    if (selectMode == false) {
        currentBoard = []
        for (a = 0; a <= 9; a++) {
            currentBoard[a] = []
            for (b = 0; b <= 9; b++) {
                currentBoard[a][b] = Math.round(Math.random())
            }
        }
    }

    stopCounter = 0

    time = setInterval(() => {
        generations++,
        gameOfLife(currentBoard),
        document.getElementById('generationCount').innerHTML = generations
    }, 100)
}

// controls
document.getElementById('startButton').addEventListener("click", function(e){
    zeroPoint = false
    generations = 0
    gameStart(generations)
})
document.getElementById('overButton').addEventListener("click", function(e){
    selectMode = false
    clearInterval(time);
    clearFields()
    document.getElementById('generationCount').innerHTML = 0
})

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
    let sum = 0
    const outputBoard = inputBoard.map((row, x) => row.map((cell, y) => {
    const living = countLivingNeighbors(x, y, inputBoard);
    if (cell === 1) {
      sum += cell
      if (living < 2) { return 0; }
      if (living > 3) {
        return 0;
      }
    } else if (living === 3) {
      return 1;
    }

    return cell;
    }));

    for(a = 0; a < 10; a++) {
        for (b = 0; b < 10; b++) {
            fillCell(a * 30, b * 30, outputBoard[a][b])
            if ((zeroPoint === true) && (sum === 0)) {
                clearInterval(time);
                clearFields()
            }
        }
    }
    zeroPoint = true
    currentBoard = outputBoard
  return currentBoard
}
