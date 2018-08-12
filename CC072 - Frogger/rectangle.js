/*jshint esversion: 6*/

class Rectangle {

    constructor(x, y, w, h, color) {

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.borders();

        this.color = color;

        this.xSpeed = 0;
        this.ySpeed = 0;

        this.initX = x;
        this.initY = y;
    }

    borders() {
        this.left = this.x - this.w / 2;
        this.right = this.x + this.w / 2;
        this.top = this.y - this.h / 2;
        this.bottom = this.y + this.h / 2;
    }

    intersect(body) {

        return !(this.right < body.left ||
            this.left > body.right ||
            this.top > body.bottom ||
            this.bottom < body.top);
    }

    show() {
        rectMode(CENTER);
        fill(this.color);
        rect(this.x, this.y, this.w, this.h);
    }

    applySpeed(xSpeed, ySpeed) {
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }

    update() {
        let incX = this.xSpeed,
            incY = this.ySpeed;

        this.move(incX, incY);

    }

    move(incX, incY) {
        this.x += incX;
        this.left += incX;
        this.right += incX;

        this.y += incY;
        this.top += incY;
        this.bottom += incY;

    }

    outOfScreen() {

        if (this.left > width + this.w ||
            this.right < 0 - this.w ||
            this.bottom > height + this.h ||
            this.top < 0 - this.h) {
            this.reset();
            return true;
        }
        return false;
    }

    reset() {
        if (this.xSpeed > 0) {
            this.x = -this.w;
        } else if (this.xSpeed == 0) {
            this.x = this.initX;
        } else {
            this.x = width + this.w;
        }
        this.y = this.initY;
        this.borders();
    }
}