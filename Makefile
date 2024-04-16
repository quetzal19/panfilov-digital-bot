.PHONY: all

SHELL=/bin/bash -e

.DEFAULT_GOAL := help

-include .env

ENV ?= local

$(info ENV="$(ENV)")
$(info PREFIX="$(PREFIX)")

help: ## Справка
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build-all: ## Сборка контейнеров без запуска проекта
	docker compose -f docker/docker-compose.$(ENV).yml build

up: ## Запуск проекта
	docker compose -f docker/docker-compose.$(ENV).yml up -d

down: ## Остановка всех контейнеров проекта
	docker compose -f docker/docker-compose.$(ENV).yml down

rb-bot: ## Пересобрать контейнер бота
	@docker compose -f docker/docker-compose.$(ENV).yml up -d --build
	@docker compose -f docker/docker-compose.$(ENV).yml down
	@docker compose -f docker/docker-compose.$(ENV).yml up -d

bash-bot: ## Зайти в bash контейнера с ботом
	docker compose -f docker/docker-compose.$(ENV).yml exec $(PREFIX) /bin/bash
