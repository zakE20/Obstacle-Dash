import Player from "./Player.js";
import Obstacle from "./Obstacle.js";
import Exit from "./Exit.js";
import Collisions from "./Collisions.js";
import Trap from "./Trap.js";
import Bonus from "./Bonus.js";
import Enemy from "./Enemy.js";

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.lives = 3;  

        this.ctx = this.canvas.getContext("2d");

        this.inputStates = {
            ArrowLeft: false,
            ArrowRight: false,
            ArrowUp: false,
            ArrowDown: false,
        };

        this.level = 1;
        this.timeLeft = 30;
        this.timerInterval = null;

        this.objetsGraphiques = [];

        this.init();
    }

    init() {
        this.player = new Player(50, 50);
        this.exit = new Exit(550, 550);
        
        this.objetsGraphiques.push(this.player, this.exit);

        window.addEventListener("keydown", (e) => this.handleKey(e, true));
        window.addEventListener("keyup", (e) => this.handleKey(e, false));

        this.loadNextLevel();
    }

    demarrer() {
        this.startTimer();
        requestAnimationFrame(this.mainLoop.bind(this));
    }

    mainLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(this.mainLoop.bind(this));
    }

    mettreAJour() {
        this.movePlayer();
        this.checkWin();

        // Vérifier les collisions avec les pièges
        this.traps.forEach(trap => {
            if (Collisions.checkCollision(this.player, trap)) {
                this.timeLeft = Math.max(0, this.timeLeft - 3);
            }
        });

        // Vérifier les collisions avec les bonus (gagner une vie)
        this.bonuses.forEach((bonus, index) => {
            if (Collisions.checkCollision(this.player, bonus)) {
                if (this.lives < 3) {
                    this.lives++; 
                }
                this.bonuses.splice(index, 1); 
            }
        });

        this.enemies.forEach(enemy => {
            enemy.moveTowards(this.player);
            if (Collisions.checkCollision(this.player, enemy)) {
                this.lives--; // Perdre une vie
                if (this.lives <= 0) {
                    this.gameOver(); // Fin du jeu si toutes les vies sont perdues
                } else {
                    // Remettre le joueur au point de départ si une vie est perdue
                    this.player.x = 50;  
                    this.player.y = 50;
                    alert(`💔 Oups, il te reste ${this.lives} vies !`);
                }
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.objetsGraphiques.forEach(obj => obj.draw(this.ctx));

        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.fillText(`Temps: ${this.timeLeft}s`, 10, 30);

        for (let i = 0; i < this.lives; i++) {
            this.ctx.fillStyle = "green";  
            this.ctx.beginPath();
            this.ctx.moveTo(20 + i * 30, 50);
            this.ctx.bezierCurveTo(10 + i * 30, 30, 0 + i * 30, 50, 20 + i * 30, 70);
            this.ctx.bezierCurveTo(40 + i * 30, 50, 30 + i * 30, 30, 20 + i * 30, 50);
            this.ctx.fill();
        }

        let darkness = Math.min(0.1 * this.level, 0.5);
        this.ctx.fillStyle = `rgba(0, 0, 0, ${darkness})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    gererTouche(event, isPressed) {
        if (event.key in this.inputStates) {
            this.inputStates[event.key] = isPressed;
        }
    }

    deplacerJoueur() {
        let oldX = this.player.x;
        let oldY = this.player.y;

        if (this.inputStates.ArrowLeft) this.player.x -= this.player.speed;
        if (this.inputStates.ArrowRight) this.player.x += this.player.speed;
        if (this.inputStates.ArrowUp) this.player.y -= this.player.speed;
        if (this.inputStates.ArrowDown) this.player.y += this.player.speed;

        if (Collisions.checkCollisions(this.player, this.obstacles)) {
            this.player.x = oldX;
            this.player.y = oldY;
        }

        this.player.x = Math.max(0, Math.min(this.canvas.width - this.player.width, this.player.x));
        this.player.y = Math.max(0, Math.min(this.canvas.height - this.player.height, this.player.y));
    }

    obtenirPositionSecurisee(avoidX, avoidY, margin = 50) {
        let x, y;
        do {
            x = Math.random() * (this.canvas.width - 100);
            y = Math.random() * (this.canvas.height - 100);
        } while (Math.abs(x - avoidX) < margin && Math.abs(y - avoidY) < margin);
        return { x, y };
    }

    checkWin() {
        let dx = this.player.x - this.exit.x;
        let dy = this.player.y - this.exit.y;

        if (Math.sqrt(dx * dx + dy * dy) < 20) {
            let levelUpSound = document.getElementById("levelUpSound");

            levelUpSound.play().then(() => {
                alert("Bravo ! Niveau suivant !");
                this.loadNextLevel();
            }).catch(error => {
                console.error("Erreur lors de la lecture du son :", error);
                alert("Bravo ! Niveau suivant !");
                this.loadNextLevel();
            });
        }
    }

    startTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);

        this.timeLeft = Math.max(10, 30 - (this.level * 2));

        this.timerInterval = setInterval(() => {
            this.timeLeft--;

            if (this.timeLeft <= 0) {
                clearInterval(this.timerInterval);
                alert("Temps écoulé ! Game Over !");
                window.location.reload();
            }
        }, 1000);
    }

    gameOver() {
        clearInterval(this.timerInterval);

        let gameOverSound = document.getElementById("gameOverSound");
        if (gameOverSound) {
            gameOverSound.play();
        }

        alert("💀 GAME OVER ! Vous avez perdu toutes vos vies !");
        setTimeout(() => {
            window.location.reload();
        }, 5000);
    }

    loadNextLevel() {
        this.inputStates = {
            ArrowLeft: false,
            ArrowRight: false,
            ArrowUp: false,
            ArrowDown: false,
        };

        this.level++;
        this.canvas.width = Math.max(this.canvas.width * 0.9, 300);
        this.canvas.height = Math.max(this.canvas.height * 0.9, 300);

        this.player.x = 50;
        this.player.y = 50;

        this.player.speed = Math.min(this.player.speed + 0.5, 10);

        this.exit.x = Math.min(this.exit.x, this.canvas.width - 50);
        this.exit.y = Math.min(this.exit.y, this.canvas.height - 50);

        this.obstacles = [];
        for (let i = 0; i < this.level + 2; i++) {
            let pos = this.getSafePosition(this.player.x, this.player.y);
            this.obstacles.push(new Obstacle(pos.x, pos.y, 80, 40));
        }

        this.traps = [];
        for (let i = 0; i < this.level; i++) {
            let pos = this.getSafePosition(this.player.x, this.player.y);
            this.traps.push(new Trap(pos.x, pos.y, 40, 40));
        }

        this.bonuses = [];
        if (Math.random() > 0.5) {
            let pos = this.getSafePosition(this.player.x, this.player.y);
            this.bonuses.push(new Bonus(pos.x, pos.y));
        }

        this.enemies = [];
        let enemySpeed = 1 + this.level * 0.2; // Augmente progressivement
        for (let i = 0; i < this.level; i++) {
            let pos = this.getSafePosition(this.player.x, this.player.y);
            this.enemies.push(new Enemy(pos.x, pos.y, enemySpeed));
        }

        this.objetsGraphiques = [this.player, this.exit, ...this.obstacles, ...this.traps, ...this.bonuses, ...this.enemies];

        this.startTimer();
    }
}
