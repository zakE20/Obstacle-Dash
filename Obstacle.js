import ObjetGraphique from "./ObjetGraphique.js";

export default class Obstacle extends ObjetGraphique {
    constructor(x, y, width, height) {
        super(x, y, width, height, "brown");
    }

    draw(ctx) {
        let gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y + this.height);
        gradient.addColorStop(0, "brown");
        gradient.addColorStop(1, "darkred");
    
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        for (let i = this.x; i < this.x + this.width; i += 20) {
            for (let j = this.y; j < this.y + this.height; j += 10) {
                ctx.strokeRect(i, j, 20, 10);
            }
        }
    }
    
}
