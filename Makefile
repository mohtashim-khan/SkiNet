.PHONY: default standup-backend standup teardown standup-redis

default:
	@echo -e "Allowed options:"
	@echo -e "\tstandup: Start all required services\n\tteardown: Safely shutdown all services"

standup-backend:
	sudo docker build -t csp-backend-image ./backend
	sudo docker run -d -p 8080:8080 --name csp-backend csp-backend-image

standup-redis:
	sudo docker run --name csp-redis -d redis

standup: standup-backend

teardown:
	sudo docker container stop csp-backend
	sudo docker rm csp-backend
