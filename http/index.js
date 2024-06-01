const http = require('http');
const https = require('https');
const url = require('url');
const {default_city, api_key, base_url, port} = require('../config');

const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const queryCity = queryObject.city;
  const city = queryCity? queryCity : default_city 
  console.log(city);
  const requestUrl = `${base_url}?q=${city}&lang=RU&key=${api_key}`;

  https.get(requestUrl, (response) => {
    let data = '';

    response.on('data', chunk => {
      data += chunk;
    });

    response.on('end', () => {

      if (response.statusCode === 200) {
        try {
          const weather = JSON.parse(data);
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({
            'Город': weather.location.name,
            'Температура': weather.current.temp_c,
            'Описание': weather.current.condition.text
          }));
        } catch (e) {
          res.writeHead(500, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({ error: 'Ошибка обработки данных от API' }));
        }

      } else {
        const error = JSON.parse(data);
        res.writeHead(response.statusCode, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ error: error.message }));
      }
    });
  }).on('error', (err) => {
    console.log(`Request error: ${err.message}`); // Debug log
    res.writeHead(500, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ error: `Ошибка запроса: ${err.message}` }));
  });
});

server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
