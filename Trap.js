import ObjetGraphique from "./ObjetGraphique.js";

export default class Trap extends ObjetGraphique {
    constructor(x, y, width, height) {
        super(x, y, width, height, "red");
    }

    draw(ctx) {
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
