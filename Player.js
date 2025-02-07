import ObjetGraphique from "./ObjetGraphique.js";
import { drawCircleImmediat } from "./utils.js";

export default class Player extends ObjetGraphique {
    constructor(x, y) {
        super(x, y, 20, 50, "blue");
        this.speed = 5;
    }

    draw(ctx) {
        drawCircleImmediat(ctx, this.x, this.y, 15, "blue");

        ctx.fillStyle = "blue";
        ctx.fillRect(this.x - 5, this.y + 15, 10, 25);
        ctx.fillRect(this.x - 15, this.y + 15, 10, 20);
        ctx.fillRect(this.x + 5, this.y + 15, 10, 20);
        ctx.fillRect(this.x - 5, this.y + 40, 10, 15);
        ctx.fillRect(this.x + 5, this.y + 40, 10, 15);
    }
}
