build:
	docker-compose build

zip:
	docker save countdown_app | gzip > countdown.tar.gz
