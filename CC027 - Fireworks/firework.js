const states = { RISING: 0, EXPLODING: 1, DISAPPEAR: 2 };

class Firework {
    constructor(x, y, vel) {
        this.particles = new Array();
        this.colorR = random(0, 255);
        this.colorG = random(0, 255);
        this.colorB = random(0, 255);
        this.colorA = 255;

        let initVel;
        if (vel) {
            initVel = vel;
        } else {
            initVel 
            = createVector(0, random(-10, -6));
        }

        let mainP = new Particle(x, y, initVel);
        this.particles.push(mainP);

        this.state = states.RISING;

    }

    applyForce(force) {

        this.particles.forEach(element => {
            element.applyForce(force);
        });
    }

    update() {
        this.particles.forEach(element => {
            element.update();
        });

        let mainP = this.particles[0];
        if (this.state == states.RISING &&
            mainP.vel.y >= 0
        ) {

            this.state = states.EXPLODING;
            this.explode();
        }

        if (this.state == states.EXPLODING) {
            this.colorA -= 5;
        }

        if (this.colorA <= 0) {
            this.state = states.DISAPPEAR;
        }

    }

    show() {
        stroke(this.colorR, this.colorG, this.colorB, this.colorA);
        this.particles.forEach(element => {
            element.show();
        });


    }

    explode() {
        let numP = 50;

        let mainP = this.particles[0];
        this.particles = [];

        for (let angle = 0; angle <= Math.PI*2; angle = angle + Math.PI / numP) {
            let newP = new Particle(mainP.pos.x, mainP.pos.y);
            let rDisp = random(0, 1.5);

            let xVel = Math.cos(angle);
            let yVel = -Math.sin(angle);
            newP.vel = createVector(xVel*rDisp, yVel*rDisp);
            newP.applyForce(gravity);
            this.particles.push(newP);
        }
    }
}
