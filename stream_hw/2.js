const fs = require('fs');
const path = require('path');

const logFilePath = process.argv[2];
const logPath = path.join(__dirname, logFilePath);

// Программа принимает в качестве аргумента log.txt
fs.readFile(logPath, 'utf8', (err, data) => {
  if (err) {
    console.log('Ошибка чтения файла:', err);
    return;
  }
  let wins = 0;
  let losses = 0;

  // Разбиваем лог на массив строк по \n
  const lines = data.trim().split('\n');
  // Считаем кол-во линий(кол-во игр)
  const totalGames = lines.length;

  // По линиям считаем кол-во Побед и Проигрышей в зависимости от наличия слова "Победа" или "Проигрыш"
  lines.forEach((line) => {
    if (line.includes('Победа')) {
      wins++;
    } else if (line.includes('Проигрыш')) {
      losses++;
    }
  });

  // Считаем процен побед
  const winPercentage = (wins / totalGames) * 100;

  console.log(`Общее количество партий: ${totalGames}`);
  console.log(`Победа: ${wins} / Поражение: ${losses}`);
  console.log(`Процент побед: ${winPercentage.toFixed(2)}%`);
});


