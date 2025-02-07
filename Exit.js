import ObjetGraphique from "./ObjetGraphique.js";

export default class Exit extends ObjetGraphique {
    constructor(x, y) {
        super(x, y, 30, 50, "gold");
    }

    draw(ctx) {
        // Dessiner la coupe
        ctx.fillStyle = "gold";
        ctx.beginPath();
        ctx.arc(this.x + 15, this.y + 10, 15, Math.PI, 0, false);
        ctx.fill();
        ctx.closePath();

        // Dessiner les anses
        ctx.strokeStyle = "gold";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(this.x - 5, this.y + 15, 10, Math.PI / 2, -Math.PI / 2, true);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.x + 35, this.y + 15, 10, -Math.PI / 2, Math.PI / 2, true);
        ctx.stroke();

        // Dessiner la tige
        ctx.fillRect(this.x + 10, this.y + 25, 10, 20);

        // Dessiner le socle
        ctx.fillStyle = "darkgoldenrod";
        ctx.fillRect(this.x, this.y + 45, 30, 10);
    }
}
