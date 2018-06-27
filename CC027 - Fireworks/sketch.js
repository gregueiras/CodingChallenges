var fk = new Array;
var gravity;

function setup() {
    createCanvas(400, 600);
    stroke(255);
    strokeWeight(6);
    background(255);
    gravity = createVector(0, 0.1);

    frameRate(30);
}

function draw() {

    background(45);

    if (random() < 0.05)
        fk.push(new Firework(random(width), height));

    for (i = fk.length-1; i >= 0; i--) {
        fk[i].applyForce(gravity);
        fk[i].update();
        fk[i].show();

        if (fk[i].state == states.DISAPPEAR) {
            console.log("DELETE");
            fk[i].particles = [];
            fk.splice(i, 1);
        }
    }

    console.log(fk.length);

}

function mouseClicked() {
    fk.push(new Firework(mouseX, height));

}

        

