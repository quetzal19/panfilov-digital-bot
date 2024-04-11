# Бот для проекта panfilov.digital

# Конфигурация

## Стек

* Node 20+
* Telegraf
* Yarn
* Make
* PM2 (для серверных окружений)

## Контейнеры

* panfilov-digital-bot - бот

## Зависимости

* Бэкенд на Strapi (https://strapi.panfilov.digital/)

### Настройка окружения

Скопировать данные из `.env.example` в `.env` и заполнить следующие переменные:

```dotenv
# Окружение для MakeFile: local, dev, prod
ENV=local
PREFIX=panfilov-digital
```

В директории `docker` по аналогии нужно скопировать `.env.example` в `.env` и заполнить:
```dotenv
# Порт, на котором будет работать бэк
PORT=3000

# Режим запуска приложения (production/development)
NODE_ENV=development

# id пользователя и группы на хост-системе
UID=
GID=
```

В директории `bot` по аналогии нужно скопировать `.env.example` в `.env` и заполнить как описано в readme в директории `bot`

# Старт

## Как развернуть проект локально

Предварительно необходимо:
1. Склонировать репозиторий
2. Подготовить файлы `.env` как описано выше

Варианты развёртывания:
* Если используется Docker: `make up`
* Запускать приложение полностью на хост-машине

## Как развернуть проект на сервере (первый запуск)

1. Склонировать репозиторий
2. Выполнить `cp .env.example .env` и корректно заполнить полученные файлы `.env` в:
   1. корне
   2. директории `docker`
   3. директории `bot`
3. Выполнить `make up`
4. Зайти в контейнер Nuxt: `make bash-bot`
5. Выполнить команду `yarn deploy`
6. Убедиться, что приложение работает и в логах (`pm2 logs`) всё в порядке

Шаги 4 и 5 нужны поскольку была выбрана возможность пересобирать приложение без необходимости перезапуска/пересборки
контейнера. При необходимости пересобрать контейнер шаги 4 и 5 повторять не нужно.

Данный алгоритм необходим, чтобы после старта контейнера в нём появились необходимые файлы (например, `node_modules`),
которых изначально нет в склонированном репозитории. Даже если выполнять `yarn install` во время сборки образа,
при подключении volume'а во время старта контейнера содержимое volume'а, в котором нет `node_modules` затрёт файлы
внутри контейнера, и приложение не сможет нормально стартовать.

Однако после установки зависимостей и сборки приложения в запущенном контейнере изменённые файлы появятся и на хосте,
поэтому при перезапуске контейнера приложение будет стартовать нормально

## Как пересобрать приложение на сервере

1. Выполнить `git pull` на хосте
2. Зайти в контейнер: `make bash-bot`
3. Выполнить `yarn deploy`
