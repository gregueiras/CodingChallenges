/*jshint esversion: 6*/
let lines = [];
let j = 0, i = 0;

function setup() {
  createCanvas(300, 400);
  background(33);
  stroke(200);
  strokeWeight(1);

  for (let i = 0; i < width; i++) {
    lines.push(random(0, height));
  }


}

function draw() {
  background(33);
  for (let x = 0; x < lines.length; x++) {
    const size = lines[x];
    line(x, height, x, height - size);
  }

  for (let k = 0; k < 100; k++) {
    
    if (i < lines.length) {
      
      let a = lines[j];
      let b = lines[j + 1];
      if (a > b) {
        swap(lines, j, j + 1);
      }
      
      j++;
      if (j >= lines.length - 1) {
        j = 0;
        i++;
      }
      
    } else {
      console.log("FINISHED");
      noLoop();
    }
  }
  
}
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
