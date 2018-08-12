/*jshint esversion: 6*/

class Particle {
    constructor(x, y, size, color, options) {
        this.color = color;
        this.body = Bodies.circle(x, y, size, options);
        this.size = size;
        World.add(engine.world, this.body);
    }

    show() {
        fill(this.color);
        noStroke();
        let pos = this.body.position;

        push();
        translate(pos.x, pos.y);
        ellipse(0, 0, this.size * 2);
        pop();
    }

    isOffScreen() {
        let x = this.body.position.x,
            y = this.body.position.y;
        return (x < -50 || x > width + 50 || y > height + 100);
    }
}

class Plinko extends Particle {
    constructor(x, y, size) {
        let options = {
            isStatic: true,
            restitution: 0.5,
            friction: 0,
            density: 1
        };
        super(x, y, size, color('white'), options);


    }
    isOffScreen() {
        return false;
    }
}

class Box {
    constructor(x, y, width, height, color) {
        let options = {
            isStatic: true
        };

        this.color = color;
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.width = width;
        this.height = height;
        World.add(engine.world, this.body);
    }

    show() {
        fill(this.color);
        noStroke();
        let pos = this.body.position;

        push();
        translate(pos.x, pos.y);
        rectMode(CENTER);
        rect(0, 0, this.width, this.height);
        pop();
    }

    isOffScreen() {
        return false;
    }
}