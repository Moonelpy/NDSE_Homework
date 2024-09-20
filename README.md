LIBRARY APP TS

Запуск:

* npm run build (собрать проект)
* npm run start (запустить проект, но могут быть проблемы т.к. монга в docker)
* docker compose up (запуск сервисов library, counter, redis в режиме прод, p.s. Фронтенд сильно не отлаживал, частично
  сломан. Образы пересобирал, backend работает)
* docker compose -f docker-compose.dev.yml up (запуск сервисов library, counter, redis в режиме dev)

Для запуска в docker-compose.dev переименовать .env.example в .env  
