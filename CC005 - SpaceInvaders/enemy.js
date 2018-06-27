/*jshint esversion: 6 */

class Enemy {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.lives = 3;
        this.color = 255;
        this.width = 40;
        this.height = 30;
        this.dirRight = 1;
        this.alive = true;
    }

    move(dir) {
        this.pos.x += dir;
    }

    update(down) {
        if (this.pos.y > 3 * height / 4) {
            console.log(this.pos.y);
            console.log("END");
            noLoop();
        }

        if (down) {
            this.pos.y += 50;
            this.dirRight *= -1;
        } else {
            this.pos.x += 50 * this.dirRight;
        }

    }

    draw() {
        fill(this.color, 255, 255);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.width, this.height);
        fill(255);
        point(this.pos.x, this.pos.y);
    }
}