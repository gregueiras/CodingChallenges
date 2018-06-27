/*jshint esversion: 6 */

class Bullet {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, -4);
        this.color = 305;
        this.width = 5;
        this.height = 20;
        this.inScreen = true;
    }

    update() {
        this.pos.add(this.vel);
        this.hit();

        if (this.pos.y < 0)
            this.inScreen = false;
    }

    draw() {
        fill(this.color, 24, 100);
        noStroke();
        rect(this.pos.x - this.width / 2, this.pos.y - this.height / 2, this.width, this.height);
    }

    hit() {
        enemies.forEach(enemy => {
            if (enemy.pos.x - enemy.width / 2 <= this.pos.x - this.width / 2 &&
                enemy.pos.x + enemy.width / 2 >= this.pos.x + this.width / 2 &&
                enemy.pos.y - enemy.height / 2 <= this.pos.y - this.height / 2 &&
                enemy.pos.y + enemy.height / 2 >= this.pos.y + this.height / 2) {
                enemy.alive = false;
                this.inScreen = false;
            }
        });
    }
}