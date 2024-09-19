LIBRARY APP

Запуск:

npm run dev (с использованием nodemon)
npm run start (обычный запуск через команду node)
docker compose up (запуск сервисов library, counter, redis в режиме прод) // образы не менялись, могут быть старые
docker compose -f docker-compose.dev.yml up (запуск сервисов library, counter, redis в режиме dev)
Не забыть добавить в env MONGO_URL