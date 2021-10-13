.PHONY: default \
		standup-network \
		standup-backend \
		standup teardown \
		standup-db \
		standup-redis \
		teardown-backend \
		teardown-db

default:
	@echo -e "Allowed options:"
	@echo -e "\tstandup: Start all required services\n\tteardown: Safely shutdown all services"

standup-network:
	@if sudo docker network ls | grep -F 'csp-internal' | wc -c | xargs -I% test % -eq 0; then \
        docker network create csp-internal; \
    fi

# This will be replaced by an environment variable in prod.
MYSQL_ROOT_PWD = development_test

standup-db: standup-network
	@if docker container ls | grep -F 'csp-db' | wc -c | xargs -I% test % -eq 0; then \
		docker run --network csp-internal -p 3306:3306 --name csp-db -e MYSQL_ROOT_PASSWORD=development_test -e MYSQL_DATABASE=csp -d mysql:latest; \
    fi;

standup-backend: standup-db
	@if docker container ls | grep -F 'csp-backend' | wc -c | xargs -I% test % -eq 0; then \
		docker build -t csp-backend-image ./backend && \
		docker run --network csp-internal -d -p 8080:8080 --name csp-backend csp-backend-image; \
	fi;

standup-redis:
	docker run --name csp-redis -d redis

standup: standup-backend

teardown-backend:
	@if docker container ls | grep -F 'csp-backend' | wc -c | xargs -I% test % -ne 0; then \
		docker container stop csp-backend && docker rm csp-backend; \
	fi

teardown-db:
	@if docker container ls | grep -F 'csp-db' | wc -c | xargs -I% test % -ne 0; then \
		docker container stop csp-db && docker rm csp-db; \
	fi

teardown: teardown-db teardown-backend
