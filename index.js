import Game from "./Game.js";

let canvas = document.getElementById("gameCanvas");
canvas.width = 600;
canvas.height = 600;
canvas.style.backgroundColor = "red";

let game = new Game(canvas);
game.start();
