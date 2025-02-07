import Player from "./Player.js";
import Obstacle from "./Obstacle.js";
import Exit from "./Exit.js";
import Collisions from "./Collisions.js";

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.inputStates = {
            ArrowLeft: false,
            ArrowRight: false,
            ArrowUp: false,
            ArrowDown: false,
        };

        this.objetsGraphiques = [];

        this.init();
    }

    init() {
        // Création du joueur
        this.player = new Player(50, 50);
        this.objetsGraphiques.push(this.player);

        // Création des obstacles
        this.obstacles = [
            new Obstacle(200, 300, 100, 50),
            new Obstacle(350, 200, 80, 40)
        ];
        this.objetsGraphiques.push(...this.obstacles);

        // Création de la sortie
        this.exit = new Exit(550, 550);
        this.objetsGraphiques.push(this.exit);

        // Écoute des événements clavier
        window.addEventListener("keydown", (e) => this.handleKey(e, true));
        window.addEventListener("keyup", (e) => this.handleKey(e, false));

        console.log("Game initialisé");
    }

    start() {
        console.log("Game démarré");
        requestAnimationFrame(this.mainLoop.bind(this));
    }

    mainLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(this.mainLoop.bind(this));
    }

    update() {
        this.movePlayer();
        this.checkWin();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.objetsGraphiques.forEach(obj => obj.draw(this.ctx));
    }

    handleKey(event, isPressed) {
        if (event.key in this.inputStates) {
            this.inputStates[event.key] = isPressed;
        }
    }

    movePlayer() {
        let oldX = this.player.x;
        let oldY = this.player.y;

        if (this.inputStates.ArrowLeft) this.player.x -= this.player.speed;
        if (this.inputStates.ArrowRight) this.player.x += this.player.speed;
        if (this.inputStates.ArrowUp) this.player.y -= this.player.speed;
        if (this.inputStates.ArrowDown) this.player.y += this.player.speed;

        // Vérifier les collisions avec les obstacles
        if (Collisions.checkCollisions(this.player, this.obstacles)) {
            this.player.x = oldX;
            this.player.y = oldY;
        }
    }

    checkWin() {
        let dx = this.player.x - this.exit.x;
        let dy = this.player.y - this.exit.y;
        
        if (Math.sqrt(dx * dx + dy * dy) < 20) {
            let audio = new Audio("bravo.mp3");
            audio.play();
            
            alert("Bravo ! Niveau suivant !");
            this.player.x = 50;
            this.player.y = 50;
            this.inputStates = { ArrowLeft: false, ArrowRight: false, ArrowUp: false, ArrowDown: false };
            this.loadNextLevel();
        }
    }
    
    
    loadNextLevel() {
        this.level = (this.level || 1) + 1; // Augmenter le niveau
    
        // Augmenter la vitesse du joueur légèrement à chaque niveau
        this.player.speed += 0.5;
    
        // Ajouter plus d'obstacles à chaque niveau
        this.obstacles = [];
        for (let i = 0; i < this.level + 2; i++) { // Plus d'obstacles avec le niveau
            let x = Math.random() * (this.canvas.width - 100);
            let y = Math.random() * (this.canvas.height - 100);
            let width = Math.random() * 80 + 20; // Taille aléatoire
            let height = Math.random() * 60 + 20;
            this.obstacles.push(new Obstacle(x, y, width, height));
        }
    
        this.objetsGraphiques = [this.player, this.exit, ...this.obstacles];
    
        console.log(`Niveau ${this.level} chargé !`);
    }
    
}
