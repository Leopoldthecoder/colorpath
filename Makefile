.PHONY: dist test

dev:
	@npm run dev

dist:
	@npm run dist

deploy:
	@npm run deploy

test:
	@./node_modules/.bin/nyc npm test
