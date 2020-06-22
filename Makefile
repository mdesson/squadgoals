# Environment variables for local shell environments
test: export DB_HOST = 127.0.0.1

run: export DB_HOST = postgres
run: export REACT_APP_BACKEND_HOST = localhost

.PHONY: help
help:
	@echo "run: Starts docker-compose"
	@echo "test: Runs backend tests"
	@echo "build: Runs npm install and rebuilds containers"
	@echo "clean: Deletes node_modules, runs npm install and rebuilds containers"

.PHONY: run
run:
	docker-compose up

.PHONY: test
test:
	cd backend && npm test
	
.PHONY: build
build: | backend/data backend/.env
	@echo "====== Adding Execute Permissions to wait-for-it.sh ======"
	chmod +x backend/wait-for-it.sh
	@echo "====== Removing package_lock.json ======"
	rm -f frontend/package_lock.json backend/package_lock.json
	@echo "====== Reinstalling node_modules ======"
	cd frontend && npm install
	cd backend && npm install
	@echo "====== Rebuilding images ======"
	cd frontend && docker build -t squadgoals-frontend .
	cd backend && docker build -t squadgoals-backend .
	@echo "====== Rebuild Complete! ======"

.PHONY: update
update: 
	@echo "====== Removing package_lock.json ======"
	rm -f frontend/package_lock.json backend/package_lock.json
	@echo "====== Reinstalling node_modules ======"
	cd frontend && npm install
	cd backend && npm install
	@echo "====== NPM update complete! ======"

.PHONY: clean
clean:
	@echo "====== Removing node_modules ======"
	rm -rf frontend/node_modules backend/node_modules
	@echo "====== Reinstalling node_modules ======"
	cd frontend && npm install
	cd backend && npm install
	@echo "====== Rebuilding images ======"
	cd frontend && docker build -t squadgoals-frontend .
	cd backend && docker build -t squadgoals-backend .
	@echo "====== Clean and Rebuild Complete! ======"

backend/data:
	@echo "====== Data folder does not exist, creating ======"
	mkdir -p $@

backend/.env:
	@echo "====== Creating .env file with default values ======"
	@echo "====== WARNING: Do not use in production! ======"
	touch $@
	echo "PORT=3100" > $@
	echo "DATABASE=squadgoals" >> $@
	echo "DATABASE_USER=postgres" >> $@
	echo "DATABASE_PASSWORD=postgres" >> $@
	echo "JWT_SECRET=DONT_USE_IN_PROD" >> $@
	echo "JWT_EXPIRES_IN=24h" >> $@