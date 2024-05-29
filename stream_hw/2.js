const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

const logFilePath = path.resolve(args[0]);

function analyzeLogs(logFilePath) {
  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      console.log('Ошибка чтения файла:', err);
    return;
    }
    let wins = 0;
    let losses = 0;

    const lines = data.trim().split('\n');
    const totalGames = lines.length;
    
    //Парсим линии в зависимости от наличия слова "Победа" или "Проигрыш"
    lines.forEach(line => {
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
}
// Для корректного запуска нужно передать имя файла, в данном случае log.txt
analyzeLogs(logFilePath);
