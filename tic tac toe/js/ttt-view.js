let Game = require('../solution/game.js');

class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    let view = this;
    $("li").on("click" ,function (event) {
      let pos = $(this).data("pos");
      if (view.game.board.isEmptyPos(pos)){
        view.game.playMove(pos);
        view.makeMove($(this.children[0]));
      }
      else{
        alert("Not a valid move");
      }
  });
}
  reset(){
    this.game = new Game();
    $("ul").remove();
    this.setupBoard();
    this.bindEvents();
  }

  makeMove($div) {
    $div.text(this.game.currentPlayer);
    if (this.game.winner() != null){
      alert(`${this.game.currentPlayer} wins`);
      this.reset();
    }
  }

  setupBoard() {
    this.$el.append($("<ul></ul>"));
    const ul = $("ul");
    for(let i = 0; i < 9; ++i){
      ul.append($("<li><div></div> </li>"));
    }
    let x = 0;
    let y= 0;
    $("li").each(function(index, el){
      let $el = $(el);
      $el.data("pos", [x,y] );

      x += 1;
      if(x === 3){
        x = 0;
        y ++;
      }
    });
  }
}

module.exports = View;
