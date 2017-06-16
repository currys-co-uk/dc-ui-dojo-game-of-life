import gameOfLife from './gameOfLife';
import { arrayify } from './helpers';

window.addEventListener('load', () => {
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    const step = document.getElementById('step');
    const popUp = document.getElementById('pop-up');
    const newBoard = document.getElementById('new-board');
    const random = document.getElementById('random');
    let mouseIsDown = false;
    let iter;
    let array = arrayify(`
      0010 0100
      0100 0110
      0011 1000
      0000 0110
    `);

    createTable(array);

    start.addEventListener('click', () => {
        iter = setInterval(() => {
            array = gameOfLife(array);
            updateTable(array);
        }, 500);
    });

    stop.addEventListener('click', () => {
        clearInterval(iter);
    });

    step.addEventListener('click', () => {
        array = gameOfLife(array);
        updateTable(array);
    });

    popUp.addEventListener('click', () => {
        openModal();
    });

    newBoard.addEventListener('click', () => {
        array = setNewArray();
    });

    random.addEventListener('click', () => {
        let newArray = createRandomArray(array);
        removeTable();
        createTable(newArray);
    });

    function draw(e) {
        if (mouseIsDown === false) {
            return;
        } else {
            const target = e.target;
            if(target.nodeName === 'TD') {
                const cellIndex = target.cellIndex;
                const rowIndex = target.parentNode.rowIndex;
                target.style.background = '#000';
                array[rowIndex][cellIndex] = '1';
            }
        }
    }

    window.addEventListener('mousedown', function (e) {
        mouseIsDown = true;
        draw(e);
        console.log(mouseIsDown);
    });
    window.addEventListener('mouseup', function () { mouseIsDown = false; });
    window.addEventListener('mousemove', draw);

});

/**
 * Fill array with random values
 * @param {Array} array Previous array
 * @return {Array} array Array filled with new values
 */
function createRandomArray(array) {
    for (let i = 0; i < array.length; i += 1) {
        for (let j = 0; j < array[i].length; j += 1) {
            array[i][j] = Math.round(Math.random()).toString();
        }
    }

    return array;
}

/**
 * Opens New Board dialog
 */
function openModal(){
    const modal = document.getElementsByClassName('modal__wrap')[0];

    modal.className += ' open';
}
/**
 * Updates 2D table with new array
 * @param {Array} array New recounted array
 */
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
/**
 * Creates table and appends it to #game
 * @param {Array} array
 */
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
/**
 * Creates 2D array filled with nulls
 * @param {Number} x Number of rows
 * @param {Number} y Number of cols
 * @return {Array} array
 */
function empty2dArray(x,y){
    let array = new Array(x);
    for (let i = 0; i < x; i++) {
        array[i] = new Array(y).fill(0);
    }
    return array;
}
/**
 * Clear shown table
 */
function removeTable(){
    const oldTable = document.getElementsByTagName("table")[0];
    oldTable.remove();
}

/**
 * Creates a new array
 * @return {Number} array New empty board and array with set cols and rows
 */
function setNewArray(){
    const x = parseInt(document.getElementsByClassName("modal__input")[0].value);
    const y = parseInt(document.getElementsByClassName("modal__input")[1].value);
    const modal = document.getElementsByClassName("modal__wrap")[0];
    let array = [];

    // Check input range
    if(x<3 || x>20 || y<3 || y>20){
        alert("Range should be from 3 to 20");
        return 0;
    }

    array = empty2dArray(x,y);
    removeTable();
    createTable(array);
    modal.classList.remove("open");

    return array;
}