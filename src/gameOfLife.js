export default function gameOfLife(inputBoard) {
  const outputBoard = inputBoard.map((row, x) => {
      return row.map((cell, y) => {
        const living = countLivingNeighbors(x, y, inputBoard)
        if(cell === 1) {
          if(living < 2)
            return 0
          if(living > 3) {
            return 0
          }
        } else {
          if (living === 3) {
            return 1
          }
        }

        return cell
      })
  })

  return outputBoard;
}

export function countLivingNeighbors(x, y, inputBoard) {
  let count = 0
  for(let i = x - 1; i <= x + 1; i++) {
    if(i < 0 || i >= inputBoard.length)
      continue

    for(let j = y - 1; j <= y + 1; j++) {
      if(j < 0 || j >= inputBoard[i].length)
        continue

      if(i === x && j === y)
        continue

      if(inputBoard[i][j] === 1) {
        count++
      }
    }
  }

  return count
}
