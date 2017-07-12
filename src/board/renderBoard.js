import handleCellClick from './handleCellClick'

export default function renderBoard(inputBoard) {
  emptyBoard()

  const table = document.createElement('table')
  table.className = 'noselect'

  for (let i = 0; i < inputBoard.length; i++) {
    const row = document.createElement('tr')
    table.appendChild(row)

    for (let j = 0; j < inputBoard[i].length; j++) {
      const cell = document.createElement('td')
      cell.innerHTML = inputBoard[i][j]
      cell.setAttribute('data-cell-x', i + 1)
      cell.setAttribute('data-cell-y', j + 1)
      cell.setAttribute('data-cell-type', inputBoard[i][j])
      cell.addEventListener('click', handleCellClick)

      row.appendChild(cell)
    }
  }

  document.getElementById('board').appendChild(table)
}

function emptyBoard() {
  document.getElementById('board').innerHTML = ''
}
