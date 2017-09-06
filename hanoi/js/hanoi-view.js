class View {
  constructor(hanoiGame,dom) {
    this.hanoiGame = hanoiGame;
    this.dom = dom;
    this.setupTowers();
    this.render();
    this.firstClick = null;
    this.secondClick = null;
    this.clickTowerBind();
    this.gameisOver = false;
  }

  setupTowers() {
    $(this.dom).prepend("<div class=\"towers\"></div>");
    const towersEl = $("div.towers");
    for(let i = 0; i < 3; i++){
        towersEl.append("<ul></ul>")
    }

    $("ul").each(function (index, el) {
        $(el).data("index",index);
    });
  }

  render() {
    $("li").remove();
    this.hanoiGame.towers.forEach(function(tower, index, towers){
      let numDiscs = tower.length;
      let $uls = $("ul");
      for(let i = 0; i< numDiscs; ++i){
        let currUl = $uls.eq(index);
        $(currUl).append(`<li class=disc${tower[i]}></li>`);
      }
    });
    if (this.gameisOver){
      $(this.dom).prepend("<marquee> <h1 class =win>CONGRATULATIONS </h1> </marquee>")
    }
  }

  clickTowerBind() {
    let view = this;
      $("ul").on("click",function () {
        if (view.gameisOver) return;
        console.log(view.firstClick);
          if (view.firstClick === null) {
            view.firstClick = $(this).data("index");
            $(this).toggleClass("high");
            console.log(view.firstClick);
          }
          else{
            $("ul").eq(view.firstClick).toggleClass("high");
            view.secondClick = $(this).data("index");
            view.hanoiGame.move(view.firstClick, view.secondClick);
            if (view.hanoiGame.isWon()){
              view.gameisOver = true;

            }

            view.firstClick = null;
            view.secondClick = null;
            view.render();

          }
      });
  }
}

module.exports = View;
