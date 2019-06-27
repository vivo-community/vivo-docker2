FROM mariadb:latest

COPY ./mysql-init.sql /docker-entrypoint-initdb.d

ENV MYSQL_USER root
ENV MYSQL_ROOT_PASSWORD rootPassword
