/*jshint esversion: 6 */

class Ship {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.lives = 3;
        this.color = 120;
        this.width = 40;
        this.height = 30;
        this.fireRate = 15;
        this.lastShot = 0;
    }

    move(dir) {
        this.pos.x += dir;
    }

    shoot() {
        if (this.lastShot > this.fireRate) {
            let newBullet = new Bullet(this.pos.x, this.pos.y - this.height / 2);
            bullets.push(newBullet);
            this.lastShot = 0;

        }
    }

    draw() {
        fill(120, 100, 50);
        noStroke();
        rect(this.pos.x - this.width / 2, this.pos.y - this.height / 2, this.width, this.height);
        this.lastShot++;

    }
}