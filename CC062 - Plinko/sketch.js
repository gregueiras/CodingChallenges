/*jshint esversion: 6*/

//Matter.js initialization
let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine;
let particles = [];

const rows = 9, cols = 11;
const pegSize = 8, plinkoSize = 600 / cols/2 - pegSize;

function setup() {
    createCanvas(600, 1500);
    engine = Engine.create();

    //Create the pegs
    let initX = 30,
        initY = 100,
        spacing = width / cols;

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            let x = initX + spacing * i,
                y = initY + spacing * j;

            if (j % 2 == 1) {
                x += 25;
                if (i + 1 == cols) {
                    break;
                }
            }
            particles.push(new Plinko(x, y, pegSize));

        }
    }

    //Create Buckets to receive the pucks
    let sizeX = 10, sizeY = 900;
    let y = height - sizeY/2;
    for (let i = 0; i < cols; i++) {
        let x = initX + spacing * i;
        particles.push(new Box(x, y, sizeX, sizeY, color('red')));
    }
    particles.push(new Box(width / 2, height + 50, width, 100, color('red')));

    particles.push(new Box(-50, height/2, 55, height/2, color('red')));
    particles.push(new Box(width + 50, height/2, 55, height/2,color('red')));
    newPuck();
}

//setInterval(newPuck, 1000);
function newPuck(x, y) {
    let options = {
        restitution: 0.5,
        friction: 0,
        density: 1
    };
    if (x === undefined || y === undefined) {
        x = random(width);
        y = random(-50);
    }

    let puck = new Particle(x, y, plinkoSize, color('purple'), options);
    particles.push(puck);
}
function mousePressed() {
   newPuck(mouseX, mouseY);
}

function draw() {
    background(51);
    Engine.update(engine);

    for (let i = particles.length - 1 ; i >= 0; i--) {
        particles[i].show();

        //If a particle exits the screen, remove it from the world and from the array
        if (particles[i].isOffScreen()) {
            World.remove(engine.world, particles[i].body);
            particles.splice(i, 1);
        }
        
    }
    
}