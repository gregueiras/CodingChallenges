/*jshint esversion: 6*/

let grid = [];
let nextGrid = [];

const size = 1;
const maxN = 25600;

function setup() {
  createCanvas(100, 100)
  for (let y = 0; y < height; y += size) {
    let nextRow = [];
    let row = [];
    for (let x = 0; x < width; x += size) {
      row.push(0);
      nextRow.push(0);
    }
    grid.push(row);
    nextGrid.push(nextRow);
  }
  colorMode(HSB, 255, 255, 255);

  grid[height / size / 2][width / size / 2] = maxN;

  console.log(grid);
  strokeWeight(size)
}

function draw() {
  for (let y = 0; y < height / size; y++) {
    for (let x = 0; x < width / size; x++) {
      let number = grid[y][x];
      map(number, 0, 360, 0, maxN)
      let c = map(number, 0, 16, 0, 255);
      stroke(c, 255, 255, 200);
      point(x * size, y * size);
    }
  }

  for (let i = 0; i < 100; i++)
    topple();
}

function topple() {

  let wSize = width / size, hSize = height / size;
  for (let y = 0; y < hSize; y++) {
    for (let x = 0; x < wSize; x++) {
      let number = grid[y][x];
      if (number < 4) {
        nextGrid[y][x] = number;
      } else
        nextGrid[y][x] = 0;
    }
  }

  for (let y = 0; y < hSize; y++) {
    for (let x = 0; x < wSize; x++) {
      let number = grid[y][x];

      if (number >= 4) {
        nextGrid[y][x] += (number - 4);

        if (y + 1 < hSize)
          nextGrid[y + 1][x] += 1;
        if (y - 1 > 0)
          nextGrid[y - 1][x] += 1;
        if (x + 1 < wSize)
          nextGrid[y][x + 1] += 1;
        if (x - 1 < wSize)
          nextGrid[y][x - 1] += 1;

      }
    }
  }

  for (var i = 0; i < nextGrid.length; i++)
    grid[i] = nextGrid[i].slice();

}