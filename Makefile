lint-fix:
	npm run lint-fix

lint:
	npm run lint

test:
	npm run test

itest:
	npm run itest

docker/build:
	docker build -t node-api/conversor .

docker/run:
	docker run -d -p 3000:3000 -it node-api/conversor

install:
	npm i
