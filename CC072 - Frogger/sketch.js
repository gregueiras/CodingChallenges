/*jshint esversion: 6*/

let obstacles = [];
let logs = [];
let back = [];

let buckets = [];

let frogger;

const carWidth = 50;
const carHeight = 45;
const carRows = 5;

const startLogsY = 125;
const endLogsY = 375;

const froggerSize = 50;

function setup() {
    createCanvas(600, 900);
    noStroke();

    //Create the frog
    frogger = new Rectangle(width / 2, height - froggerSize,
        froggerSize, froggerSize, color('#155b19'));

    //Create the cars
    let actualCarWidth = floor(random(carWidth / 2)) + carWidth;
    initRects(obstacles, height / 2, color('red'), actualCarWidth, 1, 5);

    //Create the logs
    let logWidth = floor(random(carWidth, carWidth * 2)) + carWidth;
    initRects(logs, startLogsY + froggerSize / 2, color('#ba5a01'), logWidth, 0.5, 2);

    //Create the background
    let h = (endLogsY - startLogsY);
    let water = new Rectangle(width / 2, (startLogsY + endLogsY) / 2, width, h, color('blue'));
    back.push(water);
    let road = new Rectangle(width / 2, height / 2 + h / 2.4, width, h, color('black'));
    back.push(road);
    let grass = new Rectangle(width / 2, startLogsY / 2, width, startLogsY, color('#2bdb35'));
    back.push(grass);

    //Create the "buckets" (the objective)
    for (let i = froggerSize; i < width; i += froggerSize * 2) {
        let b = new Rectangle(i, startLogsY - froggerSize * 3 / 4, froggerSize, froggerSize, color('purple'));
        b.full = false;
        buckets.push(b);

    }



    function initRects(arr, y, color, wid, speedMin, speedMax) {
        for (let i = 0; i < carRows; i++) {
            let x = wid / 2;
            let speed = random(speedMin, speedMax),
            m = 1;

            if (i % 2 === 0) {
                speed *= -1;
                x = width - x;
                m = -1;
            }
            let space = random(wid * 1.2, wid * 2);
            for (let i = 0; i < random(2, 4); i++) {
                let pos = x + space * i *m;
                let obj = new Rectangle(pos, y, wid, carHeight, color);
                obj.applySpeed(speed, 0);
                arr.push(obj);
            }
            y += 50;
        }
    }

}

function draw() {
    background(51);

    back.forEach(element => {
        element.show();
    });

    obstacles.forEach(element => {
        element.update();
        element.show();
        element.outOfScreen();

        if (element.intersect(frogger)) {
            loseGame();
        }
    });

    let isInLog = false, c = 0;
    logs.forEach(element => {
        element.update();

        if (element.intersect(frogger)) {
            c++;
            isInLog = true;
            let x = frogger.x;
            frogger.move(element.xSpeed, element.ySpeed);
            
        }
        element.show();
        element.outOfScreen();

    });

    console.log(c);
    

    //Check if is in water
    if (!isInLog && (isBetween(frogger.y, startLogsY, endLogsY))) {
        loseGame();
    }

    let everyBucketFull = true;
    buckets.forEach(element => {
        element.show();

        if (element.intersect(frogger)) {
            if (element.full) {
                loseGame();
            } else {
                element.full = true;
                element.color = color('pink');

                frogger.reset();
            }
        }

        if (!element.full) {
            everyBucketFull = false;
        }
    });

    if (everyBucketFull) {
        winGame();
    }
    frogger.show();

    if (frogger.outOfScreen()) {
        loseGame();
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        if (frogger.left - frogger.w > 0) {
            frogger.move(-frogger.w, 0);
        }
    } else if (keyCode === RIGHT_ARROW) {
        if (frogger.right + frogger.w < width) {
            frogger.move(frogger.w, 0);
        }
    } else if (keyCode === UP_ARROW) {
        if (frogger.top - frogger.h > 0) {
            frogger.move(0, -frogger.h);
        }
    } else if (keyCode === DOWN_ARROW) {
        if (frogger.bottom + frogger.h < height) {
            frogger.move(0, frogger.h);
        }
    }
}

function loseGame() {
    noLoop();
    let msg = "YOU LOSE😭";
    console.log(msg);
    createP(msg);
}

function winGame() {
    noLoop();
    let msg = "CONGRATULATIONS! YOU WIN😊";
    console.log(msg);
    createP(msg);
}

//returns true if n1 is between n2 and n3
function isBetween(n1, n2, n3) {
    return (n1 <= n3 && n1 >= n2);
}