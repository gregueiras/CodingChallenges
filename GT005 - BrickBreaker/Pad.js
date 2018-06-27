/*jshint esversion: 6 */

class Pad {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.width = 40;
        this.height = 10;
        this.color = random(255);
    }
    show() {
        fill(this.color, 255, 255);
        rect(this.pos.x - this.width / 2, this.pos.y - this.height / 2, this.width, this.height);
    }

    move(key) {
        let step = 6;

        switch (key) {
            case LEFT_ARROW:
                if (this.pos.x - this.width / 2 > 0)
                    this.pos.x -= step;
                break;

            case RIGHT_ARROW:
            if (this.pos.x + this.width / 2 < width)
                this.pos.x += step;
                break;
            default:
                break;
        }
    }
}