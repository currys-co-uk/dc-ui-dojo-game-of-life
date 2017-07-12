import gameOfLife from './gameOfLife';
import initializeConstants from './initializeConstants';
import renderBoard from './board/renderBoard';

document.addEventListener('DOMContentLoaded', function() {
  initializeConstants()

  renderBoard(window.App.Board)

  renderStartButton()

  document.getElementById('start-button').addEventListener('click', function() {
    startLife()
  })
}, false);

function renderStartButton() {
  const startButton = document.createElement('button')
  startButton.id = 'start-button'
  startButton.className = 'noselect'
  startButton.type = 'button'
  startButton.innerHTML = 'START'

  document.getElementById('app').appendChild(startButton)
}

function startLife() {
  const timer = setInterval(function() {
    const oldBoard = window.App.Board
    const newBoard = gameOfLife(window.App.Board)

    if(JSON.stringify(oldBoard) !== JSON.stringify(newBoard)) {
      window.App.Board = newBoard
      renderBoard(window.App.Board)
    } else {
      clearInterval(timer)
    }
  }, 200)
}
