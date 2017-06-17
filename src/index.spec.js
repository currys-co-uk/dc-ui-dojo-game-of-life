import { arrayify } from './helpers';

import { createTable,removeTable,setColor } from './index';

let assert = require('assert');

describe('createTable', () => {
    before(function() {
        let fixture = '<div id="game">' +
            '</div>';

        document.body.insertAdjacentHTML(
            'afterbegin',
            fixture);

        const array = arrayify(`
      0000 0000
      0000 0000
      0000 0000
      0000 0000
    `);

        createTable(array);
    });

    it('Array has same number of rows as game board', () => {
        const array = arrayify(`
      0000 0000
      0000 0000
      0000 0000
      0000 0000
    `);
        const table = document.getElementsByTagName('tr');

        assert.equal(array.length, table.length);
    });

    it('Array has same number of cells as game board', () => {
        const array = arrayify(`
      0000 0000
      0000 0000
      0000 0000
      0000 0000
    `);
        const td = document.getElementsByTagName('td');

        assert.equal(array.length*array[0].length, td.length);
    });
});

describe('removeTable', () => {
    before(function() {
        let fixture = '<div id="game">' +
            '</div>';

        document.body.insertAdjacentHTML(
            'afterbegin',
            fixture);

        const array = arrayify(`
      0000 0000
      0000 0000
      0000 0000
      0000 0000
    `);
    });

    it('Remove table from document', () => {
        removeTable();

        assert.equal(document.getElementsByTagName('table').length, 0);
    });
});

describe('selectColor', () => {
    it('Select darker color', () => {
        assert.equal(setColor(1,1), '#949bf3');
    });
    it('Select brighter color', () => {
        assert.equal(setColor(4,-1), '#6d75d8');
    });
    it('Brightest color is #e4e6fc', () => {
        assert.equal(setColor(1,-1), '#e4e6fc');
    });
    it('Darkest color is #e4e6fc', () => {
        assert.equal(setColor(5,1), '#0c0d18');
    });
});