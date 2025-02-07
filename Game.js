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
            alert("Bravo ! Niveau suivant !");
            
            // Réinitialiser la position du joueur
            this.player.x = 50;
            this.player.y = 50;
    
            // 🔄 Réinitialiser les touches de mouvement
            this.inputStates = {
                ArrowLeft: false,
                ArrowRight: false,
                ArrowUp: false,
                ArrowDown: false,
            };
    
            // Charger un nouveau niveau (ajouter de nouveaux obstacles, modifier la map, etc.)
            this.loadNextLevel();
        }
    }
    
    loadNextLevel() {
        // Ici, tu peux modifier les obstacles pour chaque niveau
        this.obstacles = [
            new Obstacle(100, 200, 150, 40),
            new Obstacle(300, 400, 120, 50),
            new Obstacle(400, 250, 80, 30)
        ];
    
        this.objetsGraphiques = [this.player, this.exit, ...this.obstacles];
    }
    
}
