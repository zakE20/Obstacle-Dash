import ObjetGraphique from "./ObjetGraphique.js";

export default class Enemy extends ObjetGraphique {
    constructor(x, y, speed = 1) {
        super(x, y, 30, 30, "red");  
        this.speed = speed;  // Vitesse de l'ennemi
    }

    moveTowards(player) {
        let dx = player.x - this.x;
        let dy = player.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "brown";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
        ctx.fill();
    }
}
