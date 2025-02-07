import ObjetGraphique from "./ObjetGraphique.js";

export default class Obstacle extends ObjetGraphique {
    constructor(x, y, width, height) {
        super(x, y, width, height, "brown");
    }

    draw(ctx) {
        ctx.fillStyle = "saddlebrown";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Ajout d'un effet "brique"
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        
        for (let i = this.x; i < this.x + this.width; i += 20) {
            for (let j = this.y; j < this.y + this.height; j += 10) {
                ctx.strokeRect(i, j, 20, 10);
            }
        }
    }
}
