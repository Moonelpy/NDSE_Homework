const readline = require('node:readline');

const random = Math.floor(Math.random() * 101);
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const game = () =>
    rl.question('Введите ваше число ', (answer) => {
        const guess = Number(answer);

        if (guess > random) {
            console.log('Меньше');
        }
        else if (guess < random) {
            console.log('Больше');
        }
        else {
            console.log(`Отгадано число ${random}`);
            rl.close();
            return;
        }

        game();
    });

game();