/*jshint esversion: 6*/

let board;
let start;
let slider;

function setup() {
    createCanvas(601, 601);
    strokeWeight(1);
    stroke(0);

    board = new Board();
    start = false;

    createP();
    
    createButton("Start!").mousePressed(() => start = !start);
    createButton("Tick!").mousePressed(tick);
    
    slider = createSlider(1, 60, 30);

    createButton("Clear").mousePressed(() => board.clear());
    createButton("Random").mousePressed(() => board.randomize());
}

function mousePressed() {
    //Check if mouseClick was inside the canvas
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        let i = floor(mouseX / size),
            j = floor(mouseY / size);

        //Check if cell selected is not in the border
        if (i != 0 && i != board.cols-1 && j != 0 && j != board.rows-1) {
            board.changeState(i, j);
        }
    }
}

function draw() {
    frameRate(slider.value());

    board.show();

    if (start) {
        tick();
    }

    
}

function tick() {
    board.tick();
    
}