/*jshint esversion: 6*/

const size = 5;

class Cell {
    constructor(i, j, x, y) {
        this.i = i;
        this.j = j;

        this.x = x;
        this.y = y;

        this.state = false;
    }

    show() {
        rectMode(CENTER);
        if (this.state) {
            fill(0);
        } else {
            fill(255);
        }

        rect(this.x, this.y, size, size);
    }
}

class Board {
    constructor() {
        this.rows = floor(width / size);
        this.cols = floor(height / size);

        this.thisGeneration = [];

        let x = size / 2,
            y = size / 2;

        //Create all the cells
        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.cols; i++) {

                let newCell = new Cell(i, j, x, y);
                this.thisGeneration.push(newCell);
                x += size;

            }
            x = size / 2;
            y += size;

        }
    }

    show() {
        this.thisGeneration.forEach(element => {
            element.show();
        });
    }

    index(i, j) {
        return j * this.cols + i;
    }

    getNeighbors(i, j) {
        // Get the neighbors from cell (i,j) 
        // (sides, top, bottom and diagonally)
        let toRet = [],
            gen = this.thisGeneration;
        toRet.push(gen[this.index(i - 1, j - 1)]);
        toRet.push(gen[this.index(i - 1, j)]);
        toRet.push(gen[this.index(i - 1, j + 1)]);
        toRet.push(gen[this.index(i, j - 1)]);
        toRet.push(gen[this.index(i, j + 1)]);
        toRet.push(gen[this.index(i + 1, j - 1)]);
        toRet.push(gen[this.index(i + 1, j)]);
        toRet.push(gen[this.index(i + 1, j + 1)]);

        return toRet;
    }

    changeState(i, j) {
        let ind = this.index(i, j);

        let cell = this.thisGeneration[ind];
        cell.state = !cell.state;

    }

    liveNeighbors(i, j) {
        // Number of alive neighbors
        let count = 0,
            neighbors = this.getNeighbors(i, j);

        neighbors.forEach(neighbor => {
            if (neighbor.state) {
                count++;
            }
        });

        return count;
    }

    tick() {
        // Temporary arrays to store next Generation states
        let temp = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {

                let newState = false;

                //Check if cell isn't a border
                if (i != 0 && i != board.cols - 1 && j != 0 && j != board.rows - 1) {
                    let alive = this.liveNeighbors(i, j),
                        index = this.index(i, j),
                        cell = this.thisGeneration[index];

                    //Rule #1 and #3
                    if (cell.state && (alive < 2 || alive > 3)) {
                        newState = false;
                    } //Rule #2
                    else if (alive === 3 && !cell.state) {
                        newState = true;
                    } //Rule #4
                    else {
                        newState = cell.state;
                    }
                }
                temp.push({
                    i,
                    j,
                    newState
                });
            }
        }

        //Assign nextGen states to the cells
        for (let i = 0; i < temp.length; i++) {
            let index = this.index(temp[i].i, temp[i].j);
            this.thisGeneration[index].state = temp[i].newState;

        }
    }

    clear() {
        this.thisGeneration.forEach(element => {
            element.state = false;
        });
    }

    randomize() {
        this.thisGeneration.forEach(element => {
            let r = random();
            if (r < 0.3) {
                element.state = true;
            } else {
                element.state = false;
            }
        });
    }
}