import renderBoard from './renderBoard'

export default function handleCellClick() {
  const cellType = parseInt(this.getAttribute('data-cell-type'))
  const x = parseInt(this.getAttribute('data-cell-x'))
  const y = parseInt(this.getAttribute('data-cell-y'))

  if(cellType === 0) {
    this.innerHTML = 1
    this.setAttribute('data-cell-type', 1)
    window.App.Board[x - 1][y - 1] = 1
  } else {
    this.innerHTML = 0
    this.setAttribute('data-cell-type', 0)
    window.App.Board[x - 1][y - 1] = 0
  }

  renderBoard(window.App.Board)
}
