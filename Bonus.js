import ObjetGraphique from "./ObjetGraphique.js";

export default class Bonus extends ObjetGraphique {
    constructor(x, y) {
        super(x, y, 20, 20, "green");
    }

    draw(ctx) {
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(this.x + 10, this.y + 10, 10, 0, Math.PI * 2);
        ctx.fill();
    }
}
