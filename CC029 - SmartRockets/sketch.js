/*jshint esversion: 6*/

var rockets;
var target;

const maxForce = 0.1;
const lifeSpan = 350;

var count;
var pool;

var lifeP;
var generation;
var genText;

function setup() {
    createCanvas(400, 300);
    background(55);
    ellipseMode(CENTER);
    lifeP = createP();
    target = {
        pos: createVector(width / 2, 50),
        size: 30,
        draw: function () {
            fill(color('magenta'));
            ellipse(this.pos.x, this.pos.y, this.size, this.size);
        }
    };

    let numR = 100;
    rockets = [];
    for (let i = 0; i < numR; i++) {
        let newRocket = new Rocket();
        rockets.push(newRocket);
    }

    generation = 1;
    genText = createP();
    genText.html(`Generation: ${generation}`);
    init();

}

function draw() {
    lifeP.html(count);

    if (count++ < lifeSpan) {
        background(55);

        target.draw();
        rockets.forEach(rocket => {
            rocket.draw();
            rocket.update();

        });
    } else {
        generation++;
        genText.html(`Generation: ${generation}`);

        evaluate();
        selectBestBrain();
        reset();
    }
}


function evaluate() {

    let maxFit = 0;
    rockets.forEach(rocket => {
        let newS = dist(rocket.pos.x, rocket.pos.y, target.pos.x, target.pos.y);
        let reached = (newS < target.size);
        rocket.score = map(newS, 0, width, width, 0);

        if (reached) {
            rocket.score *= 10;
        } else if (rocket.crashed) {
            rocket.score /= 10;
        }

        if (rocket.score > maxFit) {
            maxFit = rocket.score;
        }
    });
    console.log(maxFit);
    rockets.forEach(rocket => {
        rocket.score /= maxFit;
        console.log(rocket.score);
        for (let i = 0; i < Math.floor(rocket.score * 100); i++) {
            pool.push(rocket.brain);
        }
    });

    console.log(pool);


}

function selectBestBrain() {

    let newRockets = [];
    for (let i = 0; i < rockets.length; i++) {
        let parentA = random(pool);
        let parentB = random(pool);

        child = parentA.cross(parentB);
        child.mutate();

        newRockets[i] = new Rocket(child);
    }

    this.rockets = newRockets;

}




function reset() {

    init();
}

function init() {

    count = 0;
    pool = [];
}