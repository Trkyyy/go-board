var boardElement = document.querySelector(".tenuki-board");

//localStorage.setItem("startPath", JSON.stringify([{y:3,x:15}, {pass:true}, {y:2,x:13}]));
//var game = new tenuki.Game({ element: boardElement }, localStorage);

var game = new tenuki.Game({ element: boardElement });

game.setAutoplay("black"); // AI is white

var controlElement = document.querySelector(".controls");
var controls = new ExampleGameControls(controlElement, game);
controls.setup();

game.callbacks.postRender = function(game) {
  controls.updateStats();
};

document.addEventListener("keydown",  function (e) {
      //if (e.keyCode == 82) { // r pressed
      if (e.keyCode == 69) { // e pressed
        controls.reset(e);
      }
      else if (e.keyCode == 27) { // enter pressed
        controls.reset(e);
      }
   }, false);