/*jshint esversion: 6 */

var pad;
var balls;
var blocks;

var ballVelSlider;
var button;
var sel;

var keyDown;
var pause;

function setup() {
    createCanvas(400, 400);
    background(55);
    colorMode(HSB);

    ballVelSlider = createSlider(0.1, 6, 3, 0);
    button = createButton('Reset Game');
    button.mousePressed(reset);
    sel = createSelect();
    sel.option(1);
    sel.option(2);
    sel.option(3);
    sel.option(4);

    init();

}

function draw() {
    background(25);

    update();

    pad.show();
    balls.forEach(ball => {
        ball.show();
    });
    blocks.forEach(block => {
        block.show();
    });



}

function reset() {
    loop();

    init();

}

function init() {
    keyDown = false;
    pause = false;
    pad = new Pad(width / 2, height - 10);
    balls = [];
    for (let index = 0; index < sel.value(); index++) {
        let newBall = new Ball(width / 2, height / 2);
        balls.push(newBall);
    }
    blocks = [];
    let blockX = width / 10;
    let blockY = height / 10;
    for (i = 1; i < 9; i++) {
        for (j = 1; j < 6; j++) {
            let newB = new Block(blockX * (i * 1.1), 30 + blockY * (j * 0.3));
            blocks.push(newB);
        }
    }
}

function update() {

    if (keyDown)
        pad.move(keyCode);

    balls.forEach(ball => {
        ball.update();
        ball.vel.setMag(ballVelSlider.value());

    });
    for (let index = balls.length - 1; index >= 0; index--) {
        if (!balls[index].alive)
            balls.splice(index, 1);
    }

    for (let index = blocks.length - 1; index >= 0; index--) {
        if (!blocks[index].alive)
            blocks.splice(index, 1);
    }
    blocks.forEach(block => {
        block.update();
    });

    if (blocks.length == 0) {
        noLoop();
        console.log("You Win");
        createP("You Win");
    }
    if (balls.length == 0) {
        noLoop();
        console.log("You Lose");
        createP("You Lose");
    }
}

function keyPressed() {

    if (keyCode == 32) {
        pause = !pause;
        if (pause) {
            noLoop();
        } else {
            loop();
        }
    } else {
        keyDown = true;
    }
}

function keyReleased() {
    keyDown = false;
}