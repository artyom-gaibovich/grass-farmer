
all:
	npx nx run-many --parallel=10 --target=serve

create-migration:
	npx prisma migrate dev --create-only

COMPOSE_FILE=docker-compose.yml

SERVICE=postgres

VOLUME_NAME=postgres-data

.PHONY: up down restart logs clean

up:
	docker-compose -f $(COMPOSE_FILE) up -d
	@echo "PostgreSQL is up and running!"

down:
	docker-compose -f $(COMPOSE_FILE) down
	@echo "PostgreSQL has been stopped."

restart:
	docker-compose -f $(COMPOSE_FILE) down
	docker-compose -f $(COMPOSE_FILE) up -d
	@echo "PostgreSQL has been restarted."

logs:
	docker-compose -f $(COMPOSE_FILE) logs -f $(SERVICE)

clean:
	docker-compose -f $(COMPOSE_FILE) down -v
	@echo "All containers and volumes have been removed."


apply-migration:
	@echo "Apply migration"
	npx prisma migrate deploy
