.PHONY: up down build logs restart backend gateway frontend

# Manage services with Docker Compose:
up:
	docker compose up --build

down:
	docker compose down

restart:
	docker compose down && docker compose up --build

build:
	docker compose build

logs:
	docker compose logs -f

# Access the shell for individual services:
backend:
	docker compose exec backend sh

gateway:
	docker compose exec gateway sh

frontend:
	docker compose exec frontend sh
