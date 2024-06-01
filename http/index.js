require('dotenv').config();
const http = require('http');
const https = require('https');
const url = require('url');
const { API_KEY, BASE_URL, PORT } = process.env;

const server = https.createServer((req, res) => {
  const queryObject = url.parse(req.url, true);
  const city = queryObject.city;

  const requestUrl = `${BASE_URL}?q=${city}&lang=RU&key=${API_KEY}`;
  console.log(`Request URL: ${requestUrl}`); // Отладка
  https
    .get(requestUrl, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        // const weather = JSON.parse(data);
        // console.log(`Parsed weather data: ${JSON.stringify(weather)}`); // Отладка
        if (response.statusCode === 200) {
          const weather = JSON.parse(data);
          console.log(`Parsed weather data: ${JSON.stringify(weather)}`); // Отладка
          res.end(JSON.stringify({
              city: weather.location.name,
              temperature: weather.current.temp_c,
              description: weather.current.condition,
          }));
        } else {
          const error = JSON.parse(data);
          console.log(`API error: ${error.message}`); //Отладка
          res.writeHead(response.statusCode, {
            'Content-Type': 'application/json',
          });
          res.end(JSON.stringify({ error: error.message }));
        }
      });
    })
    .on('error', (err) => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: `Ошибка запроса: ${err.message}` }));
    });
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
