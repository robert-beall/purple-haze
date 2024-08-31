index: 
	@echo make up: build and run application
	@echo make down: teardown application
up:
	@docker compose up -d --build
down: 
	@docker compose down
free: 
	@docker system prune -fa --volumes