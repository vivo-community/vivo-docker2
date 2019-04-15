#! /usr/bin/make

vivo-dc:=docker-compose -p vivo -f ${PWD}/docker-compose.yml

alias:
	@echo "alias vivo-dc='${vivo-dc}'

build:
	${vivo-dc} build
