export default class Collisions {
    static checkCollision(obj1, obj2) {
        return (
            obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.y + obj1.height > obj2.y
        );
    }

    static checkCollisions(player, obstacles) {
        for (let obs of obstacles) {
            if (this.checkCollision(player, obs)) {
                console.log("Collision détectée !");
                
                let audio = new Audio("failure.mp3");
                audio.play();

                if (navigator.vibrate) {
                    navigator.vibrate(200); // Vibration pendant 200ms
                }

                return true;
            }
        }
        return false;
    }
}
