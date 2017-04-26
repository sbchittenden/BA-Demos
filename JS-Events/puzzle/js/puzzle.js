var body = document.querySelector('body');
var board = document.querySelector('.jp_puzzle-board');
var tray = document.querySelector('.jp_puzzle-tray');
var startBtn = document.querySelector('.jp_start-button');
var startModal = document.querySelector('.jp_initial-modal');
var hintBtn = document.querySelector('.jp_hint-button');
var resetBtn = document.querySelector('.jp_reset-button');
var tryAgainBtn = document.querySelector('.jp_try-again-button');
var timer = document.querySelector('.jp_puzzle-timer h1');
var timerMins = document.getElementById('t-minutes');
var timerSecs = document.getElementById('t-seconds');
var failModal = document.querySelector('.fail-modal');
var level = 4;
var hintsRemaining = 5;
var nope = new Audio('sfx/nope.wav');
var yep = new Audio('sfx/yep.wav');
var happySong = new Audio('sfx/celebrate.mp3');
var fail = new Audio('sfx/fail.wav');
var lastTen = new Audio('sfx/lastTen.wav');
var timerInterval;

startModal.addEventListener('click', setDifficulty, false);
startBtn.addEventListener('click', startPuzzle, false);
hintBtn.addEventListener('mousedown', showHintImg, false);
hintBtn.addEventListener('mouseup', hideHintImg, false);
resetBtn.addEventListener('click', resetPuzzle, false);
tryAgainBtn.addEventListener('click', tryAgain, false);

function startPuzzle() {
  var numOfMins = parseInt(level);
  timerMins.innerText = level;
  initiatePuzzle();
  hideModal();
  scrambleBoard();
  startTimer(numOfMins);
}

function hideModal() {
  startModal.classList.add('--hidden');
}

function showModal() {
  startModal.classList.remove('--hidden');
}

function setDifficulty(e) {
  if (e.target.tagName === 'SPAN') {
    level = e.target.dataset.level;
    timerMins.innerText = level;
    if (level === '2') {
      hintBtn.classList.add('--is-disabled');
    } else if (hintBtn.classList.contains('--is-disabled')) {
      hintBtn.classList.remove('--is-disabled');
    }
  }
}

function initiatePuzzle() {
  board.addEventListener('dragover', puzzleBoardDragOver, false);
  board.addEventListener('drop', puzzleBoardDrop, false);
}

function pieceDragStart(e) {
  console.log(e);
  e.dataTransfer.setData('text', e.target.id);
  e.dataTransfer.effectAllowed = 'move';
}

function puzzleBoardDrop(e) {
  e.preventDefault();
  console.log(e.target);
  var data = e.dataTransfer.getData('text');
  var dropzoneID = e.target.dataset.dropPosition;
  if (dropzoneID === data) {
    var droppedPiece = document.getElementById(data);
    droppedPiece.style = '';
    droppedPiece.classList.add('placed');
    e.target.appendChild(droppedPiece);
    yep.play();
    console.log(tray.children.length);
    if (tray.children.length === 0) {
      console.log('solved');
      stopTimer();
      happySong.play();
      setTimeout(celebrate, 3000);
    }
  } else {
    nope.play();
  }
}

function puzzleBoardDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function scrambleBoard() {
  var pieces = document.querySelectorAll('.jp_puzzle-piece');
  var i;
  for (i = 0; i < pieces.length; i++) {
    var clone = pieces[i].cloneNode();
    clone.addEventListener('dragstart', pieceDragStart, false);
    clone.style.top = Math.round(Math.random() * 50) + '%';
    clone.style.left = Math.round(Math.random() * 720) + 10 + 'px';
    pieces[i].remove();
    tray.appendChild(clone);
  }
}

function resetPuzzle() {
  timerMins.innerHTML = '0';
  timerSecs.innerHTML = '00';
  hintsRemaining = 5;
  hintBtn.classList.remove('--is-disabled');
  if (board.classList.contains('--celebration')) {
    board.classList.remove('--celebration');
  }
  if (timer.classList.contains('--is-critical')) {
    timer.classList.remove('--is-critical');
  }
  timer.className = 'jp_puzzle-timer --is-default';
  stopTimer();
  solvePuzzle();
  showModal();
}

function tryAgain() {
  failModal.classList.remove('--is-active');
  failModal.parentElement.classList.remove('--is-visible');
  resetPuzzle();
}

function solvePuzzle() {
  var piecesInTray = Array.prototype.slice.call(tray.querySelectorAll('.jp_puzzle-piece'));
  var dropzones = Array.prototype.slice.call(document.querySelectorAll('.puzzle-piece-drop-zone'));
  var sortedTray = piecesInTray.sort(function(a, b) {
    return a.id - b.id;
  });
  for (var i = 0; i < sortedTray.length; i++) {
    for (var k = 0; k < dropzones.length; k++) {
      if (sortedTray[i].id == dropzones[k].dataset.dropPosition) {
        sortedTray[i].style = '';
        dropzones[k].appendChild(sortedTray[i]);
      }
    }
  }
}

function showHintImg() {
  if (hintsRemaining > 0) {
    board.classList.add('--hinted');
  }
}

function hideHintImg() {
  board.classList.remove('--hinted');
  hintsRemaining -= 1;
  if (hintsRemaining === 0) {
    hintBtn.classList.add('--is-disabled');
  }
}

function stopTimer() {
  clearInterval(timerInterval);
}

function startTimer(numOfMins) {
  var startTime = new Date().getMinutes();
  var newMins = new Date().setMinutes(startTime + numOfMins);
  var endTime = new Date(newMins);
  timerInterval = setInterval(function() {
    var time = countdown(endTime);
    // console.log(time.minutes + ':' + time.seconds);
    timerMins.innerHTML = time.minutes;
    timerSecs.innerHTML = ('0' + time.seconds).slice(-2);
    if (time.total > 30000) {
      timer.classList.add('--is-safe');
    }
    if (time.total === 30000) {
      timer.classList.remove('--is-safe');
      timer.classList.add('--is-warning');
    }
    if (time.total <= 10000) {
      timer.classList.remove('--is-warning');
      timer.classList.add('--is-critical');
      lastTen.play();
    }
    if (time.total <= 0) {
      clearInterval(timerInterval);
      if (tray.children.length > 0) {
        console.log('FAIL!');
        failModal.classList.add('--is-active');
        failModal.parentElement.classList.add('--is-visible');
        fail.play();
        endTheParty();
        tryAgainBtn.addEventListener('click', tryAgain, false);
        // resetPuzzle();
      }
    }
  }, 1000);
}

function countdown(endTime) {
  var total = Date.parse(endTime) - Date.parse(new Date());
  var seconds = Math.floor((total / 1000) % 60);
  var minutes = Math.floor((total / 1000 / 60) % 60);
  return {
    'total': total,
    'minutes': minutes,
    'seconds': seconds
  };
}

function celebrate() {
  var celebrationPieces = Array.prototype.slice.call(document.querySelectorAll('.placed'));
  // var celebrationPieces = Array.prototype.slice.call(document.querySelectorAll('.jp_puzzle-piece'));
  board.classList.add('--celebration');
  celebrationPieces.forEach(function(p, i) {
    setTimeout(function() {
      p.classList.add('--is-celebrating-x');
    }, i * 69);
  });
  setTimeout(function() {
    endTheParty();
    resetPuzzle();
  }, 8000);
}

function endTheParty() {
  var celebrationPieces = Array.prototype.slice.call(document.querySelectorAll('.jp_puzzle-piece'));
  celebrationPieces.forEach(function(p) {
    if (p.classList.contains('--is-celebrating-x')) {
      p.classList.remove('--is-celebrating-x');
    }
    if (p.classList.contains('placed')) {
      p.classList.remove('placed');
    }
  });
}

