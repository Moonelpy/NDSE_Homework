# Library+Count Express.js

## Как запустить
- прод версия: docker compose up 
- dev версия: docker compose -f docker-compose.dev.yml up

Перейти в [Библиотеку](http://localhost:81/)
### Сделано: 
- Разнесены файлы на mod(внутренние) и api(внешние)
- Mod используются для фронта(для рендергина)
- Api используются для работы с JSON(как обычно)

Список действий: 
- Просмотр списка всех книг(вывод заголовков)
- Просмотр информации по одной книге((NEW) вывод счётчика просмотра книги)
- Создание книги
- Редактирование книги
- Удаление книги 
- Cтраница 404 

Приложение контеризировано и лежит на [докер хаб](https://hub.docker.com/layers/moonelpy/ndse/library_with_counter/images/sha256-eb2158db48a817ffd6898d72a07bd16ac73eef7836186e2b7f8b920f52e784cf?context=repo)

Репозиторий [приложения счётчика](https://github.com/Moonelpy/books_counter/tree/library_counter)