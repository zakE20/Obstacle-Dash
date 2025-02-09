import ObjetGraphique from "./ObjetGraphique.js";

export default class Bonus extends ObjetGraphique {
    constructor(x, y) {
        super(x, y, 20, 20, "green");
    }

    draw(ctx) {
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.moveTo(this.x + 10, this.y + 5);
        ctx.bezierCurveTo(this.x, this.y - 10, this.x - 20, this.y + 10, this.x + 10, this.y + 20);
        ctx.bezierCurveTo(this.x + 40, this.y + 10, this.x + 20, this.y - 10, this.x + 10, this.y + 5);
        ctx.fill();
    }
}
