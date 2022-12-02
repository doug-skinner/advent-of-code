import fs from 'fs';

enum Shapes {
    Rock = 'Rock',
    Paper = 'Paper',
    Scissors = 'Scissors',
}

const KeyToShape = (key: string): Shapes => {
    switch (key) {
        case 'A':
            return Shapes.Rock;
        case 'B':
            return Shapes.Paper;
        case 'C':
            return Shapes.Scissors;
        case 'X':
            return Shapes.Rock;
        case 'Y':
            return Shapes.Paper;
        case 'Z':
            return Shapes.Scissors;
        default:
            throw new Error('Invalid key');
    }
};

const ShapeToValue = (shape: Shapes): number => {
    switch (shape) {
        case Shapes.Rock:
            return 1;
        case Shapes.Paper:
            return 2;
        case Shapes.Scissors:
            return 3;
        default:
            throw new Error('Invalid shape');
    }
};

enum Scores {
    Win = 6,
    Draw = 3,
    Lose = 0,
}

const whoWins = (shape1: Shapes, shape2: Shapes): number => {
    if (shape1 === shape2) {
        return 0;
    }

    if (shape1 === Shapes.Rock) {
        if (shape2 === Shapes.Paper) {
            return 2;
        } else {
            return 1;
        }
    }

    if (shape1 === Shapes.Paper) {
        if (shape2 === Shapes.Scissors) {
            return 2;
        } else {
            return 1;
        }
    }

    if (shape1 === Shapes.Scissors) {
        if (shape2 === Shapes.Rock) {
            return 2;
        } else {
            return 1;
        }
    }

    throw new Error('Invalid shape');
};

const getScore = (shape1: Shapes, shape2: Shapes): number => {
    const winner = whoWins(shape1, shape2);
    const shapeValue = ShapeToValue(shape2);

    if (winner === 0) {
        return Scores.Draw + shapeValue;
    }
    // I'm player 2
    else if (winner === 2) {
        return Scores.Win + shapeValue;
    } else {
        return Scores.Lose + shapeValue;
    }
};

enum Results {
    X = Scores.Lose,
    Y = Scores.Draw,
    Z = Scores.Win,
}

const keyToDesiredResult = (key: string): Results => {
    switch (key) {
        case 'X':
            return Results.X;
        case 'Y':
            return Results.Y;
        case 'Z':
            return Results.Z;
        default:
            throw new Error('Invalid key');
    }
};

const whatDoIPlay = (shape1: Shapes, desiredResult: Results): Shapes => {
    if (desiredResult === Results.X) {
        if (shape1 === Shapes.Rock) {
            return Shapes.Scissors;
        } else if (shape1 === Shapes.Paper) {
            return Shapes.Rock;
        } else {
            return Shapes.Paper;
        }
    } else if (desiredResult === Results.Y) {
        return shape1;
    } else {
        if (shape1 === Shapes.Rock) {
            return Shapes.Paper;
        } else if (shape1 === Shapes.Paper) {
            return Shapes.Scissors;
        } else {
            return Shapes.Rock;
        }
    }
};

const main = async () => {
    const input = await fs.readFileSync('src/2022/2/input.txt', 'utf-8');

    const lines = input.split('\n');

    let score = 0;

    lines.forEach((line) => {
        const [key1, key2] = line.split(' ');
        const shape1 = KeyToShape(key1);
        const shape2 = KeyToShape(key2);

        score += getScore(shape1, shape2);
    });

    console.log(`part 1: ${score}`);

    let score2 = 0;

    lines.forEach((line) => {
        const [key1, key2] = line.split(' ');
        const shape1 = KeyToShape(key1);
        const desiredResult = keyToDesiredResult(key2);
        const shape2 = whatDoIPlay(shape1, desiredResult);

        score2 += getScore(shape1, shape2);
    });

    console.log(`part 2: ${score2}`);
};

main();
