export default function initializeConstants() {
  const rows = 10
  const cells = 10

  window.App = {}
  window.App.Board = []

  for (let i = 0; i < rows; i++) {
    window.App.Board.push([])

    for (let j = 0; j < cells; j++) {
      window.App.Board[i].push(0)
    }
  }
}
