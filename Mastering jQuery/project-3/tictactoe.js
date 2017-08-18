(function($) {
  let cells = $('[data-square]');
  const wins = [
    ['a1', 'b1', 'c1'],
    ['a2', 'b2', 'c2'],
    ['a3', 'b3', 'c3'],
    ['a1', 'a2', 'a3'],
    ['b1', 'b2', 'b3'],
    ['c1', 'c2', 'c3'],
    ['a1', 'b2', 'c3'],
    ['a3', 'b2', 'c1']
  ];

  cells.on('click', addX);

  $('.ttt_start-btn').on('click', resetGame);

  function addX(e) {
    if (!$(e.target).hasClass('occupied')) {
      $(e.target).html('<img src="img/X.png" class="ttt_piece">').addClass('occupied x');
      $('.ttt_piece').fadeIn(150);
      let status = checkWin();
      if (status.winner === undefined) {
        addO();
      } else {
        callWin(status);
      }
    }
  }

  function addO() {
    let l = cells.filter(':not(.occupied)').length;
    let r = Math.floor(Math.random() * l);
    cells.filter(':not(.occupied)').eq(r).html('<img src="img/O.png" class="ttt_piece">').addClass('occupied o');
    $('.ttt_piece').fadeIn(300);
    let status = checkWin();
    if (status.winner !== undefined) {
      callWin(status);
    }
  }

  function checkWin() {
    let X = $('.x');
    let O = $('.o');
    let xSq = [];
    let oSq = [];
    let win = {};
    win.winner = undefined;
    X.each(index => xSq.push(X[index].dataset.square));
    O.each(index => oSq.push(O[index].dataset.square));
    $(wins).each(index => {
      let x = xSq.sort();
      let o = oSq.sort();
      let xWin = wins[index].map(item => x.indexOf(item)).indexOf(-1) === -1;
      let oWin = wins[index].map(item => o.indexOf(item)).indexOf(-1) === -1;
      if (xWin) {
        win.index = index;
        win.winner = 'You';
      }
      if (oWin) {
        win.index = index;
        win.winner = 'Computer';
      }
    });
    return win;
  }

  function callWin(s) {
    $('.ttt_game-board').css({'pointer-events':'none'});
    $('.ttt_start-btn').addClass('reset');
    s.winner === 'You' ? $('.ttt_title').text(`${s.winner} beat the Computer!`) : $('.ttt_title').html(`The ${s.winner} wins again! <span class="dis">(seriously??)</span>`);
    switch (s.index) {
    case 0:
      $('.__horiz').removeClass('__is-hidden').css({ 'top': '30%' });
      break;
    case 1:
      $('.__horiz').removeClass('__is-hidden').css({ 'top': '50%' });
      break;
    case 2:
      $('.__horiz').removeClass('__is-hidden').css({ 'top': '69%' });
      break;
    case 3:
      $('.__vert').removeClass('__is-hidden').css({ 'left': '29%' });
      break;
    case 4:
      $('.__vert').removeClass('__is-hidden').css({ 'left': '50%' });
      break;
    case 5:
      $('.__vert').removeClass('__is-hidden').css({ 'left': '70%' });
      break;
    case 6:
      $('.__diag__top-left').removeClass('__is-hidden');
      break;
    case 7:
      $('.__diag__top-right').removeClass('__is-hidden');
      break;
    default:
      console.log('win!');
    }
  }

  function resetGame() {
    cells.html('').removeClass();
    $('.ttt_win').filter(':not(".__is-hidden")').addClass('__is-hidden');
    $('.ttt_game-board').removeAttr('style');
    $('.ttt_start-btn').removeClass('reset');
    $('.ttt_title').text('Play some Tic Tac Toe!');
    $('.__is-hidden').removeAttr('style');
  }
})(jQuery);

