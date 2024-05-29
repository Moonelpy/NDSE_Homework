const readline = require('readline');
const fs = require('node:fs');
const path = require('node:path');

const args = process.argv.slice(2);
const logFileName = args[0];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Угадайте, что выпало Орёл (1) или Решка(2): ',
});

// Функция для логирования результата
function logResult(fileName, result) {
    
  const logFilePath = path.resolve(fileName);

  fs.appendFile(logFilePath, `${result}\n`, (err) => {
    if (err) console.log('Ошибка записи в файл', err);
  });
}

function game() {
  rl.prompt();
  rl.on('line', (input) => {
    const userInput = Number(input);
    const randomInt = Math.floor(Math.random() * 2) + 1;

    if (userInput === randomInt) {
        result = 'Победа!'
      console.log(result);
    } else {
        result = 'Проигрыш.'
        console.log(result);
    }

    logResult(logFileName, `${result} Ваш выбор: ${userInput}, загадано: ${randomInt}`);
    rl.close();
    console.log('Спасибо за игру!');
  });
}
// Для корректного запуска нужно передать имя файла, в данном случае log.txt
game();