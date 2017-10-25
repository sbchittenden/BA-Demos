'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Gameboard = function () {
  function Gameboard(dimension, cellSize) {
    _classCallCheck(this, Gameboard);

    this.dimension = dimension;
    this.cellSize = cellSize;
    this.board = document.getElementById('gameboard');
    this.context = this.board.getContext('2d');
    this.cells = this.seedCells();
    this.canvasSize = this.dimension * this.cellSize;
    this.continueGame = true;
  }

  _createClass(Gameboard, [{
    key: 'setCanvasSize',
    value: function setCanvasSize() {
      this.board.setAttribute('width', this.dimension);
      this.board.setAttribute('height', this.dimension);
    }
  }, {
    key: 'seedCells',
    value: function seedCells() {
      var cells = {};
      for (var i = 0; i < this.dimension; i += this.cellSize) {
        for (var x = 0; x < this.dimension; x += this.cellSize) {
          var cell = new Cell(i, x, Math.round(Math.random()));
          cells['' + i + x] = cell;
        }
      }
      return cells;
    }
  }, {
    key: 'populateGrid',
    value: function populateGrid() {
      this.context.clearRect(0, 0, this.canvasSize, this.canvasSize);

      for (var key in this.cells) {
        var cell = this.cells[key];
        if (cell.alive === 1) {
          var x = cell.coordinates[0];
          var y = cell.coordinates[1];
          // cell color randomizer (sort of...)
          this.context.fillStyle = 'rgba(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 30) + ',' + Math.round(Math.random() * 100) + ', ' + Math.round(Math.random() * 100) + ')';
          this.context.fillRect(x, y, this.cellSize, this.cellSize);
        }
      }
    }
  }, {
    key: 'getCellNeighbors',
    value: function getCellNeighbors() {
      // var t0 = performance.now();

      for (var key in this.cells) {
        var cell = this.cells[key];
        var x = cell.coordinates[0];
        var y = cell.coordinates[1];
        cell.neighborTotal = 0;

        cell.neighbors.topLeft = this.cells['' + (x - this.cellSize) + (y - this.cellSize)];
        cell.neighbors.topMiddle = this.cells['' + (x - this.cellSize) + y];
        cell.neighbors.topRight = this.cells['' + (x - this.cellSize) + (y + this.cellSize)];
        cell.neighbors.middleLeft = this.cells['' + x + (y - this.cellSize)];
        cell.neighbors.middleRight = this.cells['' + x + (y + this.cellSize)];
        cell.neighbors.bottomLeft = this.cells['' + (x + this.cellSize) + (y - this.cellSize)];
        cell.neighbors.bottomMiddle = this.cells['' + (x + this.cellSize) + y];
        cell.neighbors.bottomRight = this.cells['' + (x + this.cellSize) + (y + this.cellSize)];
      }
      // var t1 = performance.now();
      // console.log("getting neighbors took " + (t1 - t0) + " milliseconds.");
    }
  }, {
    key: 'getNieghborStatus',
    value: function getNieghborStatus() {

      for (var key in this.cells) {
        var cell = this.cells[key];

        // reset total
        cell.neighborTotal = 0;
        for (var position in cell.neighbors) {
          if (position !== undefined) {
            var p = cell.neighbors[position];
            if (p !== undefined) {
              cell.neighborTotal += p.alive;
            }
          }
        }
      }
    }
  }, {
    key: 'updateLife',
    value: function updateLife() {

      // get next generation status
      for (var key in this.cells) {
        var cell = this.cells[key];
        // reset allFieldTotal
        cell.allFieldTotal = 0;
        cell.allFieldTotal = cell.alive + cell.neighborTotal;
      }

      // rules for cell state
      for (var _key in this.cells) {
        var _cell = this.cells[_key];
        var status = _cell.allFieldTotal;
        if (status === 3) {
          _cell.alive = 1;
        } else if (status !== 4) {
          _cell.alive = 0;
        }
      }
    }
  }, {
    key: 'iterateGeneration',
    value: function iterateGeneration() {
      if (this.continueGame === true) {
        this.updateLife();
        this.getNieghborStatus();
        this.populateGrid();
        window.requestAnimationFrame(this.iterateGeneration.bind(this));
      } else {
        return;
      }
    }
  }, {
    key: 'setUpBoard',
    value: function setUpBoard() {
      this.setCanvasSize();
      this.getCellNeighbors();
      this.getNieghborStatus();
      this.populateGrid();
    }
  }, {
    key: 'startGame',
    value: function startGame() {
      this.iterateGeneration();
    }
  }]);

  return Gameboard;
}(); // end of Gameboard class

var Cell = function Cell(x, y, alive) {
  _classCallCheck(this, Cell);

  this.coordinates = [x, y];
  this.alive = alive;
  this.neighbors = {};
  this.neighborTotal = 0;
};
'use strict';

(function () {

  var board = document.getElementById('gameboard');
  var startScreen = document.querySelector('.start-screen__wrapper');
  var initBtn = document.querySelector('.init-btn');
  var cellSize = document.getElementById('cell-size');
  var boardDim = document.getElementById('board-dimension');
  var startBtn = document.querySelector('.start-btn');
  var endBtn = document.querySelector('.end-btn');
  var resetBtn = document.querySelector('.reset-btn');
  var game = undefined;

  initBtn.addEventListener('click', initializeNewGame);
  startBtn.addEventListener('click', start);
  endBtn.addEventListener('click', endGame);
  resetBtn.addEventListener('click', resetGame);

  function initializeNewGame() {
    var d = parseInt(boardDim.value) || 500;
    var c = parseInt(cellSize.value) || 5;

    startScreen.classList.add('--is-hidden');
    startBtn.classList.remove('--is-hidden');
    board.classList.remove('--is-hidden');

    game = new Gameboard(d, c);

    game.setUpBoard();
    console.log(game);
  }

  function start() {
    startBtn.classList.add('--is-hidden');
    endBtn.classList.remove('--is-hidden');
    window.setTimeout(game.startGame(), 1000);
  }

  function endGame() {
    game.continueGame = false;
    endBtn.classList.add('--is-hidden');
    resetBtn.classList.remove('--is-hidden');
  }

  function resetGame() {
    game.context.clearRect(0, 0, game.canvasSize, game.canvasSize);
    game = undefined;
    boardDim.value = '';
    cellSize.value = '';
    resetBtn.classList.add('--is-hidden');
    startScreen.classList.remove('--is-hidden');
  }
})();