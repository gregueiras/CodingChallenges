/*jshint esversion: 6*/

class Brain {
    constructor(instructions) {


        if (instructions) {
            if (instructions instanceof Brain) {
                this.instructions = instructions.instructions;
            } else {
                this.instructions = instructions;
            }
        } else {
            this.instructions = [];
            for (let i = 0; i < lifeSpan; i++) {
                let newInstruct = p5.Vector.random2D();
                newInstruct.setMag(maxForce);
                this.instructions.push(newInstruct);
            }
        }
    }

    cross(parentB) {
        let childInstructions = [];

        for (let i = 0; i < lifeSpan; i++) {

            let newDir = this.instructions[i];
            newDir.add(parentB.instructions[i]);
            newDir.div(2);
            newDir.setMag(maxForce);

            childInstructions.push(newDir);
        }

        return new Brain(childInstructions);
    }

    mutate() {
        for (let i = 0; i < this.instructions.length; i++) {
            if (random() < 0.01) {
                let newI = p5.Vector.random2D();
                newI.setMag(maxForce);
                this.instructions[i] = newI;
            }
        }

    }
}