/*jshint esversion: 6*/

let counter;
let counterP;
let target;
let balls;
let startPos;
let endPos;
let dir;

const maxForce = 14;
const ballSize = 20;

function setup() {
    createCanvas(400, 600);
    ellipseMode(CENTER);

    target = new Target(width / 2, 200, ballSize * 2);
    balls = [];
    balls.push(new Ball(width / 2, 500, ballSize));

    counter = 0;
    counterP = createP();
    counterP.html(`Score: ${counter}`);
}

function draw() {
    background('cyan');

    target.update();
    target.draw();

    for (let i = balls.length - 1; i >= 0; i--) {
        let ball = balls[i];
        if (ball.pos.y > height || ball.pos.x < 0 || ball.pos.x > width) {
            balls.splice(i, 1);
            balls.push(new Ball(random(50, width), 500, ballSize));
            endPos = undefined;

        } else if (ball.alpha <= 0) {
            balls.splice(i, 1);
            endPos = undefined;


        } else {
            if (ball.update()) {
                counter++;
                counterP.html(`Score: ${counter}`);
                endPos = undefined;
                balls.push(new Ball(random(50, width), 500, ballSize));
            }
            ball.draw();
        }
    }
    drawForceIndication();
}

function mousePressed() {
    startPos = createVector(mouseX, mouseY);
}

function mouseReleased() {

    endPos = createVector(mouseX, mouseY);

    let forceX = map(startPos.x - endPos.x, 0, width, 0, maxForce);
    let forceY = map(startPos.y - endPos.y, 0, height, 0, maxForce);

    let ball = balls[balls.length - 1];
    if (ball.state === states.WAIT) {
        ball.applyForce(forceX, forceY);
    }
}

function mouseDragged() {
    endPos = createVector(mouseX, mouseY);
}

function drawForceIndication() {
    if (endPos) {
        //let forceX = endPos.x - startPos.x;
        //let forceY = endPos.y - startPos.y;

        let forceX = map(endPos.x - startPos.x, 0, width, 0, maxForce * 10);
        let forceY = map(endPos.y - startPos.y, 0, height, 0, maxForce * 10);

        let force = createVector(-forceX, -forceY);
        let ang = force.heading();

        let ball = balls[balls.length - 1];
        if (ball.state === states.WAIT) {
            push();
            stroke('red');
            strokeWeight(8);
            translate(ball.pos.x, ball.pos.y);
            line(0, 0, force.x, force.y);
            rotate(ang);
            force.mult(2);
            stroke('white');
            translate(force.mag(), 0);
            pop();
        }
    }
}