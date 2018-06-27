/*jshint esversion: 6 */

class Block {
    constructor(x,y) {
        this.pos = createVector(x, y);
        this.width = 40;
        this.height = 10;
        this.color = random(255);
        this.alive  = true;
    }
    show() {
        fill(this.color, 255, 255);
        rect(this.pos.x - this.width / 2, this.pos.y - this.height / 2, this.width, this.height);
    }

    update() {

        balls.forEach(ball => {
            if (ball.intersect(this)) {
                ball.hitTop();
                this.alive = false;
            }  
        });


    }
}