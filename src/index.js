import gameOfLife from './gameOfLife';
import { arrayify } from './helpers';

const inputBoard = arrayify(`
      1010
      0100
      1010
    `);

window.addEventListener('load', () => {
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    const step = document.getElementById('step');
    let iter;
    let newArray = arrayify(`
      0010 0100
      0100 0110
      0011 1000
      0000 0110
    `);

    createTable(newArray);

    start.addEventListener('click', () => {
        iter = setInterval(() => {
            newArray = gameOfLife(newArray);
            updateTable(newArray);
        }, 500);
    });

    stop.addEventListener('click', () => {
        clearInterval(iter);
    });

    step.addEventListener('click', () => {
        newArray = gameOfLife(newArray);
        updateTable(newArray);
    });

});

function updateTable(array) {
    for (let i = 0; i < array.length; i += 1) {
        for (let j = 0; j < array[i].length; j += 1) {
            const tr = document.getElementsByTagName('tr')[i];
            const td = tr.children[j];
            if (array[i][j] === '1') {
                td.style.background = '#000';
            } else {
                td.style.background = '#fff';
            }
        }
    }
}

function createTable(array) {
    const board = document.createElement('table');
    const tbody = document.createElement('tbody');
    const game = document.getElementById('game');

    board.setAttribute('border', '1');
    for (let i = 0; i < array.length; i += 1) {
        const tr = document.createElement('tr');
        for (let j = 0; j < array[i].length; j += 1) {
            const td = document.createElement('td');
            if (array[i][j] === '1') {
                td.style.background = '#000';
            }
            td.appendChild(document.createTextNode('\u0020'));
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    board.appendChild(tbody);
    game.appendChild(board);
}

