/*jshint esversion: 6 */

var ship;
var enemies;
var bullets;

var count;
var down;

function setup() {
    createCanvas(800, 800);
    colorMode(HSB);
    background(51);
    ellipseMode(CENTER);

    ship = new Ship(width / 2, 9 * height / 10);
    enemies = [];
    bullets = [];
    count = 0;
    down = 0;

    let numC = 11;
    let numR = 4;
    let spaceB = 50;
    for (let i = 1; i <= numC; i++) {
        for (let j = 1; j <= numR; j++) {
            let newE = new Enemy(i * spaceB + 100, j * 40 + height / 10);
            enemies.push(newE);
        }
    }
}

function draw() {

    background(51);

    update();

    ship.draw();

    enemies.forEach(enemy => {
        enemy.draw();
    });


    bullets.forEach(bullet => {
        bullet.draw();
    });


}

function update() {

    if (enemies.length == 0) {
        console.log("You Win 🔥");
        noLoop();
        return 0;
    }

    let firstEnemy = enemies[0];
    let lastEnemy = enemies[enemies.length - 1];
    let timeLimit = enemies.length * 2;

    bullets.forEach(bullet => {
        bullet.update();
    });

    for (let i = bullets.length - 1; i >= 0; i--) {
        if (!bullets[i].inScreen)
            bullets.splice(i, 1);

    }

    for (let i = enemies.length - 1; i >= 0; i--) {
        if (!enemies[i].alive)
            enemies.splice(i, 1);

    }

    if (count >= timeLimit) {
        if (down) {
            down = false;

        } else if (firstEnemy.pos.x < width / 10 || firstEnemy.pos.x > 9 * width / 10 ||
            lastEnemy.pos.x < width / 10 || lastEnemy.pos.x > 9 * width / 10) {
            down = true;

        }
        enemies.forEach(enemy => {
            enemy.update(down);
        });
        count = 0;
    }
    count++;

    let step = 5;

    if (keyIsDown(LEFT_ARROW)) {
        ship.move(-step);
    }

    if (keyIsDown(RIGHT_ARROW)) {
        ship.move(step);
    }

}

function keyPressed() {

    if (keyCode == 32) {
        ship.shoot();
    }
}

function keyReleased() {

}